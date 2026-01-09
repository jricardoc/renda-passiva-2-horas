import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        {/* Final CTA */}
        <div className="footer-cta-wrapper">
          <h2 className="footer-headline">
            Ainda com dúvidas?{" "}
            <span className="text-orange">Não perca mais tempo</span>
          </h2>

          <p className="footer-subtext">
            Com apenas R$ 97 você ativa seu setup de renda passiva em dólar.
            Garantia de 7 dias ou seu dinheiro de volta.
          </p>

          <a href="#oferta" className="btn-primary btn-pulse footer-cta">
            QUERO COMEÇAR AGORA
          </a>
        </div>

        <div className="footer-bottom">
          <p className="footer-disclaimer">
            Este produto não garante a obtenção de lucros. Investir envolve
            riscos e você deve estar ciente de que resultados passados não
            garantem resultados futuros.
          </p>

          <div className="footer-links">
            <a href="#">Termos de Uso</a>
            <span className="divider">|</span>
            <a href="#">Política de Privacidade</a>
          </div>

          <p className="footer-copyright">
            © {new Date().getFullYear()} Protocolo Renda Passiva em 2H. Todos os
            direitos reservados.
          </p>

          <p className="footer-cnpj">CNPJ: 53.724.905/0001-70</p>

          <p className="footer-developer">
            Desenvolvido por{" "}
            <a
              href="https://jricardodev.com.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              RICCS
            </a>{" "}
            /{" "}
            <a
              href="https://www.instagram.com/jricardodev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @jricardodev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
