import "./GuaranteeSection.css";

const GuaranteeSection = () => {
  return (
    <section id="oferta" className="offer-section animate-section">
      <div className="container">
        {/* Offer Header */}
        <div className="offer-header">
          <span className="offer-badge">🔥 OFERTA ESPECIAL</span>
          <h2 className="offer-title">
            Acesse o{" "}
            <span className="text-orange">Protocolo Renda Passiva em 2H</span>
          </h2>
          <p className="offer-subtitle">
            Tudo que você precisa para ativar seu fluxo de renda automática em
            dólar
          </p>
        </div>

        {/* Main Offer Box */}
        <div className="offer-main-box">
          {/* What's Included */}
          <div className="offer-includes">
            <h3 className="includes-title">O que você recebe:</h3>

            <ul className="includes-list">
              <li>
                <span className="icon-check">✓</span>
                <div className="include-item">
                  <strong>Acesso completo ao Protocolo</strong>
                  <span className="include-value">Passo a passo do zero</span>
                </div>
              </li>
              <li>
                <span className="icon-check">✓</span>
                <div className="include-item">
                  <strong>Setup da corretora internacional</strong>
                  <span className="include-value">
                    Conta pronta para operar
                  </span>
                </div>
              </li>
              <li>
                <span className="icon-check">✓</span>
                <div className="include-item">
                  <strong>Estratégias validadas</strong>
                  <span className="include-value">Filtradas e testadas</span>
                </div>
              </li>
              <li>
                <span className="icon-check">✓</span>
                <div className="include-item">
                  <strong>Guia de gestão de risco</strong>
                  <span className="include-value">Proteja seu capital</span>
                </div>
              </li>
              <li>
                <span className="icon-check">✓</span>
                <div className="include-item">
                  <strong>Configuração em até 2 horas</strong>
                  <span className="include-value">
                    Rápido e direto ao ponto
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Price Box */}
          <div className="price-box">
            <div className="price-top">
              <span className="price-from">
                De <s>R$ 497</s>
              </span>
              <span className="price-to">Por apenas</span>
            </div>

            <div className="price-main">
              <span className="price-currency">R$</span>
              <span className="price-value">97</span>
            </div>

            <span className="price-installments">ou 12x de R$ 9,70</span>

            <a
              href="https://pay.hotmart.com/N103487414R?bid=1766848545032"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-pulse offer-cta"
            >
              QUERO ATIVAR MEU SETUP AGORA
            </a>

            <div className="payment-icons">
              <span>💳</span>
              <span>🔒 Pagamento 100% seguro</span>
            </div>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="guarantee-strip">
          <div className="guarantee-badge-small">
            <div className="badge-inner-small">
              <span className="badge-days-small">7</span>
              <span className="badge-text-small">DIAS</span>
            </div>
          </div>

          <div className="guarantee-info">
            <h4 className="guarantee-heading">
              <span className="text-gold">Garantia Total</span> de 7 dias
            </h4>
            <p className="guarantee-desc">
              Se você assistir e sentir que não é para você, basta pedir o
              reembolso. Devolvo{" "}
              <strong className="text-green">100% do valor</strong>, sem
              perguntas, sem burocracia.
            </p>
          </div>
        </div>

        {/* Urgency */}
        <div className="urgency-bar">
          <span className="urgency-icon">⚡</span>
          <p className="urgency-text">
            O investimento de <strong className="text-green">R$ 97</strong> é um
            valor simbólico. Você está estruturando um fluxo de renda em dólar
            com base real e validação prática.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
