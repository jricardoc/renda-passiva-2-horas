// Textos, VSL e checkout da LP por idioma. O idioma vem do <html lang> da página: index.html (pt-BR) é a VSL do Brasil,
// em /protocolo1/, e es/index.html (es) é a VSL LATAM, em /protocolo1/es/, as duas no mesmo build. O es tem o tipo
// do pt: faltar um texto quebra o build.

const pt = {
  // Embed da VTurb: o id do <vturb-smartplayer> e o script do player (o preload do index.html aponta para o mesmo)
  vsl: {
    id: "ab-69eeaa9ee47d7b09a8e429e2",
    script: "https://scripts.converteai.net/3f99e868-8a2c-4153-b834-85a358ba11f4/ab-test/69eeaa9ee47d7b09a8e429e2/player.js",
  },
  checkout: {
    // CTA do hero, que aparece quando o VTurb revela o #content-gate
    hero: "https://pay.hotmart.com/N103487414R?checkoutMode=10&utm_source=vsl&utm_medium=botao&utm_campaign=vsl_fechada&utm_content=botao_vturbo",
    pagina: "https://pay.hotmart.com/N103487414R?checkoutMode=10&utm_source=vsl&utm_medium=botao&utm_campaign=vsl_aberta&utm_content=botao_vturb",
  },
  ctaPreco: <>GARANTA O PROTOCOLO POR 12x DE R$&nbsp;30,71</>,
  hero: {
    curtidoPor: <>Curtido por <strong>julianasouza</strong> e outras <strong>63.568 pessoas</strong></>,
    seguidores: "1.5M seguidores",
    titulo: "Vou te provar que é possível mudar de vida",
  },
  autoridade: {
    fotoAlt: "Hendi - Especialista em Renda Passiva",
    titulo: <>O que é o <span className="text-orange">Protocolo</span>?</>,
    intro: <>Eu sou o <strong className="text-white">Hendi</strong>, engenheiro, ex-Ford e especialista em geração de renda passiva.</>,
    historia: (
      <>
        Depois de anos testando o mercado e estudando formas inteligentes de lucrar em dólar, desenvolvi um{" "}
        <strong className="text-orange">setup simples e eficiente</strong> que funciona na minha conta{" "}
        <strong className="text-green">há mais de 5 anos</strong>, e eu vou te provar tudo isso aqui dentro, em conta real.
      </>
    ),
    graficoAlt: "Gráfico de resultados da estratégia",
    ampliar: "🔍 Clique para ampliar",
    alunos: (
      <>
        E o melhor: funciona também para vários alunos que seguiram o mesmo caminho. O Protocolo é um{" "}
        <strong className="text-green">plano de execução</strong>, não um curso teórico.
      </>
    ),
    checklistIntro: "Você vai sentar comigo por até 2 horas e sair com tudo configurado:",
    checklist: [
      "Sua conta aberta em corretora internacional segura",
      "A estratégia automatizada conectada",
      "A gestão de risco definida",
      "E seu fluxo de renda automática em dólar ativado",
    ],
    grupoAlt: "Grupo de alunos do Protocolo",
    grupoLegenda: "Alunos que já ativaram o Protocolo",
  },
  comparacao: {
    titulo: <>Diferente de <span className="text-orange">tudo</span> que você vê no Instagram</>,
    naoTitulo: <>O que <span className="text-red">NÃO</span> é</>,
    nao: ["Não é Bet", "Não é Tigrinho", "Não é Robô milagroso", "Não é Casa de Apostas"],
    eTitulo: <>O que <span className="text-green">É</span></>,
    e: [
      "É Mercado Financeiro real",
      "Com estratégias validadas e histórico público",
      "Com resultados auditados",
      "Com risco controlado",
      "Com setup simples para iniciantes",
    ],
    rodape: (
      <>
        Enquanto muita gente perde dinheiro tentando a sorte, você vai seguir um modelo que usa{" "}
        <strong className="text-white">estatística, tecnologia e análise de risco</strong> - não apostas.
      </>
    ),
  },
  conteudo: {
    titulo: <>O que você vai receber dentro do <span className="text-orange">Protocolo</span></>,
    cards: [
      {
        titulo: "O Passo a Passo do Zero",
        descricao: "Como abrir sua conta internacional, configurar tudo corretamente e conectar sua conta à estratégia automática em minutos.",
      },
      {
        titulo: "Checklist de Segurança Validado",
        descricao: "Critérios, filtros e exemplos reais dos profissionais que entregam consistência e não promessas vazias.",
      },
      {
        titulo: "Guia de Gestão de Risco Simplificado",
        descricao: "Instrumentos para proteger seu capital e manter seu patrimônio seguro, mesmo num mercado volátil.",
      },
      {
        titulo: "Tutorial Prático em 2 Horas",
        descricao: "Checklists, atalhos e orientações claras para você implementar tudo rapidamente.",
      },
    ],
    cta: "QUERO COMPRAR AGORA",
  },
  provas: {
    titulo: <><span className="text-green">Prova Social</span> - Resultados Reais</>,
    subtitulo: "Você não é o primeiro que irei ensinar. Veja os feedbacks de quem já adquiriu o Protocolo",
    // Na ordem das imagens img1 a img12 do SocialProof
    legendas: [
      "Aluno comemorando primeiro lucro em dólar",
      "Feedback positivo após configurar o setup",
      "Resultado consistente na primeira semana",
      "Aluno impressionado com a simplicidade",
      "Conta ativa gerando resultados diários",
      "Depoimento de aluno satisfeito",
      "Setup funcionando automaticamente",
      "Resultados superando expectativas",
      "Ganhos recorrentes comprovados",
      "Estratégia rodando com sucesso",
      "Aluno agradecendo pelo método",
      "Histórico real de rendimentos",
    ],
  },
  oferta: {
    titulo: <>Acesse o <span className="text-orange">Protocolo Renda Passiva em 2H</span></>,
    subtitulo: "Tudo que você precisa para ativar seu fluxo de renda automática em dólar",
    incluiTitulo: "O que você recebe:",
    inclui: [
      ["Acesso completo ao Protocolo", "Passo a passo do zero"],
      ["Setup da corretora internacional", "Conta pronta para operar"],
      ["Estratégias validadas", "Filtradas e testadas"],
      ["Guia de gestão de risco", "Proteja seu capital"],
      ["Configuração em até 2 horas", "Rápido e direto ao ponto"],
    ],
    // Vazio esconde o preço riscado
    de: "R$ 497",
    porApenas: "Por apenas",
    moeda: "R$",
    valor: "297",
    // Vazio esconde a linha
    parcelas: "ou 12x de R$ 30,71",
    cta: "QUERO ATIVAR MEU SETUP AGORA",
    pagamento: "🔒 Pagamento 100% seguro",
    dias: "DIAS",
    garantiaTitulo: <><span className="text-gold">Garantia Total</span> de 7 dias</>,
    garantia: (
      <>
        Se você assistir e sentir que não é para você, basta pedir o reembolso. Devolvo{" "}
        <strong className="text-green">100% do valor</strong>, sem perguntas, sem burocracia.
      </>
    ),
    urgencia: (
      <>
        O investimento de <strong className="text-green">R$ 297</strong> é um valor simbólico. Você está estruturando um fluxo
        de renda em dólar com base real e validação prática.
      </>
    ),
  },
  especialista: {
    titulo: <>Quem é o <span className="text-orange">Especialista</span>?</>,
    subtitulo: "Conheça um pouco mais sobre quem está por trás do Protocolo",
  },
  rodape: {
    titulo: <>Ainda com dúvidas? <span className="text-orange">Não perca mais tempo</span></>,
    texto: "Com apenas R$ 297 você ativa seu setup de renda passiva em dólar. Garantia de 7 dias ou seu dinheiro de volta.",
    cta: "QUERO COMEÇAR AGORA",
    aviso:
      "Este produto não garante a obtenção de lucros. Investir envolve riscos e você deve estar ciente de que resultados passados não garantem resultados futuros.",
    termos: "Termos de Uso",
    privacidade: "Política de Privacidade",
    direitos: "Protocolo Renda Passiva em 2H. Todos os direitos reservados.",
    desenvolvido: "Desenvolvido por",
  },
};

// VSL LATAM: produto "Ingreso Pasivo Automático en Dólares en 2 Horas" na Hotmart, oferta ejwey6k2 de US$ 47, sem preço
// riscado e sem parcelas (Ricardo, 30/10). O preço aparece no CTA, na caixa da oferta, na urgência e no rodapé.
const PRECO_ES = "US$ 47";
const CHECKOUT_ES = "https://pay.hotmart.com/C107791955E?off=ejwey6k2&checkoutMode=10&utm_source=vsl&utm_medium=botao";

const es: typeof pt = {
  vsl: {
    id: "ab-6ae572b7a1db2408a368a87e",
    script: "https://scripts.converteai.net/3f99e868-8a2c-4153-b834-85a358ba11f4/ab-test/6ae572b7a1db2408a368a87e/player.js",
  },
  checkout: {
    hero: `${CHECKOUT_ES}&utm_campaign=vsl_fechada&utm_content=botao_vturbo`,
    pagina: `${CHECKOUT_ES}&utm_campaign=vsl_aberta&utm_content=botao_vturb`,
  },
  ctaPreco: <>GARANTIZA EL PROTOCOLO POR {PRECO_ES}</>,
  hero: {
    curtidoPor: <>Le gusta a <strong>julianasouza</strong> y a <strong>63.568 personas</strong> más</>,
    seguidores: "1.5M seguidores",
    titulo: "Te voy a demostrar que es posible cambiar de vida",
  },
  autoridade: {
    fotoAlt: "Hendi - Especialista en Ingreso Pasivo",
    titulo: <>¿Qué es el <span className="text-orange">Protocolo</span>?</>,
    intro: <>Soy <strong className="text-white">Hendi</strong>, ingeniero, ex-Ford y especialista en generar ingresos pasivos.</>,
    historia: (
      <>
        Después de años probando el mercado y estudiando formas inteligentes de ganar en dólares, desarrollé un{" "}
        <strong className="text-orange">setup simple y eficiente</strong> que funciona en mi cuenta{" "}
        <strong className="text-green">desde hace más de 5 años</strong>, y te lo voy a demostrar todo aquí dentro, en una
        cuenta real.
      </>
    ),
    graficoAlt: "Gráfico de resultados de la estrategia",
    ampliar: "🔍 Haz clic para ampliar",
    alunos: (
      <>
        Y lo mejor: también funciona para muchos alumnos que siguieron el mismo camino. El Protocolo es un{" "}
        <strong className="text-green">plan de ejecución</strong>, no un curso teórico.
      </>
    ),
    checklistIntro: "Vas a sentarte conmigo hasta 2 horas y salir con todo configurado:",
    checklist: [
      "Tu cuenta abierta en un bróker internacional seguro",
      "La estrategia automatizada conectada",
      "La gestión de riesgo definida",
      "Y tu flujo de ingresos automáticos en dólares activado",
    ],
    grupoAlt: "Grupo de alumnos del Protocolo",
    grupoLegenda: "Alumnos que ya activaron el Protocolo",
  },
  comparacao: {
    titulo: <>Diferente de <span className="text-orange">todo</span> lo que ves en Instagram</>,
    naoTitulo: <>Lo que <span className="text-red">NO</span> es</>,
    nao: ["No son apuestas", "No es un casino online", "No es un robot milagroso", "No es una casa de apuestas"],
    eTitulo: <>Lo que <span className="text-green">SÍ</span> es</>,
    e: [
      "Es Mercado Financiero real",
      "Con estrategias validadas e historial público",
      "Con resultados auditados",
      "Con riesgo controlado",
      "Con un setup simple para principiantes",
    ],
    rodape: (
      <>
        Mientras mucha gente pierde dinero probando suerte, tú vas a seguir un modelo que usa{" "}
        <strong className="text-white">estadística, tecnología y análisis de riesgo</strong>, no apuestas.
      </>
    ),
  },
  conteudo: {
    titulo: <>Lo que vas a recibir dentro del <span className="text-orange">Protocolo</span></>,
    cards: [
      {
        titulo: "El Paso a Paso desde Cero",
        descricao: "Cómo abrir tu cuenta internacional, configurar todo correctamente y conectar tu cuenta a la estrategia automática en minutos.",
      },
      {
        titulo: "Checklist de Seguridad Validado",
        descricao: "Criterios, filtros y ejemplos reales de los profesionales que entregan consistencia y no promesas vacías.",
      },
      {
        titulo: "Guía de Gestión de Riesgo Simplificada",
        descricao: "Herramientas para proteger tu capital y mantener tu patrimonio seguro, incluso en un mercado volátil.",
      },
      {
        titulo: "Tutorial Práctico en 2 Horas",
        descricao: "Checklists, atajos y orientaciones claras para que implementes todo rápidamente.",
      },
    ],
    cta: "QUIERO COMPRAR AHORA",
  },
  provas: {
    titulo: <><span className="text-green">Prueba Social</span>: Resultados Reales</>,
    subtitulo: "No eres el primero al que le voy a enseñar. Mira los comentarios de quienes ya adquirieron el Protocolo",
    legendas: [
      "Alumno celebrando su primera ganancia en dólares",
      "Comentario positivo después de configurar el setup",
      "Resultado consistente en la primera semana",
      "Alumno impresionado con la simplicidad",
      "Cuenta activa generando resultados diarios",
      "Testimonio de un alumno satisfecho",
      "Setup funcionando automáticamente",
      "Resultados que superan las expectativas",
      "Ganancias recurrentes comprobadas",
      "Estrategia funcionando con éxito",
      "Alumno agradeciendo por el método",
      "Historial real de rendimientos",
    ],
  },
  oferta: {
    titulo: <>Accede al <span className="text-orange">Protocolo Ingreso Pasivo en 2H</span></>,
    subtitulo: "Todo lo que necesitas para activar tu flujo de ingresos automáticos en dólares",
    incluiTitulo: "Lo que recibes:",
    inclui: [
      ["Acceso completo al Protocolo", "Paso a paso desde cero"],
      ["Configuración del bróker internacional", "Cuenta lista para operar"],
      ["Estrategias validadas", "Filtradas y probadas"],
      ["Guía de gestión de riesgo", "Protege tu capital"],
      ["Configuración en hasta 2 horas", "Rápido y directo al grano"],
    ],
    de: "",
    porApenas: "Por solo",
    moeda: "US$",
    valor: "47",
    parcelas: "",
    cta: "QUIERO ACTIVAR MI SETUP AHORA",
    pagamento: "🔒 Pago 100% seguro",
    dias: "DÍAS",
    garantiaTitulo: <><span className="text-gold">Garantía Total</span> de 7 días</>,
    garantia: (
      <>
        Si lo ves y sientes que no es para ti, basta con pedir el reembolso. Te devuelvo el{" "}
        <strong className="text-green">100% del valor</strong>, sin preguntas y sin burocracia.
      </>
    ),
    urgencia: (
      <>
        La inversión de <strong className="text-green">{PRECO_ES}</strong> es un valor simbólico. Estás estructurando un flujo
        de ingresos en dólares con base real y validación práctica.
      </>
    ),
  },
  especialista: {
    titulo: <>¿Quién es el <span className="text-orange">Especialista</span>?</>,
    subtitulo: "Conoce un poco más sobre quién está detrás del Protocolo",
  },
  rodape: {
    titulo: <>¿Todavía tienes dudas? <span className="text-orange">No pierdas más tiempo</span></>,
    texto: `Con solo ${PRECO_ES} activas tu setup de ingreso pasivo en dólares. Garantía de 7 días o te devolvemos tu dinero.`,
    cta: "QUIERO EMPEZAR AHORA",
    aviso:
      "Este producto no garantiza la obtención de ganancias. Invertir implica riesgos y debes saber que los resultados pasados no garantizan resultados futuros.",
    termos: "Términos de Uso",
    privacidade: "Política de Privacidad",
    direitos: "Protocolo Ingreso Pasivo en 2H. Todos los derechos reservados.",
    desenvolvido: "Desarrollado por",
  },
};

export const ES = document.documentElement.lang === "es";
export const t = ES ? es : pt;
