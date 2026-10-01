import type { AnchorHTMLAttributes } from "react";

// Página de desconto (/protocolo1/desconto/): o destino do backredirect. É a VSL sem o vídeo,
// com os botões levando ao checkout com o cupom já aplicado (parâmetro offDiscount da Hotmart).
// O cupom é de 17% no Protocolo, o que dá R$ 50 (R$ 297 por R$ 246,51 na Hotmart).
export const DESCONTO = /\/desconto\/?$/.test(location.pathname);
export const CUPOM = "PROTOCOLO5050";
export const CHECKOUT_DESCONTO = `https://pay.hotmart.com/N103487414R?checkoutMode=10&offDiscount=${CUPOM}`;
export const TEXTO_DESCONTO = "R$ 50 OFF NO ACESSO AO PROTOCOLO";

// Botão de checkout da VSL: na página de desconto troca o destino e o texto; na VSL fica como está.
export const Checkout = ({ href, children, ...resto }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={DESCONTO ? CHECKOUT_DESCONTO : href} {...resto}>
    {DESCONTO ? TEXTO_DESCONTO : children}
  </a>
);
