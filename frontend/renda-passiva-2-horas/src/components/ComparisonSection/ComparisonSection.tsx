import "./ComparisonSection.css";
import { Checkout } from "../../oferta";
import { t } from "../../textos";

const ComparisonSection = () => {
  const notItems = t.comparacao.nao;
  const isItems = t.comparacao.e;

  return (
    <section className="comparison-section animate-section">
      <div className="container">
        <h2 className="comparison-title">{t.comparacao.titulo}</h2>

        <div className="comparison-grid">
          <div className="comparison-card comparison-not">
            <h3 className="card-title">{t.comparacao.naoTitulo}</h3>
            <ul className="comparison-list">
              {notItems.map((item, index) => (
                <li key={index}>
                  <span className="icon-x">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="comparison-card comparison-is">
            <h3 className="card-title">{t.comparacao.eTitulo}</h3>
            <ul className="comparison-list">
              {isItems.map((item, index) => (
                <li key={index}>
                  <span className="icon-check">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="comparison-footer">{t.comparacao.rodape}</p>

        <div className="comparison-cta-wrapper">
          <Checkout href={t.checkout.pagina} className="btn-primary btn-pulse">
            {t.ctaPreco}
          </Checkout>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
