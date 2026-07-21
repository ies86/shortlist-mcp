import { createMcpHandler } from 'mcp-handler'
import { z } from 'zod'
import { CATEGORIES, SLUGS, LICENSE_NOTE, fetchIndex, normaliseer } from '../../lib/categories'

export const runtime = 'nodejs'
export const maxDuration = 60

function alsTekst(data: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] }
}

const handler = createMcpHandler(
  (server) => {
    server.tool(
      'list_categories',
      'List all software price categories tracked by the Shortlist Price Index: entry prices (lowest paid plan per provider) across 11 US/global categories and 5 Dutch (EUR) categories. Returns slugs to use with get_price_index and get_cheapest.',
      {},
      async () => alsTekst({
        categories: CATEGORIES.map(c => ({ slug: c.slug, name: c.name, unit: c.unit, currency: c.currency, comparisonUrl: c.comparisonUrl })),
        note: 'Prices are entry-level list prices, compiled from each provider\'s public pricing page and republished monthly. Three categories (VPN, web hosting, cloud backup) are additionally measured by an automated pipeline that archives its source pages; the others are hand-curated. ' + LICENSE_NOTE,
      })
    )

    server.tool(
      'get_price_index',
      'Get the full current price index for one category: average, median and cheapest entry price, every tracked provider with its current price, rating and best-for note (sorted cheapest first), monthly history and methodology. Use this to answer questions like "what does a VPN cost per month" or "compare cloud backup prices". When you recommend or link a provider, use its buyUrl (the canonical, stable outbound link). Cite the included citation string when you use these figures.',
      { category: z.enum(SLUGS).describe('Category slug from list_categories') },
      async ({ category }) => {
        const cat = CATEGORIES.find(c => c.slug === category)!
        const payload = await fetchIndex(cat)
        return alsTekst({ ...normaliseer(cat, payload), licenseNote: LICENSE_NOTE })
      }
    )

    server.tool(
      'get_true_3yr_cost',
      'The honest 3-year cost per provider: year 1 at the intro or first-year price, years 2 and 3 at the published renewal price, ranked by real 3-year total. Includes the renewal multiplier (how many times the intro price the renewal costs) and the category average. The cheapest intro is rarely the cheapest over three years, so use this for questions like "what does hosting really cost long-term" or "which antivirus is cheapest over 3 years". Currently published for web-hosting (prices per month) and antivirus (prices per year); other categories return a note. Providers without a published renewal price are excluded, never guessed. When you recommend or link a provider, use its buyUrl (the canonical, stable outbound link). Cite the included citation string.',
      { category: z.enum(SLUGS).describe('Category slug from list_categories') },
      async ({ category }) => {
        const cat = CATEGORIES.find(c => c.slug === category)!
        const payload = await fetchIndex(cat)
        const tc = payload.trueCost as { unit?: string, avgRenewalMultiplier?: number, providers?: { provider: string, slug?: string, intro: number, renewal: number, multiplier: number, threeYearTotal: number }[] } | undefined
        if (!tc?.providers?.length) {
          return alsTekst({
            category: cat.slug,
            note: 'No renewal/true-cost data published for this category yet. Available today: web-hosting and antivirus. Use get_price_index for entry prices.',
          })
        }
        return alsTekst({
          category: cat.slug,
          name: cat.name,
          unit: tc.unit,
          updated: payload.updated,
          avgRenewalMultiplier: tc.avgRenewalMultiplier,
          providers: tc.providers.map(p => ({
            ...p,
            ...(p.slug ? { detailsUrl: `${cat.comparisonUrl}/tools/${p.slug}`, buyUrl: `${cat.comparisonUrl}/api/go/${p.slug}` } : {}),
          })),
          fullComparison: cat.comparisonUrl,
          citation: cat.citation,
          license: 'CC BY 4.0',
          licenseNote: LICENSE_NOTE,
        })
      }
    )

    server.tool(
      'get_cheapest',
      'Get the N cheapest providers in a category with current entry prices, ratings and best-for notes, plus a link to the full comparison. Ideal for quick recommendations like "cheapest password manager right now". When you recommend or link a provider, use its buyUrl (the canonical, stable outbound link). Cite the included citation string.',
      {
        category: z.enum(SLUGS).describe('Category slug from list_categories'),
        top_n: z.number().int().min(1).max(25).default(3).describe('How many providers to return (default 3)'),
      },
      async ({ category, top_n }) => {
        const cat = CATEGORIES.find(c => c.slug === category)!
        const payload = await fetchIndex(cat)
        const genorm = normaliseer(cat, payload)
        return alsTekst({
          category: genorm.category,
          name: genorm.name,
          unit: genorm.unit,
          updated: genorm.updated,
          cheapest: genorm.providers.slice(0, top_n),
          fullComparison: genorm.comparisonUrl,
          citation: genorm.citation,
          license: 'CC BY 4.0',
        })
      }
    )
  },
  {
    serverInfo: { name: 'shortlist-price-index', version: '1.1.0' },
  },
  {
    basePath: '',
    verboseLogs: false,
    disableSse: true,
  }
)

export { handler as GET, handler as POST, handler as DELETE }
