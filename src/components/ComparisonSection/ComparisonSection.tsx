import "./ComparisonSection.css";

const ComparisonSection = () => {
  const notItems = [
    "Não é Bet",
    "Não é Tigrinho",
    "Não é Robô milagroso",
    "Não é Casa de Apostas",
  ];

  const isItems = [
    "É Mercado Financeiro real",
    "Com estratégias validadas e histórico público",
    "Com resultados auditados",
    "Com risco controlado",
    "Com setup simples para iniciantes",
  ];

  return (
    <section className="comparison-section animate-section">
      <div className="container">
        <h2 className="comparison-title">
          Diferente de <span className="text-orange">tudo</span> que você vê no
          Instagram
        </h2>

        <div className="comparison-grid">
          <div className="comparison-card comparison-not">
            <h3 className="card-title">
              O que <span className="text-red">NÃO</span> é
            </h3>
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
            <h3 className="card-title">
              O que <span className="text-green">É</span>
            </h3>
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

        <p className="comparison-footer">
          Enquanto muita gente perde dinheiro tentando a sorte, você vai seguir
          um modelo que usa{" "}
          <strong className="text-white">
            estatística, tecnologia e análise de risco
          </strong>{" "}
          - não apostas.
        </p>

        <div className="comparison-cta-wrapper">
          <a href="#oferta" className="btn-primary btn-pulse">
            QUERO ATIVAR MEU SETUP POR R$&nbsp;97
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
