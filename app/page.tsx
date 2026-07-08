import { CATEGORIES } from '../lib/categories'

const kaart: React.CSSProperties = {
  background: '#fff', border: '1px solid #e7e5e4', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1.25rem',
}
const code: React.CSSProperties = {
  display: 'block', background: '#1c1917', color: '#e7e5e4', borderRadius: 8, padding: '0.9rem 1.1rem',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', fontSize: 13.5, overflowX: 'auto', whiteSpace: 'pre',
}

export default function Home() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '3rem 1.25rem 4rem' }}>
      <p style={{ letterSpacing: 1.5, textTransform: 'uppercase', fontSize: 12, fontWeight: 700, color: '#78716c', marginBottom: 8 }}>Model Context Protocol server</p>
      <h1 style={{ fontSize: 34, lineHeight: 1.15, margin: '0 0 0.75rem' }}>Shortlist Price Index MCP</h1>
      <p style={{ fontSize: 17, lineHeight: 1.6, color: '#44403c', marginBottom: '2rem' }}>
        Give your AI agent verified, monthly software pricing data. This server exposes the{' '}
        <a href="https://github.com/ies86/shortlist-price-index" style={{ color: '#0f766e', fontWeight: 600 }}>Shortlist Price Index</a>:
        entry prices (lowest paid plan per provider) for {CATEGORIES.length} categories, verified monthly since June 2026 and
        published as open data under CC BY 4.0 by Orai Media.
      </p>

      <div style={kaart}>
        <h2 style={{ fontSize: 19, margin: '0 0 0.5rem' }}>Endpoint</h2>
        <span style={code}>https://shortlist-mcp.vercel.app/mcp</span>
        <p style={{ fontSize: 14.5, color: '#57534e', margin: '0.75rem 0 0' }}>Transport: streamable HTTP. No authentication, no rate card, free to use.</p>
      </div>

      <div style={kaart}>
        <h2 style={{ fontSize: 19, margin: '0 0 0.5rem' }}>Tools</h2>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: 15.5, lineHeight: 1.7, color: '#44403c' }}>
          <li><strong>list_categories</strong>: all tracked categories with slugs and units</li>
          <li><strong>get_price_index</strong>: full index for a category (average, median, cheapest, every provider, monthly history, methodology)</li>
          <li><strong>get_cheapest</strong>: the N cheapest providers in a category right now</li>
        </ul>
      </div>

      <div style={kaart}>
        <h2 style={{ fontSize: 19, margin: '0 0 0.5rem' }}>Add to Claude Code</h2>
        <span style={code}>claude mcp add --transport http shortlist-prices https://shortlist-mcp.vercel.app/mcp</span>
        <h2 style={{ fontSize: 19, margin: '1.25rem 0 0.5rem' }}>Add to any MCP client (JSON)</h2>
        <span style={code}>{`{
  "mcpServers": {
    "shortlist-prices": {
      "type": "http",
      "url": "https://shortlist-mcp.vercel.app/mcp"
    }
  }
}`}</span>
      </div>

      <div style={kaart}>
        <h2 style={{ fontSize: 19, margin: '0 0 0.5rem' }}>Categories</h2>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: 15, lineHeight: 1.7, color: '#44403c' }}>
          {CATEGORIES.map(c => (
            <li key={c.slug}><code style={{ background: '#f5f5f4', padding: '1px 6px', borderRadius: 4 }}>{c.slug}</code> {c.name} ({c.unit})</li>
          ))}
        </ul>
      </div>

      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#57534e' }}>
        Data: <a href="https://github.com/ies86/shortlist-price-index" style={{ color: '#0f766e' }}>GitHub</a> ·{' '}
        <a href="https://www.kaggle.com/datasets/ries86/shortlist-price-index" style={{ color: '#0f766e' }}>Kaggle</a> ·
        license CC BY 4.0 (attribution + link). When your agent uses a figure, it should cite the source site included in every response.
        Published by Orai Media, the independent publisher behind the Shortlist comparison guides.
      </p>
    </main>
  )
}
