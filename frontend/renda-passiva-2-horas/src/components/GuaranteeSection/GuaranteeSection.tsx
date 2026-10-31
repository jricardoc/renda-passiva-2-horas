import "./GuaranteeSection.css";
import { Checkout } from "../../oferta";
import { t } from "../../textos";

const GuaranteeSection = () => {
  return (
    <section id="oferta" className="offer-section animate-section">
      <div className="container">
        {/* Offer Header */}
        <div className="offer-header">
          <span className="offer-badge">🔥 OFERTA ESPECIAL</span>
          <h2 className="offer-title">{t.oferta.titulo}</h2>
          <p className="offer-subtitle">{t.oferta.subtitulo}</p>
        </div>

        {/* Main Offer Box (sem preço, a caixa de preço some e a grade fica com uma coluna) */}
        <div className="offer-main-box" style={t.oferta.valor ? undefined : { gridTemplateColumns: "1fr" }}>
          {/* What's Included */}
          <div className="offer-includes">
            <h3 className="includes-title">{t.oferta.incluiTitulo}</h3>

            <ul className="includes-list">
              {t.oferta.inclui.map(([item, valor]) => (
                <li key={item}>
                  <span className="icon-check">✓</span>
                  <div className="include-item">
                    <strong>{item}</strong>
                    <span className="include-value">{valor}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Box */}
          {t.oferta.valor && (
            <div className="price-box">
              <div className="price-top">
                <span className="price-from">
                  De <s>{t.oferta.de}</s>
                </span>
                <span className="price-to">{t.oferta.porApenas}</span>
              </div>

              <div className="price-main">
                <span className="price-currency">{t.oferta.moeda}</span>
                <span className="price-value">{t.oferta.valor}</span>
              </div>

              {t.oferta.parcelas && (
                <span className="price-installments">{t.oferta.parcelas}</span>
              )}

              <Checkout
                href={t.checkout.pagina}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-pulse offer-cta"
              >
                {t.oferta.cta}
              </Checkout>

              <div className="payment-icons">
                <span>💳</span>
                <span>{t.oferta.pagamento}</span>
              </div>
            </div>
          )}
        </div>

        {/* Guarantee Section */}
        <div className="guarantee-strip">
          <div className="guarantee-badge-small">
            <div className="badge-inner-small">
              <span className="badge-days-small">7</span>
              <span className="badge-text-small">{t.oferta.dias}</span>
            </div>
          </div>

          <div className="guarantee-info">
            <h4 className="guarantee-heading">{t.oferta.garantiaTitulo}</h4>
            <p className="guarantee-desc">{t.oferta.garantia}</p>
          </div>
        </div>

        {/* Urgency */}
        <div className="urgency-bar">
          <span className="urgency-icon">⚡</span>
          <p className="urgency-text">{t.oferta.urgencia}</p>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
