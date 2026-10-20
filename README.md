# Shortlist Price Index MCP server

An MCP (Model Context Protocol) server that gives AI agents software pricing data: entry prices (lowest paid plan per provider) and the true 3-year cost for categories such as web hosting, SEO tools, cloud backup, antivirus, password managers and email marketing, in USD and for the Dutch market in EUR. Prices are compiled from each provider's public pricing page and republished monthly since June 2026. An automated price watcher re-checks the figures against those pricing pages; figures it cannot confirm automatically (for example because of regional pricing or a cookie wall) are flagged for manual review. Each index carries the date its figures were last updated, and a category whose latest index is older than 35 days is withheld until its next verified refresh, so an agent never quotes an outdated price. Published as open data under CC BY 4.0 by Orai Media.

**Endpoint:** `https://shortlist-mcp.vercel.app/mcp` (streamable HTTP, no auth, free)

## Tools

| Tool | What it does |
|---|---|
| `list_categories` | The categories that are current, with slugs, units, currencies and the date of the latest update |
| `get_price_index` | Full index for one category: average, median, cheapest, every provider sorted by price, monthly history, methodology |
| `get_true_3yr_cost` | Honest 3-year cost per provider (year 1 intro, years 2-3 at renewal), ranked by real total, with the renewal multiplier. Published for web hosting and antivirus today |
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

- "What does an SEO tool cost per month right now, and which three are cheapest?"
- "Which web host is cheapest over three years, once the renewal price kicks in?"
- "Which antivirus suite costs the least over three years?"
- "Wat kost een wachtwoordmanager per maand in Nederland?"

## Sources

Every figure comes from the price index page of the comparison guide that publishes it. Each response carries that page as its citation.

| Category | Source |
|---|---|
| Cloud backup | [BackupShortlist Price Index](https://backupshortlist.com/data/price-index) |
| Web hosting | [HostingShortlist Price Index](https://hostingshortlist.com/data/price-index) |
| SEO tools | [SEOShortlist Price Index](https://seoshortlist.com/data/price-index) |
| Website builders | [WebsiteShortlist Price Index](https://websiteshortlist.com/data/price-index) |
| Antivirus | [AntivirusShortlist Price Index](https://antivirusshortlist.com/data/price-index) |
| Email marketing | [MailShortlist Price Index](https://mailshortlist.com/data/price-index) |
| Password managers | [PasswordShortlist Price Index](https://passwordshortlist.com/data/price-index) |
| Web hosting (Netherlands, EUR) | [KiesHosting Prijsindex](https://kieshosting.nl/data/price-index) |
| Password managers (Netherlands, EUR) | [Wachtwoordkiezer Prijsindex](https://wachtwoordkiezer.nl/data/price-index) |
| Newsletter tools (Netherlands, EUR) | [Nieuwsbriefkiezer Prijsindex](https://nieuwsbriefkiezer.nl/data/price-index) |

## Data

The server reads the live Price Index JSON endpoints of the Shortlist comparison sites (republished monthly, cached one hour) and the open dataset repository:

- Dataset with monthly history: https://github.com/ies86/shortlist-price-index
- Kaggle mirror: https://www.kaggle.com/datasets/ries86/shortlist-price-index

License: data CC BY 4.0 (attribution + link to the cited source site), code MIT.

## Run locally

```bash
npm install
npm run dev
# MCP endpoint on http://localhost:3000/mcp
```

## Self-host with Docker

The included `Dockerfile` builds a self-contained image of the same server (the production endpoint above is the hosted equivalent):

```bash
docker build -t shortlist-mcp .
docker run -p 3000:3000 shortlist-mcp
# MCP endpoint on http://localhost:3000/mcp
```

Built with [mcp-handler](https://www.npmjs.com/package/mcp-handler) on Next.js, deployed on Vercel.
