import { useState } from "react";
import "./AuthoritySection.css";
import hendiImg from "../../assets/images/hendi.jpeg";
import graphImg from "../../assets/images/grafico-dados.jpeg";
import groupImg from "../../assets/images/group.jpeg";

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
              alt="Hendi - Especialista em Renda Passiva"
              className="authority-image"
              width="533"
              height="800"
            />
            <div className="authority-badge">
              <span className="badge-icon">✓</span>
              <span className="badge-text">Especialista</span>
            </div>
          </div>

          <div className="authority-text">
            <h2 className="authority-title">
              O que é o <span className="text-orange">Protocolo</span>?
            </h2>

            <p className="authority-intro">
              Eu sou o <strong className="text-white">Hendi</strong>,
              engenheiro, ex-Ford e especialista em geração de renda passiva.
            </p>

            <p className="authority-description">
              Depois de anos testando o mercado e estudando formas inteligentes
              de lucrar em dólar, desenvolvi um{" "}
              <strong className="text-orange">setup simples e eficiente</strong>{" "}
              que funciona na minha conta{" "}
              <strong className="text-green">há mais de 5 anos</strong>, e eu
              vou te provar tudo isso aqui dentro, em conta real.
            </p>

            {/* Strategy Graph Image - Clickable */}
            <div
              className="strategy-graph-wrapper clickable"
              onClick={() => setShowGraphLightbox(true)}
            >
              <img
                src={graphImg}
                alt="Gráfico de resultados da estratégia"
                className="strategy-graph"
                width="1572"
                height="685"
              />
              <span className="graph-zoom-hint">🔍 Clique para ampliar</span>
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
                  <img
                    src={graphImg}
                    alt="Gráfico de resultados da estratégia"
                  />
                </div>
              </div>
            )}

            <p className="authority-description">
              E o melhor: funciona também para vários alunos que seguiram o
              mesmo caminho. O Protocolo é um{" "}
              <strong className="text-green">plano de execução</strong>, não um
              curso teórico.
            </p>

            <div className="authority-checklist">
              <p className="checklist-intro">
                Você vai sentar comigo por até 2 horas e sair com tudo
                configurado:
              </p>
              <ul className="checklist">
                <li>
                  <span className="icon-check">✓</span> Sua conta aberta em
                  corretora internacional segura
                </li>
                <li>
                  <span className="icon-check">✓</span> A estratégia
                  automatizada conectada
                </li>
                <li>
                  <span className="icon-check">✓</span> A gestão de risco
                  definida
                </li>
                <li>
                  <span className="icon-check">✓</span> E seu fluxo de renda
                  automática em dólar ativado
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Group image - full width below the main content */}
        <div className="group-section">
          <img
            src={groupImg}
            alt="Grupo de alunos do Protocolo"
            className="group-image"
            width="800"
            height="533"
            loading="lazy"
          />
          <p className="group-caption">Alunos que já ativaram o Protocolo</p>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
