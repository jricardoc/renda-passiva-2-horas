/*
  Teste A/B da captação da Black (ADR-054 do Academia Hub).
  O nginx sorteia A (/black) ou B (/black-b) para quem abre /black e fixa a escolha no cookie black_ab por 30 dias.
  Este script manda ao Hub cada etapa da visita uma vez (navigator.sendBeacon), só com a variante, a etapa, se veio de
  anúncio e se é celular. Nada de nome, e-mail, telefone, IP ou identificador: o Hub só soma contadores.

  Na página de captura: <script src="/black/ab.js" data-variante="A" defer></script> (B na /black-b).
  No obrigado: <script src="/black/ab.js" defer></script> (a variante vem da captura, na mesma aba).
  Quem abre /black-b direto (revisão) ou o obrigado com ?preview=1 não entra na conta.
*/
(function () {
  var COLETA = 'https://hub.ocaradocopytrade.com/api/ab/black-captacao/events';
  var tag = document.currentScript;
  var caminho = location.pathname.replace(/\/+$/, '');
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

  var variante = null;
  if (naCaptura) variante = tag && tag.getAttribute('data-variante');
  else if (noObrigado && !preview && !window.blackSaindo && ler('black_inscrito') === '1') variante = ler('hub_ab_v');

  window.hubAB = function () {};
  if (variante !== 'A' && variante !== 'B') {
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
    var marca = 'hub_ab_' + variante + '_' + etapa;
    if (ler(marca)) return; // cada etapa uma vez por visita (aba) e por variante
    gravar(marca, '1');
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
