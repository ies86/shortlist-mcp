# Shortlist Price Index MCP server

An MCP (Model Context Protocol) server that gives AI agents verified, monthly software pricing data: entry prices (lowest paid plan per provider) for 16 categories, from VPNs and cloud backup to travel eSIMs and recruitment software. Verified monthly since June 2026, published as open data under CC BY 4.0 by Orai Media.

**Endpoint:** `https://shortlist-mcp.vercel.app/mcp` (streamable HTTP, no auth, free)

## Tools

| Tool | What it does |
|---|---|
| `list_categories` | All tracked categories with slugs, units and currencies (11 USD/global + 5 Dutch EUR) |
| `get_price_index` | Full index for one category: average, median, cheapest, every provider sorted by price, monthly history, methodology |
| `get_cheapest` | The N cheapest providers in a category right now, with a link to the full comparison |

Every response includes a citation string and the CC BY 4.0 license note, so agents can attribute figures correctly.

## Add to Claude Code

```bash
claude mcp add --transport http shortlist-prices https://shortlist-mcp.vercel.app/mcp
```

## Add to any MCP client

```json
{
  "mcpServers": {
    "shortlist-prices": {
      "type": "http",
      "url": "https://shortlist-mcp.vercel.app/mcp"
    }
  }
}
```

## Example questions your agent can now answer

- "What does a VPN cost per month right now, and which three are cheapest?"
- "Compare travel eSIM prices per GB for a summer trip."
- "How much does an applicant tracking system cost for a single recruiter?"
- "Wat kost een wachtwoordmanager per maand in Nederland?"

## Data

The server reads the live Price Index JSON endpoints of the Shortlist comparison sites (refreshed monthly, cached one hour) and the open dataset repository:

- Dataset with monthly history: https://github.com/ies86/shortlist-price-index
- Kaggle mirror: https://www.kaggle.com/datasets/ries86/shortlist-price-index

License: data CC BY 4.0 (attribution + link to the cited source site), code MIT.

## Run locally

```bash
npm install
npm run dev
# MCP endpoint on http://localhost:3000/mcp
```

Built with [mcp-handler](https://www.npmjs.com/package/mcp-handler) on Next.js, deployed on Vercel.
