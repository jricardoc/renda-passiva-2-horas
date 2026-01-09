<?php
/**
 * Template Name: Página Renda Passiva 2 Horas
 * Versão PHP Pura - SEM wp_head/wp_footer (que interferem com Vturb)
 */

// Carrega o CSS do Vite build
$app_dir = get_stylesheet_directory() . '/app-renda-passiva/assets';
$app_uri = get_stylesheet_directory_uri() . '/app-renda-passiva/assets';
$css_files = glob($app_dir . '/index-*.css');
$css_url = !empty($css_files) ? $app_uri . '/' . basename($css_files[0]) : '';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Ative sua renda passiva automática em dólar em apenas 2 horas. Protocolo Renda Passiva em 2H.">
    <meta name="referrer" content="unsafe-url">
    <title>Protocolo Renda Passiva em 2H | Ative sua Renda em Dólar</title>
    
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PQSWPJKT');</script>
    <!-- End Google Tag Manager -->
    
    <!-- Preload Vturb SDK -->
    <link rel="dns-prefetch" href="https://cdn.converteai.net">
    <link rel="dns-prefetch" href="https://scripts.converteai.net">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Swiper CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css">
    
    <!-- Main CSS do build -->
    <?php if ($css_url) : ?>
    <link rel="stylesheet" href="<?php echo $css_url; ?>">
    <?php endif; ?>
</head>
<body class="lp-renda-passiva">

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQSWPJKT"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<div class="app">
    <!-- ===== HERO SECTION ===== -->
    <section class="hero-section">
        <div class="hero-bg-gradient"></div>
        <div class="container hero-container">
            <h1 class="hero-headline">
                Ative sua <span class="text-orange">renda passiva automática em dólar</span> — e faça sua conta trabalhar por você, <span class="text-green">todos os dias</span>
            </h1>
            
            <p class="hero-subheadline">
                Depois de anos investindo com estratégias automatizadas e validando um método que funciona na minha própria conta e na de centenas de alunos, eu empacotei tudo em um passo a passo direto ao ponto para você ativar hoje mesmo, sem enrolação.
            </p>
            
            <div class="hero-vsl-container">
                <div class="vsl-wrapper">
                    <!-- VTurb Smart Player via Iframe (isolado do GTM) -->
                    <script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script>
                    <div id="ifr_694f3a3771611df8184f17a9_wrapper" style="margin: 0 auto; width: 100%;">
                        <div style="position: relative; padding: 56.25% 0 0 0;" id="ifr_694f3a3771611df8184f17a9_aspect">
                            <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_694f3a3771611df8184f17a9" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload="this.onload=null, this.src='https://scripts.converteai.net/3f99e868-8a2c-4153-b834-85a358ba11f4/players/694f3a3771611df8184f17a9/v4/embed.html'+(location.search||'?')+'&vl='+encodeURIComponent(location.href)"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            
            <a href="#oferta" class="btn-primary btn-pulse hero-cta" id="hero-cta" style="display: none;">
                QUERO ATIVAR MEU SETUP POR R$&nbsp;97
            </a>
        </div>
    </section>

    <!-- ===== CONTENT GATE ===== -->
    <div class="content-gate locked" id="content-gate">
    
        <!-- ===== AUTHORITY SECTION ===== -->
        <section class="authority-section animate-section">
            <div class="container authority-container">
                <div class="authority-content">
                    <div class="authority-image-wrapper">
                        <div class="authority-image-glow"></div>
                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/hendi.jpeg" 
                             alt="Hendi - Especialista em Renda Passiva" 
                             class="authority-image skip-lazy" loading="eager">
                        <div class="authority-badge">
                            <span class="badge-icon">✓</span>
                            <span class="badge-text">Especialista</span>
                        </div>
                    </div>
                    
                    <div class="authority-text">
                        <h2 class="authority-title">
                            O que é o <span class="text-orange">Protocolo</span>?
                        </h2>
                        
                        <p class="authority-intro">
                            Eu sou o <strong class="text-white">Hendi</strong>, engenheiro, ex-Ford e especialista em geração de renda passiva.
                        </p>
                        
                        <p class="authority-description">
                            Depois de anos testando o mercado e estudando formas inteligentes de lucrar em dólar, desenvolvi um <strong class="text-orange">setup simples e eficiente</strong> que funciona na minha conta <strong class="text-green">há mais de 5 anos</strong>, e eu vou te provar tudo isso aqui dentro, em conta real.
                        </p>
                        
                        <div class="strategy-graph-wrapper clickable" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/grafico-dados.jpeg')">
                            <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/grafico-dados.jpeg" 
                                 alt="Gráfico de resultados da estratégia" 
                                 class="strategy-graph skip-lazy" loading="eager">
                            <span class="graph-zoom-hint">🔍 Clique para ampliar</span>
                        </div>
                        
                        <p class="authority-description">
                            E o melhor: funciona também para vários alunos que seguiram o mesmo caminho. O Protocolo é um <strong class="text-green">plano de execução</strong>, não um curso teórico.
                        </p>
                        
                        <div class="authority-checklist">
                            <p class="checklist-intro">Você vai sentar comigo por até 2 horas e sair com tudo configurado:</p>
                            <ul class="checklist">
                                <li><span class="icon-check">✓</span> Sua conta aberta em corretora internacional segura</li>
                                <li><span class="icon-check">✓</span> A estratégia automatizada conectada</li>
                                <li><span class="icon-check">✓</span> A gestão de risco definida</li>
                                <li><span class="icon-check">✓</span> E seu fluxo de renda automática em dólar ativado</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="group-section">
                    <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/group.jpeg" 
                         alt="Grupo de alunos do Protocolo" 
                         class="group-image skip-lazy" loading="eager">
                    <p class="group-caption">Alunos que já ativaram o Protocolo</p>
                </div>
            </div>
        </section>

        <!-- ===== COMPARISON SECTION ===== -->
        <section class="comparison-section animate-section">
            <div class="container">
                <h2 class="comparison-title">
                    Diferente de <span class="text-orange">tudo</span> que você vê no Instagram
                </h2>
                
                <div class="comparison-grid">
                    <div class="comparison-card comparison-not">
                        <h3 class="card-title">O que <span class="text-red">NÃO</span> é</h3>
                        <ul class="comparison-list">
                            <li><span class="icon-x">✕</span><span>Não é Bet</span></li>
                            <li><span class="icon-x">✕</span><span>Não é Tigrinho</span></li>
                            <li><span class="icon-x">✕</span><span>Não é Robô milagroso</span></li>
                            <li><span class="icon-x">✕</span><span>Não é Casa de Apostas</span></li>
                        </ul>
                    </div>
                    
                    <div class="comparison-card comparison-is">
                        <h3 class="card-title">O que <span class="text-green">É</span></h3>
                        <ul class="comparison-list">
                            <li><span class="icon-check">✓</span><span>É Mercado Financeiro real</span></li>
                            <li><span class="icon-check">✓</span><span>Com estratégias validadas e histórico público</span></li>
                            <li><span class="icon-check">✓</span><span>Com resultados auditados</span></li>
                            <li><span class="icon-check">✓</span><span>Com risco controlado</span></li>
                            <li><span class="icon-check">✓</span><span>Com setup simples para iniciantes</span></li>
                        </ul>
                    </div>
                </div>
                
                <p class="comparison-footer">
                    Enquanto muita gente perde dinheiro tentando a sorte, você vai seguir um modelo que usa <strong class="text-white">estatística, tecnologia e análise de risco</strong> - não apostas.
                </p>
                
                <div class="comparison-cta-wrapper">
                    <a href="#oferta" class="btn-primary btn-pulse">
                        QUERO ATIVAR MEU SETUP POR R$&nbsp;97
                    </a>
                </div>
            </div>
        </section>

        <!-- ===== CONTENT CARDS SECTION ===== -->
        <section class="content-cards-section">
            <div class="container">
                <h2 class="cards-title">
                    O que você vai receber dentro do <span class="text-orange">Protocolo</span>
                </h2>
                
                <div class="cards-grid">
                    <div class="content-card glass-card">
                        <div class="card-icon">📋</div>
                        <h3 class="card-name">O Passo a Passo do Zero</h3>
                        <p class="card-description">Como abrir sua conta internacional, configurar tudo corretamente e conectar sua conta à estratégia automática em minutos.</p>
                    </div>
                    
                    <div class="content-card glass-card">
                        <div class="card-icon">📊</div>
                        <h3 class="card-name">Checklist de Segurança Validado</h3>
                        <p class="card-description">Critérios, filtros e exemplos reais dos profissionais que entregam consistência e não promessas vazias.</p>
                    </div>
                    
                    <div class="content-card glass-card">
                        <div class="card-icon">🛡️</div>
                        <h3 class="card-name">Guia de Gestão de Risco Simplificado</h3>
                        <p class="card-description">Instrumentos para proteger seu capital e manter seu patrimônio seguro, mesmo num mercado volátil.</p>
                    </div>
                    
                    <div class="content-card glass-card">
                        <div class="card-icon">⚡</div>
                        <h3 class="card-name">Tutorial Prático em 2 Horas</h3>
                        <p class="card-description">Checklists, atalhos e orientações claras para você implementar tudo rapidamente.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== SOCIAL PROOF SECTION ===== -->
        <section class="social-proof-section">
            <div class="container">
                <h2 class="proof-title">
                    <span class="text-green">Prova Social</span> - Resultados Reais
                </h2>
                <p class="proof-subtitle">
                    Você não é o primeiro que irei ensinar. Veja os feedbacks de quem já adquiriu o Protocolo
                </p>
                
                <div class="proof-slider-wrapper">
                    <div class="swiper proof-swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="proof-item" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img1.jpeg')">
                                    <div class="proof-image-wrapper">
                                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img1.jpeg" alt="Aluno comemorando primeiro lucro em dólar" class="proof-image skip-lazy" loading="eager">
                                        <div class="proof-overlay"><span class="icon-check">✓</span></div>
                                    </div>
                                    <p class="proof-caption">Aluno comemorando primeiro lucro em dólar</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="proof-item" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img2.jpeg')">
                                    <div class="proof-image-wrapper">
                                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img2.jpeg" alt="Feedback positivo após configurar o setup" class="proof-image skip-lazy" loading="eager">
                                        <div class="proof-overlay"><span class="icon-check">✓</span></div>
                                    </div>
                                    <p class="proof-caption">Feedback positivo após configurar o setup</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="proof-item" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img3.jpeg')">
                                    <div class="proof-image-wrapper">
                                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img3.jpeg" alt="Resultado consistente na primeira semana" class="proof-image skip-lazy" loading="eager">
                                        <div class="proof-overlay"><span class="icon-check">✓</span></div>
                                    </div>
                                    <p class="proof-caption">Resultado consistente na primeira semana</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="proof-item" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img4.jpeg')">
                                    <div class="proof-image-wrapper">
                                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img4.jpeg" alt="Aluno impressionado com a simplicidade" class="proof-image skip-lazy" loading="eager">
                                        <div class="proof-overlay"><span class="icon-check">✓</span></div>
                                    </div>
                                    <p class="proof-caption">Aluno impressionado com a simplicidade</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="proof-item" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img5.jpeg')">
                                    <div class="proof-image-wrapper">
                                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img5.jpeg" alt="Conta ativa gerando resultados diários" class="proof-image skip-lazy" loading="eager">
                                        <div class="proof-overlay"><span class="icon-check">✓</span></div>
                                    </div>
                                    <p class="proof-caption">Conta ativa gerando resultados diários</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="proof-item" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img6.jpeg')">
                                    <div class="proof-image-wrapper">
                                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img6.jpeg" alt="Depoimento de aluno satisfeito" class="proof-image skip-lazy" loading="eager">
                                        <div class="proof-overlay"><span class="icon-check">✓</span></div>
                                    </div>
                                    <p class="proof-caption">Depoimento de aluno satisfeito</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="proof-item" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img7.jpeg')">
                                    <div class="proof-image-wrapper">
                                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img7.jpeg" alt="Setup funcionando automaticamente" class="proof-image skip-lazy" loading="eager">
                                        <div class="proof-overlay"><span class="icon-check">✓</span></div>
                                    </div>
                                    <p class="proof-caption">Setup funcionando automaticamente</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="proof-item" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img8.jpeg')">
                                    <div class="proof-image-wrapper">
                                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img8.jpeg" alt="Resultados superando expectativas" class="proof-image skip-lazy" loading="eager">
                                        <div class="proof-overlay"><span class="icon-check">✓</span></div>
                                    </div>
                                    <p class="proof-caption">Resultados superando expectativas</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="proof-item" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img9.png')">
                                    <div class="proof-image-wrapper">
                                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img9.png" alt="Ganhos recorrentes comprovados" class="proof-image skip-lazy" loading="eager">
                                        <div class="proof-overlay"><span class="icon-check">✓</span></div>
                                    </div>
                                    <p class="proof-caption">Ganhos recorrentes comprovados</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="proof-item" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img10.png')">
                                    <div class="proof-image-wrapper">
                                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img10.png" alt="Estratégia rodando com sucesso" class="proof-image skip-lazy" loading="eager">
                                        <div class="proof-overlay"><span class="icon-check">✓</span></div>
                                    </div>
                                    <p class="proof-caption">Estratégia rodando com sucesso</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="proof-item" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img11.png')">
                                    <div class="proof-image-wrapper">
                                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img11.png" alt="Aluno agradecendo pelo método" class="proof-image skip-lazy" loading="eager">
                                        <div class="proof-overlay"><span class="icon-check">✓</span></div>
                                    </div>
                                    <p class="proof-caption">Aluno agradecendo pelo método</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="proof-item" onclick="openLightbox('https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img12.png')">
                                    <div class="proof-image-wrapper">
                                        <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img12.png" alt="Histórico real de rendimentos" class="proof-image skip-lazy" loading="eager">
                                        <div class="proof-overlay"><span class="icon-check">✓</span></div>
                                    </div>
                                    <p class="proof-caption">Histórico real de rendimentos</p>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== OFFER/GUARANTEE SECTION ===== -->
        <section id="oferta" class="offer-section animate-section">
            <div class="container">
                <div class="offer-header">
                    <span class="offer-badge">🔥 OFERTA ESPECIAL</span>
                    <h2 class="offer-title">
                        Acesse o <span class="text-orange">Protocolo Renda Passiva em 2H</span>
                    </h2>
                    <p class="offer-subtitle">
                        Tudo que você precisa para ativar seu fluxo de renda automática em dólar
                    </p>
                </div>
                
                <div class="offer-main-box">
                    <div class="offer-includes">
                        <h3 class="includes-title">O que você recebe:</h3>
                        <ul class="includes-list">
                            <li>
                                <span class="icon-check">✓</span>
                                <div class="include-item">
                                    <strong>Acesso completo ao Protocolo</strong>
                                    <span class="include-value">Passo a passo do zero</span>
                                </div>
                            </li>
                            <li>
                                <span class="icon-check">✓</span>
                                <div class="include-item">
                                    <strong>Setup da corretora internacional</strong>
                                    <span class="include-value">Conta pronta para operar</span>
                                </div>
                            </li>
                            <li>
                                <span class="icon-check">✓</span>
                                <div class="include-item">
                                    <strong>Estratégias validadas</strong>
                                    <span class="include-value">Filtradas e testadas</span>
                                </div>
                            </li>
                            <li>
                                <span class="icon-check">✓</span>
                                <div class="include-item">
                                    <strong>Guia de gestão de risco</strong>
                                    <span class="include-value">Proteja seu capital</span>
                                </div>
                            </li>
                            <li>
                                <span class="icon-check">✓</span>
                                <div class="include-item">
                                    <strong>Configuração em até 2 horas</strong>
                                    <span class="include-value">Rápido e direto ao ponto</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="price-box">
                        <div class="price-top">
                            <span class="price-from">De <s>R$ 497</s></span>
                            <span class="price-to">Por apenas</span>
                        </div>
                        
                        <div class="price-main">
                            <span class="price-currency">R$</span>
                            <span class="price-value">97</span>
                        </div>
                        
                        <span class="price-installments">ou 12x de R$ 9,70</span>
                        
                        <a href="https://pay.hotmart.com/N103487414R?bid=1766848545032" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="btn-primary btn-pulse offer-cta">
                            QUERO ATIVAR MEU SETUP AGORA
                        </a>
                        
                        <div class="payment-icons">
                            <span>💳</span>
                            <span>🔒 Pagamento 100% seguro</span>
                        </div>
                    </div>
                </div>
                
                <div class="guarantee-strip">
                    <div class="guarantee-badge-small">
                        <div class="badge-inner-small">
                            <span class="badge-days-small">7</span>
                            <span class="badge-text-small">DIAS</span>
                        </div>
                    </div>
                    
                    <div class="guarantee-info">
                        <h4 class="guarantee-heading">
                            <span class="text-gold">Garantia Total</span> de 7 dias
                        </h4>
                        <p class="guarantee-desc">
                            Se você assistir e sentir que não é para você, basta pedir o reembolso. 
                            Devolvo <strong class="text-green">100% do valor</strong>, sem perguntas, sem burocracia.
                        </p>
                    </div>
                </div>
                
                <div class="urgency-bar">
                    <span class="urgency-icon">⚡</span>
                    <p class="urgency-text">
                        O investimento de <strong class="text-green">R$ 97</strong> é um valor simbólico. 
                        Você está estruturando um fluxo de renda em dólar com base real e validação prática.
                    </p>
                </div>
            </div>
        </section>

        <!-- ===== SPECIALIST SECTION ===== -->
        <section class="specialist-section animate-section">
            <div class="container">
                <div class="specialist-header">
                    <h2 class="specialist-title">
                        Quem é o <span class="text-orange">Especialista</span>?
                    </h2>
                    <p class="specialist-subtitle">
                        Conheça um pouco mais sobre quem está por trás do Protocolo
                    </p>
                </div>
            </div>
            
            <div class="specialist-slider-fullwidth">
                <div class="swiper specialist-swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="specialist-slide">
                                <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-1.webp" alt="Hendi - Foto 1" class="specialist-image skip-lazy" loading="eager">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="specialist-slide">
                                <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-2.webp" alt="Hendi - Foto 2" class="specialist-image skip-lazy" loading="eager">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="specialist-slide">
                                <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-3.webp" alt="Hendi - Foto 3" class="specialist-image skip-lazy" loading="eager">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="specialist-slide">
                                <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-4.webp" alt="Hendi - Foto 4" class="specialist-image skip-lazy" loading="eager">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="specialist-slide">
                                <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-5.webp" alt="Hendi - Foto 5" class="specialist-image skip-lazy" loading="eager">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="specialist-slide">
                                <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-6.webp" alt="Hendi - Foto 6" class="specialist-image skip-lazy" loading="eager">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="specialist-slide">
                                <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-7.webp" alt="Hendi - Foto 7" class="specialist-image skip-lazy" loading="eager">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="specialist-slide">
                                <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-8.webp" alt="Hendi - Foto 8" class="specialist-image skip-lazy" loading="eager">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="specialist-slide">
                                <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-9.webp" alt="Hendi - Foto 9" class="specialist-image skip-lazy" loading="eager">
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="specialist-slide">
                                <img src="https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-10.webp" alt="Hendi - Foto 10" class="specialist-image skip-lazy" loading="eager">
                            </div>
                        </div>
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
        </section>

        <!-- ===== FOOTER ===== -->
        <footer class="footer-section">
            <div class="container">
                <div class="footer-cta-wrapper">
                    <h2 class="footer-headline">
                        Ainda com dúvidas? <span class="text-orange">Não perca mais tempo</span>
                    </h2>
                    <p class="footer-subtext">
                        Com apenas R$ 97 você ativa seu setup de renda passiva em dólar. Garantia de 7 dias ou seu dinheiro de volta.
                    </p>
                    <a href="#oferta" class="btn-primary btn-pulse footer-cta">
                        QUERO COMEÇAR AGORA
                    </a>
                </div>
                
                <div class="footer-bottom">
                    <p class="footer-disclaimer">
                        Este produto não garante a obtenção de lucros. Investir envolve riscos e você deve estar ciente de que resultados passados não garantem resultados futuros.
                    </p>
                    
                    <div class="footer-links">
                        <a href="#">Termos de Uso</a>
                        <span class="divider">|</span>
                        <a href="#">Política de Privacidade</a>
                    </div>
                    
                    <p class="footer-copyright">
                        © <?php echo date('Y'); ?> Protocolo Renda Passiva em 2H. Todos os direitos reservados.
                    </p>
                    
                    <p class="footer-cnpj">CNPJ: 53.724.905/0001-70</p>
                    
                    <p class="footer-developer">
                        Desenvolvido por <a href="https://jricardodev.com.br" target="_blank" rel="noopener noreferrer">RICCS</a> / 
                        <a href="https://www.instagram.com/jricardodev/" target="_blank" rel="noopener noreferrer">@jricardodev</a>
                    </p>
                </div>
            </div>
        </footer>

    </div><!-- .content-gate -->


    <!-- WhatsApp Button -->
    <a href="https://wa.me/557199512069?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Protocolo%20Renda%20Passiva%20em%202H." 
       target="_blank" 
       rel="noopener noreferrer" 
       class="whatsapp-float" 
       aria-label="Fale conosco no WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" class="whatsapp-icon">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
    </a>

</div><!-- .app -->

<!-- Lightbox -->
<div class="lightbox" id="lightbox" style="display: none;" onclick="closeLightbox()">
    <div class="lightbox-content">
        <button class="lightbox-close" onclick="closeLightbox()">✕</button>
        <img src="" alt="Imagem ampliada" id="lightbox-img">
    </div>
</div>

<!-- GSAP (depois do Vturb) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

<script>
// ===== LÓGICA DE DESBLOQUEIO POR TEMPO (VTurb v4) =====
(function() {
    var SECONDS_TO_DISPLAY = 338; // 5:38 minutos
    var elsDisplayed = false;
    var alreadyDisplayedKey = 'alreadyElsDisplayed' + SECONDS_TO_DISPLAY;
    var alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);
    var lastLoggedTime = -1;

    function showHiddenElements() {
        if (elsDisplayed) return;
        elsDisplayed = true;
        console.log('[Vturb] ✅ DESBLOQUEANDO CONTEÚDO!');
        
        var contentGate = document.getElementById('content-gate');
        var heroCta = document.getElementById('hero-cta');
        
        if (contentGate) {
            contentGate.classList.remove('locked');
            contentGate.classList.add('unlocked');
        }
        if (heroCta) {
            heroCta.style.display = '';
        }
        
        localStorage.setItem(alreadyDisplayedKey, 'true');
        
        setTimeout(function() {
            if (typeof initScrollAnimations === 'function') {
                initScrollAnimations();
            }
        }, 100);
    }

    function checkTime(currentTime) {
        if (elsDisplayed) return;
        
        var roundedTime = Math.floor(currentTime / 30) * 30;
        if (roundedTime > 0 && roundedTime !== lastLoggedTime) {
            lastLoggedTime = roundedTime;
            console.log('[Vturb] ⏱️ Tempo: ' + Math.floor(currentTime) + 's / ' + SECONDS_TO_DISPLAY + 's');
        }
        
        if (currentTime >= SECONDS_TO_DISPLAY) {
            console.log('[Vturb] ✅ Tempo atingido! (' + Math.floor(currentTime) + 's)');
            showHiddenElements();
        }
    }

    // Verifica se já foi desbloqueado anteriormente
    if (alreadyElsDisplayed === 'true') {
        console.log('[Vturb] ✅ Já foi desbloqueado anteriormente');
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showHiddenElements);
        } else {
            showHiddenElements();
        }
        return;
    }

    console.log('[Vturb] 🎬 Iniciando monitoramento do vídeo...');

    // MÉTODO PRINCIPAL: Intercepta TODOS os eventos dispatchEvent
    // O VTurb dispara eventos em elementos internos, não no window
    var originalDispatchEvent = EventTarget.prototype.dispatchEvent;
    EventTarget.prototype.dispatchEvent = function(event) {
        if (event && event.type && !elsDisplayed) {
            // Captura video:timeupdate
            if (event.type === 'video:timeupdate') {
                var detail = event.detail || {};
                var time = detail.time || 0;
                if (time > 0) {
                    checkTime(time);
                }
            }
            
            // Captura eventos de fim do vídeo
            if (event.type === 'video:ended' || event.type === 'video:end' || event.type === 'video:finish') {
                console.log('[Vturb] 🏁 Vídeo terminou!');
                showHiddenElements();
            }
        }
        return originalDispatchEvent.apply(this, arguments);
    };

})();

// ===== GSAP =====
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    document.querySelectorAll('.animate-section').forEach(function(section) {
        gsap.fromTo(section,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    gsap.fromTo('.content-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.cards-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ===== HERO ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);
    
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo('.hero-headline', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo('.hero-subheadline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .fromTo('.hero-vsl-container', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.4')
      .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
});

// ===== SWIPER =====
document.addEventListener('DOMContentLoaded', function() {
    new Swiper('.proof-swiper', {
        spaceBetween: 20,
        slidesPerView: 1,
        autoHeight: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        autoplay: { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true },
        loop: true,
        breakpoints: {
            480: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 }
        }
    });
    
    new Swiper('.specialist-swiper', {
        spaceBetween: 16,
        slidesPerView: 2,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        loop: true,
        autoplay: { delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true },
        grabCursor: true,
        breakpoints: {
            768: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 20 }
        }
    });
});

// ===== LIGHTBOX =====
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
});
</script>

</body>
</html>