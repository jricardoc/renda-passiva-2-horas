import { useEffect, useRef, useState } from "react";
import { t } from "../../textos";
import "./Desconto.css";

// Confete em CSS: cada peça com posição, altura, tamanho, cor, duração e atraso próprios.
const CONFETE = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${-10 - ((i * 23) % 60)}px`,
  width: i % 3 ? "7px" : "10px",
  background: ["#ffd700", "#ff6300", "#00ff00", "#ffffff"][i % 4],
  animationDuration: `${1.3 + ((i * 7) % 10) / 10}s`,
  animationDelay: `${((i * 13) % 7) / 10}s`,
}));

// Topo da página de desconto: o presente abre o popup do cupom (e ele abre sozinho em 1,5 s).
const Desconto = () => {
  const [aberto, setAberto] = useState(false);
  const [revelado, setRevelado] = useState(false);
  const cta = useRef<HTMLAnchorElement>(null);

  const abrir = () => {
    setAberto(true);
    setRevelado(true);
  };

  useEffect(() => {
    document.title = t.desconto.tituloAba;
    const timer = setTimeout(abrir, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    cta.current?.focus();
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", esc);
    };
  }, [aberto]);

  return (
    <section className="desconto">
      <p className="desconto-espera">{t.desconto.espera}</p>
      <h1 className="desconto-titulo">{t.desconto.titulo}</h1>

      {revelado ? (
        <>
          <p className="desconto-cupom">{t.desconto.cupom}</p>
          <a className="btn-primary btn-pulse desconto-cta" href={t.checkout.desconto}>
            {t.desconto.botao}
          </a>
        </>
      ) : (
        <button className="desconto-presente" onClick={abrir}>
          <span className="desconto-presente-emoji" aria-hidden="true">🎁</span>
          <span className="desconto-presente-dica">{t.desconto.abrir}</span>
        </button>
      )}

      {aberto && (
        <div
          className="desconto-fundo"
          onClick={(e) => e.target === e.currentTarget && setAberto(false)}
        >
          <div
            className="desconto-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="desconto-popup-titulo"
          >
            <button className="desconto-fechar" onClick={() => setAberto(false)} aria-label={t.desconto.fechar}>
              ✕
            </button>
            <div className="desconto-confete" aria-hidden="true">
              {CONFETE.map((estilo, i) => (
                <i key={i} style={estilo} />
              ))}
            </div>
            <p className="desconto-parabens">{t.desconto.parabens}</p>
            <h2 id="desconto-popup-titulo" className="desconto-ganhou">
              {t.desconto.ganhou}
            </h2>
            <p className="desconto-produto">{t.desconto.produto}</p>
            <p className="desconto-preco">{t.desconto.preco}</p>
            <p className="desconto-aplicado">{t.desconto.aplicado}</p>
            <a ref={cta} className="btn-primary desconto-cta" href={t.checkout.desconto}>
              {t.desconto.botao}
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Desconto;
