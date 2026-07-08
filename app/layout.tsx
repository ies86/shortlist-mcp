import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Shortlist Price Index MCP server',
  description: 'MCP server for AI agents: monthly verified software entry prices across 11 categories (VPN, hosting, backup, antivirus, eSIM, ATS and more). Open data, CC BY 4.0.',
  metadataBase: new URL('https://shortlist-mcp.vercel.app'),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif', color: '#1a202c', background: '#fafaf9' }}>
        {children}
      </body>
    </html>
  )
}
