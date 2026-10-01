// Backredirect da VSL: com DESTINO preenchido, o "voltar" do navegador leva à página do downsell, com a mesma query (UTMs).
// O navegador só respeita a entrada extra do histórico depois de um clique ou tecla, então ela nasce aí.
// Âncoras criam entradas sem estado e não disparam o desvio: só a volta até a entrada "origem".
// Vazio = desligado. Aponta para a página de desconto (cupom em oferta.tsx).
// Na própria página de desconto ele não arma: lá o voltar sai normalmente.
import { DESCONTO } from "./oferta";

const DESTINO: string = "/protocolo1/desconto/";

if (/^(https?:\/\/|\/)/.test(DESTINO) && !DESCONTO) {
  const eventos = ["click", "keydown", "pointerup"] as const;
  const armar = () => {
    eventos.forEach((t) => document.removeEventListener(t, armar, true));
    history.replaceState({ vsl: "origem" }, "");
    history.pushState({ vsl: "guarda" }, "");
  };
  eventos.forEach((t) => document.addEventListener(t, armar, true));
  addEventListener("popstate", (e) => {
    if (e.state?.vsl !== "origem") return;
    const q = location.search.slice(1);
    location.replace(DESTINO + (q ? (DESTINO.includes("?") ? "&" : "?") + q : ""));
  });
}

export {};
