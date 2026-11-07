import type { AnchorHTMLAttributes } from "react";
import { t } from "./textos";

// Página de desconto (/protocolo1/desconto/ e /protocolo1/es/desconto/): o destino do backredirect. É a VSL sem o vídeo,
// com os botões levando ao checkout com o desconto já aplicado. O link e os textos de cada idioma ficam em textos.tsx
// (checkout.desconto e desconto).
export const DESCONTO = /\/desconto\/?$/.test(location.pathname);

// Botão de checkout da VSL: na página de desconto troca o destino e o texto; na VSL fica como está.
export const Checkout = ({ href, children, ...resto }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={DESCONTO ? t.checkout.desconto : href} {...resto}>
    {DESCONTO ? t.desconto.botao : children}
  </a>
);
