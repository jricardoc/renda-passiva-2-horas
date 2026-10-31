import "./Footer.css";
import { Checkout } from "../../oferta";
import { t } from "../../textos";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        {/* Final CTA */}
        <div className="footer-cta-wrapper">
          <h2 className="footer-headline">{t.rodape.titulo}</h2>

          <p className="footer-subtext">{t.rodape.texto}</p>

          <Checkout href={t.checkout.pagina} className="btn-primary btn-pulse footer-cta">
            {t.rodape.cta}
          </Checkout>
        </div>

        <div className="footer-bottom">
          <p className="footer-disclaimer">{t.rodape.aviso}</p>

          <div className="footer-links">
            <a href="#">{t.rodape.termos}</a>
            <span className="divider">|</span>
            <a href="#">{t.rodape.privacidade}</a>
          </div>

          <p className="footer-copyright">
            © {new Date().getFullYear()} {t.rodape.direitos}
          </p>

          <p className="footer-cnpj">CNPJ: 53.724.905/0001-70</p>

          <p className="footer-developer">
            {t.rodape.desenvolvido}{" "}
            <a
              href="https://jricardodev.com.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              RICCS
            </a>{" "}
            /{" "}
            <a
              href="https://www.instagram.com/riccs.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @riccs.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
