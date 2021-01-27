# Stats

This script extracts webserver statistics to determine which tools were the most popular in the given interval.
See https://github.com/analysis-tools-dev/website/issues/27.

```bash
curl -H "Authorization: Bearer XXXX" 'https://dash.jorgelbg.me/api/datasources/proxy/14/api/v1/query?query=topk(20,%20sum(count_over_time({domain=~%22(analysis-tools\\.dev|www\\.analysis-tools\\.dev)%22,%20path=~%22/tool/.*%22}%20[30d]))%20by%20(path))&time=1606611828'
```




curl -H "Authorization: Bearer eyJrIjoidFZNZzhKcjdnQ0V5cXVod1pRVlZTdGhQQWxsc1V6RnoiLCJuIjoid2Vic2l0ZSBzdGF0cyIsImlkIjozfQ====" 'https://dash.jorgelbg.me/api/datasources/proxy/14/api/v1/query?query=topk(20,%20sum(count_over_time({domain=~%22(analysis-tools\\.dev|www\\.analysis-tools\\.dev)%22,%20path=~%22/tool/.*%22}%20[30d]))%20by%20(path))&time=1606611828' 



curl 'https://dash.jorgelbg.me/api/datasources/proxy/14/api/v1/query?query=topk(20,%20sum(count_over_time({domain=~%22(analysis-tools\\.dev|www\\.analysis-tools\\.dev)%22,%20path=~%22/tool/.*%22}%20[30d]))%20by%20(path))&time=1606611828' 