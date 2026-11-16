import { ImageResponse } from 'next/og'
import { getPortfolioSeoCopy, resolveSeoLocale } from '@/lib/seo'

export const runtime = 'edge'

export async function GET(request: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(request.url)
  const locale = resolveSeoLocale(searchParams.get('locale') ?? 'en')
  const copy = getPortfolioSeoCopy(locale)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background: 'linear-gradient(135deg, #090c18 0%, #11162b 55%, #1a1f3d 100%)',
          color: '#f8fafc',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          position: 'relative',
        }}
      >
        {/* Top macOS window chrome row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, background: '#FF5F57' }} />
            <div style={{ width: 14, height: 14, borderRadius: 999, background: '#FEBC2E' }} />
            <div style={{ width: 14, height: 14, borderRadius: 999, background: '#28C840' }} />
            <span
              style={{
                marginLeft: 12,
                fontSize: 18,
                color: '#94a3b8',
                letterSpacing: '0.02em',
              }}
            >
              portfolio.os — {locale.toUpperCase()}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: 999,
              background: 'rgba(120, 119, 198, 0.18)',
              border: '1px solid rgba(165, 180, 252, 0.35)',
              fontSize: 18,
              color: '#c7d2fe',
            }}
          >
            {copy.jobTitle}
          </div>
        </div>

        {/* Main hero content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: '#ffffff',
            }}
          >
            ANAS EN-NAQADI
          </div>

          <div
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: '#cbd5e1',
              lineHeight: 1.35,
              maxWidth: '920px',
            }}
          >
            {copy.ogTagline}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
            {copy.ogBadges.map((badge) => (
              <div
                key={badge}
                style={{
                  display: 'flex',
                  padding: '10px 20px',
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#e2e8f0',
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Footer metadata */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '22px',
            fontSize: 20,
            color: '#94a3b8',
          }}
        >
          <span>{copy.ogLocation}</span>
          <span style={{ color: '#a5b4fc', fontWeight: 600 }}>Next.js · FastAPI · PyTorch · React</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      },
    }
  )
}
