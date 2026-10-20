/*
  Teste A/B da captação da Black (ADR-054 do Academia Hub).
  O nginx sorteia A (/black), E (/black-e) ou F (/black-f) para quem abre /black e fixa a escolha no cookie black_aef por 30 dias.
  Este script manda ao Hub cada etapa uma vez por pessoa (navigator.sendBeacon): a marca de etapa enviada fica no
  navegador por 30 dias, o mesmo prazo do cookie do sorteio, e quem volta pelo anúncio não conta de novo. Só vão a
  variante, a etapa, se veio de anúncio e se é celular. Nada de nome, e-mail, telefone, IP ou identificador: o Hub só
  soma contadores.

  Na página de captura: <script src="/black/ab.js" data-variante="A" defer></script> (E na /black-e, F na /black-f).
  No obrigado: <script src="/black/ab.js" defer></script> (a variante vem da captura, na mesma aba).
  Quem abre /black-e ou /black-f direto (revisão, sem passar pelo sorteio da /black) ou o obrigado com ?preview=1 não entra na conta.
*/
(function () {
  // Teste encerrado em 20/10 (a E ficou com todo o tráfego): não manda mais nada ao Hub. Para um teste novo, tire este return.
  window.hubAB = function () {};
  return;
  // Teste A x E x F (E e F têm a mesma headline e o mesmo aviso, novos; só o texto de apoio muda entre elas), a partir de 18/10 00:00 de Brasília, quando o nginx
  // abre o sorteio. Antes disso nada vai ao Hub. B, C e D já perderam para a A (testes black-captacao e -acd).
  var COLETA = 'https://hub.ocaradocopytrade.com/api/ab/black-captacao-aef/events';
  var TESTE = 'aef';
  var INICIO = Date.UTC(2026, 9, 18, 3, 0, 0); // 18/10/2026 00:00 em Brasília (UTC-3)
  window.hubAB = function () {};
  if (Date.now() < INICIO) return;
  var tag = document.currentScript;
  var caminho = location.pathname.replace(/\/+$/, '');
  // A E é servida pelo nginx em /black (sorteio); aberta direto em /black-e ou /black-f é revisão e fica fora da conta.
  var naCaptura = caminho === '/black';
  var noObrigado = caminho === '/black-obrigado';
  var preview = /[?&]preview=1(&|$)/.test(location.search);

  // Sem sessionStorage (bloqueado), a marca fica só na memória da página: ainda não repete etapa na mesma página.
  var memoria = {};
  function ler(chave) {
    try { return sessionStorage.getItem(chave); } catch (e) { return memoria[chave] || null; }
  }
  function gravar(chave, valor) {
    memoria[chave] = valor;
    try { sessionStorage.setItem(chave, valor); } catch (e) { /* segue com a memória */ }
  }
  function apagar(chave) {
    delete memoria[chave];
    try { sessionStorage.removeItem(chave); } catch (e) { /* nada a apagar */ }
  }

  // Etapa já contada para esta pessoa (este navegador) nos últimos 30 dias. Sem localStorage, vale a memória da página.
  var TRINTA_DIAS = 30 * 24 * 60 * 60 * 1000;
  function jaContou(marca) {
    var quando;
    try { quando = localStorage.getItem(marca); } catch (e) { quando = memoria[marca]; }
    return Boolean(quando) && Date.now() - Number(quando) < TRINTA_DIAS;
  }
  function marcarContada(marca) {
    var agora = String(Date.now());
    memoria[marca] = agora;
    try { localStorage.setItem(marca, agora); } catch (e) { /* segue com a memória */ }
  }

  var variante = null;
  if (naCaptura) variante = tag && tag.getAttribute('data-variante');
  else if (noObrigado && !preview && !window.blackSaindo && ler('black_inscrito') === '1') variante = ler('hub_ab_v');

  window.hubAB = function () {};
  if (variante !== 'A' && variante !== 'E' && variante !== 'F') {
    // Captura fora do sorteio (ex.: /black-b aberta direto para revisão): esquece a variante desta aba, para uma
    // inscrição feita aqui não ser creditada à variante da visita anterior.
    if (!naCaptura && !noObrigado) { apagar('hub_ab_v'); apagar('hub_ab_ad'); }
    return;
  }

  var anuncio;
  if (naCaptura) {
    anuncio = /[?&](utm_source|fbclid|gclid)=/.test(location.search) ? 1 : 0;
    gravar('hub_ab_v', variante);
    gravar('hub_ab_ad', String(anuncio));
  } else {
    anuncio = ler('hub_ab_ad') === '1' ? 1 : 0;
  }
  var celular = window.matchMedia && window.matchMedia('(max-width: 900px)').matches ? 1 : 0;

  function enviar(etapa) {
    // Com o nome do teste na marca: quem já foi contado como A no teste A x C x D conta de novo neste.
    var marca = 'hub_ab_' + TESTE + '_' + variante + '_' + etapa;
    if (jaContou(marca)) return; // cada etapa uma vez por pessoa e por variante, em 30 dias
    marcarContada(marca);
    var corpo = JSON.stringify({ v: variante, e: etapa, ad: anuncio, m: celular });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(COLETA, corpo)) return;
    } catch (e) { /* cai no fetch */ }
    try {
      fetch(COLETA, { method: 'POST', body: corpo, keepalive: true, mode: 'no-cors', credentials: 'omit' }).catch(function () { /* sem coleta, a página segue normal */ });
    } catch (e) { /* idem */ }
  }
  window.hubAB = enviar;

  if (naCaptura) {
    enviar('visita');
    // Ficou 3 s com a página visível (aba em segundo plano não conta).
    var relogio = null;
    var contar = function () {
      if (document.visibilityState === 'visible') {
        if (!relogio) relogio = setTimeout(function () { enviar('3s'); }, 3000);
      } else if (relogio) {
        clearTimeout(relogio);
        relogio = null;
      }
    };
    document.addEventListener('visibilitychange', contar);
    contar();
    // Digitou num campo do formulário (o foco sozinho não conta: os botões da página já põem o foco no nome).
    document.addEventListener('input', function (evento) {
      var alvo = evento.target;
      if (alvo && alvo.closest && alvo.closest('#form')) enviar('preencheu');
    });
  }

  if (noObrigado) {
    enviar('lead'); // o obrigado só abre depois do envio com sucesso (marca black_inscrito)
    document.addEventListener('click', function (evento) {
      var alvo = evento.target;
      if (alvo && alvo.closest && alvo.closest('.btn-grupo')) enviar('grupo');
    });
  }
})();
