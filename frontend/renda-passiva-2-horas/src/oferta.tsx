import type { AnchorHTMLAttributes } from "react";

// Página de desconto (/protocolo1/desconto/): o destino do backredirect. É a VSL sem o vídeo,
// com os botões levando ao checkout com o cupom de R$ 50 já aplicado (parâmetro offDiscount da Hotmart).
export const DESCONTO = /\/desconto\/?$/.test(location.pathname);
export const CUPOM = "PROTOCOLO50";
export const CHECKOUT_DESCONTO = `https://pay.hotmart.com/N103487414R?checkoutMode=10&offDiscount=${CUPOM}`;
export const TEXTO_DESCONTO = "R$ 50 OFF NO ACESSO AO PROTOCOLO";

// Botão de checkout da VSL: na página de desconto troca o destino e o texto; na VSL fica como está.
export const Checkout = ({ href, children, ...resto }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={DESCONTO ? CHECKOUT_DESCONTO : href} {...resto}>
    {DESCONTO ? TEXTO_DESCONTO : children}
  </a>
);
