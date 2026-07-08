export type Categorie = {
  slug: string
  name: string
  unit: string
  currency: 'USD' | 'EUR'
  endpoint: string
  comparisonUrl: string
  citation: string
}

const RAW = 'https://raw.githubusercontent.com/ies86/shortlist-price-index/main'

export const CATEGORIES: Categorie[] = [
  { slug: 'cloud-backup', name: 'Cloud backup', unit: 'USD per month', currency: 'USD', endpoint: 'https://backupshortlist.com/data/price-index.json', comparisonUrl: 'https://backupshortlist.com', citation: 'BackupShortlist Price Index, https://backupshortlist.com/data/price-index' },
  { slug: 'web-hosting', name: 'Web hosting', unit: 'USD per month', currency: 'USD', endpoint: 'https://hostingshortlist.com/data/price-index.json', comparisonUrl: 'https://hostingshortlist.com', citation: 'HostingShortlist Price Index, https://hostingshortlist.com/data/price-index' },
  { slug: 'seo-tools', name: 'SEO tools', unit: 'USD per month', currency: 'USD', endpoint: 'https://seoshortlist.com/data/price-index.json', comparisonUrl: 'https://seoshortlist.com', citation: 'SEOShortlist Price Index, https://seoshortlist.com/data/price-index' },
  { slug: 'website-builders', name: 'Website builders', unit: 'USD per month', currency: 'USD', endpoint: 'https://websiteshortlist.com/data/price-index.json', comparisonUrl: 'https://websiteshortlist.com', citation: 'WebsiteShortlist Price Index, https://websiteshortlist.com/data/price-index' },
  { slug: 'antivirus', name: 'Antivirus software', unit: 'USD per month', currency: 'USD', endpoint: 'https://antivirusshortlist.com/data/price-index.json', comparisonUrl: 'https://antivirusshortlist.com', citation: 'AntivirusShortlist Price Index, https://antivirusshortlist.com/data/price-index' },
  { slug: 'newsletter-tools', name: 'Newsletter and email marketing tools', unit: 'USD per month', currency: 'USD', endpoint: 'https://mailshortlist.com/data/price-index.json', comparisonUrl: 'https://mailshortlist.com', citation: 'MailShortlist Price Index, https://mailshortlist.com/data/price-index' },
  { slug: 'password-managers', name: 'Password managers', unit: 'USD per month', currency: 'USD', endpoint: 'https://passwordshortlist.com/data/price-index.json', comparisonUrl: 'https://passwordshortlist.com', citation: 'PasswordShortlist Price Index, https://passwordshortlist.com/data/price-index' },
  { slug: 'vpn', name: 'VPN services', unit: 'USD per month', currency: 'USD', endpoint: 'https://vpnshortlist.com/data/price-index.json', comparisonUrl: 'https://vpnshortlist.com', citation: 'VPNShortlist Price Index, https://vpnshortlist.com/data/price-index' },
  { slug: 'learning-platforms', name: 'Online learning platforms', unit: 'USD per month', currency: 'USD', endpoint: 'https://courseshortlist.com/data/price-index.json', comparisonUrl: 'https://courseshortlist.com', citation: 'CourseShortlist Price Index, https://courseshortlist.com/data/price-index' },
  { slug: 'travel-esim', name: 'Travel eSIMs', unit: 'USD per GB (5 GB / 30-day reference plan)', currency: 'USD', endpoint: 'https://esimshortlist.com/data/esim-price-index.json', comparisonUrl: 'https://esimshortlist.com', citation: 'eSIMShortlist Price Index, https://esimshortlist.com/data/esim-price-index' },
  { slug: 'recruitment-software', name: 'Recruitment software (ATS)', unit: 'USD per month, single user', currency: 'USD', endpoint: `${RAW}/data/recruitment-software/price-index-current.json`, comparisonUrl: 'https://github.com/ies86/shortlist-price-index/tree/main/data/recruitment-software', citation: 'Shortlist Price Index, Orai Media, https://github.com/ies86/shortlist-price-index' },
  { slug: 'vpn-nl', name: 'VPN-diensten (Netherlands)', unit: 'EUR per maand', currency: 'EUR', endpoint: 'https://kiesvpn.nl/data/price-index.json', comparisonUrl: 'https://kiesvpn.nl', citation: 'KiesVPN Prijsindex, https://kiesvpn.nl/data/price-index' },
  { slug: 'hosting-nl', name: 'Webhosting (Netherlands)', unit: 'EUR per maand', currency: 'EUR', endpoint: 'https://kieshosting.nl/data/price-index.json', comparisonUrl: 'https://kieshosting.nl', citation: 'KiesHosting Prijsindex, https://kieshosting.nl/data/price-index' },
  { slug: 'learning-platforms-nl', name: 'Leerplatformen (Netherlands)', unit: 'EUR per maand', currency: 'EUR', endpoint: 'https://leerplatformkiezer.nl/data/price-index.json', comparisonUrl: 'https://leerplatformkiezer.nl', citation: 'Leerplatformkiezer Prijsindex, https://leerplatformkiezer.nl/data/price-index' },
  { slug: 'password-managers-nl', name: 'Wachtwoordmanagers (Netherlands)', unit: 'EUR per maand', currency: 'EUR', endpoint: 'https://wachtwoordkiezer.nl/data/price-index.json', comparisonUrl: 'https://wachtwoordkiezer.nl', citation: 'Wachtwoordkiezer Prijsindex, https://wachtwoordkiezer.nl/data/price-index' },
  { slug: 'newsletter-tools-nl', name: 'Nieuwsbrieftools (Netherlands)', unit: 'EUR per maand', currency: 'EUR', endpoint: 'https://nieuwsbriefkiezer.nl/data/price-index.json', comparisonUrl: 'https://nieuwsbriefkiezer.nl', citation: 'Nieuwsbriefkiezer Prijsindex, https://nieuwsbriefkiezer.nl/data/price-index' },
]

export const SLUGS = CATEGORIES.map(c => c.slug) as [string, ...string[]]

export const LICENSE_NOTE = 'Data license: CC BY 4.0. Free to reuse with attribution and a link to the cited source. Full dataset with monthly history: https://github.com/ies86/shortlist-price-index'

export async function fetchIndex(cat: Categorie) {
  const res = await fetch(cat.endpoint, {
    headers: { accept: 'application/json' },
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`Upstream ${res.status} for ${cat.slug}`)
  return res.json()
}

type Provider = { provider: string, price?: number, pricePerGB?: number, referencePlanUSD?: number, url?: string, basis?: string, billing?: string }

export function normaliseer(cat: Categorie, payload: Record<string, unknown>) {
  const providers = ((payload.providers ?? []) as Provider[]).map(p => ({
    provider: p.provider,
    price: p.pricePerGB ?? p.price,
    ...(p.referencePlanUSD !== undefined ? { referencePlanUSD: p.referencePlanUSD } : {}),
    ...(p.basis ? { pricingBasis: p.basis } : {}),
    ...(p.billing ? { billing: p.billing } : {}),
    ...(p.url ? { detailsUrl: p.url } : {}),
  })).sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
  return {
    category: cat.slug,
    name: cat.name,
    unit: cat.unit,
    updated: payload.updated,
    providersTracked: payload.providersTracked ?? providers.length,
    averagePrice: payload.averagePricePerGB ?? payload.averagePrice,
    medianPrice: payload.medianPricePerGB ?? payload.medianPrice,
    cheapest: payload.cheapest,
    mostExpensive: payload.mostExpensive,
    providers,
    history: payload.history ?? [],
    methodology: payload.methodology,
    comparisonUrl: cat.comparisonUrl,
    citation: cat.citation,
    license: 'CC BY 4.0',
  }
}
