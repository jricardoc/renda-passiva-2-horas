#!/bin/sh
# Coleta os dados públicos da Carteira Oficial (portfólio 8) no DrawdownGuard e grava em
# /black/dados-ddg.json só o que a /black mostra, sem nenhum valor em $.
# Roda ao subir o container e duas vezes por dia pelo crond (ver Dockerfile).
# Se o DDG falhar ou mudar o formato, o arquivo anterior fica e a página mantém o que já tem.
set -eu

API=https://api.drawdownguard.com.br/public
ID=8
DEST=${1:-/usr/share/nginx/html/black/dados-ddg.json}
T=$(mktemp -d)
trap 'rm -rf "$T"' EXIT

pega() { curl -fsS --max-time 90 -A 'ohendi-black/1.0' "$API/$1" -o "$T/$2"; }
pega "portfolios/$ID/summary" resumo.json
pega "portfolios/$ID/equity-history" curva.json
pega "portfolios/$ID/accounts-detail" copys.json
pega "portfolios" lista.json
pega "stats" stats.json

jq -n --argjson id "$ID" \
  --slurpfile r "$T/resumo.json" --slurpfile c "$T/curva.json" --slurpfile a "$T/copys.json" \
  --slurpfile l "$T/lista.json" --slurpfile s "$T/stats.json" '
  ($l[0] | map(select(.id == $id))[0]) as $p | $c[0].data as $h |
  {
    portfolio: { id: $id, name: $p.name, copys: $r[0].total_accounts, days_active: $p.days_active, since: $h[0].date },
    kpis: { net_profit_percent: $r[0].total_net_profit_percent, avg_monthly_percent: $r[0].avg_monthly_percent, max_drawdown_percent: $r[0].max_drawdown_percent },
    curve: [ $h[] | { date, percentage: ((.percentage * 1000 | round) / 1000) } ],
    copies: [ $a[0][] | { net_profit_percent } ],
    community: { active_accounts: $s[0].active_accounts, trades_today: $s[0].trades_today, public_portfolios: $s[0].public_portfolios },
    updated_at: (now | todate)
  }
  | if (.kpis.net_profit_percent | type) == "number" and (.curve | length) >= 2 and (.copies | length) >= 1
    then . else error("formato inesperado do DrawdownGuard") end' > "$T/novo.json"

cp "$T/novo.json" "$DEST.tmp" && chmod 644 "$DEST.tmp" && mv "$DEST.tmp" "$DEST"
echo "black-coleta-ddg: $(date -u +%FT%TZ) ok, lucro $(jq -r '.kpis.net_profit_percent' "$DEST")%"
