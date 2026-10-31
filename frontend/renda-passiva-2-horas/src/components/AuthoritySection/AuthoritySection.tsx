import { useState } from "react";
import "./AuthoritySection.css";
import hendiImg from "../../assets/images/hendi.jpeg";
import graphImg from "../../assets/images/grafico-dados.jpeg";
import groupImg from "../../assets/images/group.jpeg";
import { t } from "../../textos";

const AuthoritySection = () => {
  const [showGraphLightbox, setShowGraphLightbox] = useState(false);

  return (
    <section className="authority-section animate-section">
      <div className="container authority-container">
        {/* Main content grid with Hendi photo and text */}
        <div className="authority-content">
          <div className="authority-image-wrapper">
            <div className="authority-image-glow"></div>
            <img
              src={hendiImg}
              alt={t.autoridade.fotoAlt}
              className="authority-image"
              width="533"
              height="800"
              loading="lazy"
            />
            <div className="authority-badge">
              <span className="badge-icon">✓</span>
              <span className="badge-text">Especialista</span>
            </div>
          </div>

          <div className="authority-text">
            <h2 className="authority-title">{t.autoridade.titulo}</h2>

            <p className="authority-intro">{t.autoridade.intro}</p>

            <p className="authority-description">{t.autoridade.historia}</p>

            {/* Strategy Graph Image - Clickable */}
            <div
              className="strategy-graph-wrapper clickable"
              onClick={() => setShowGraphLightbox(true)}
            >
              <img
                src={graphImg}
                alt={t.autoridade.graficoAlt}
                className="strategy-graph"
                width="1572"
                height="685"
                loading="lazy"
              />
              <span className="graph-zoom-hint">{t.autoridade.ampliar}</span>
            </div>

            {/* Lightbox for Graph */}
            {showGraphLightbox && (
              <div
                className="graph-lightbox"
                onClick={() => setShowGraphLightbox(false)}
              >
                <div className="lightbox-content">
                  <button
                    className="lightbox-close"
                    onClick={() => setShowGraphLightbox(false)}
                  >
                    ✕
                  </button>
                  <img src={graphImg} alt={t.autoridade.graficoAlt} />
                </div>
              </div>
            )}

            <p className="authority-description">{t.autoridade.alunos}</p>

            <div className="authority-checklist">
              <p className="checklist-intro">{t.autoridade.checklistIntro}</p>
              <ul className="checklist">
                {t.autoridade.checklist.map((item) => (
                  <li key={item}>
                    <span className="icon-check">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Group image - full width below the main content */}
        <div className="group-section">
          <img
            src={groupImg}
            alt={t.autoridade.grupoAlt}
            className="group-image"
            width="800"
            height="533"
            loading="lazy"
          />
          <p className="group-caption">{t.autoridade.grupoLegenda}</p>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
