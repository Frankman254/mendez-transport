import { useMemo, useState } from 'react'
import BannerAssetPreview from './BannerAssetPreview'
import { bannerConfigs, defaultBannerSlug } from './bannerConfigs'
import BannerHomeButton from './BannerHomeButton'

export default function BannersTabbedPage() {
  const [activeSlug, setActiveSlug] = useState(defaultBannerSlug)

  const activeConfig = useMemo(
    () => bannerConfigs.find((config) => config.slug === activeSlug) ?? bannerConfigs[0],
    [activeSlug]
  )

  return (
    <div className="min-h-screen bg-[#08110d]">
      <BannerHomeButton className="sm:left-6 sm:top-5" />

      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#08110d]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 pt-14 sm:pt-16">
            <div>
              <h1 className="text-xl font-black uppercase tracking-[0.18em] text-white sm:text-2xl">
                Banner Tabs
              </h1>
              <p className="mt-1 text-sm text-white/65">
                Cada pestaña usa su mismo archivo y el mismo QR fusionable.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {bannerConfigs.map((config) => (
                <button
                  key={config.slug}
                  type="button"
                  onClick={() => setActiveSlug(config.slug)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    activeConfig.slug === config.slug
                      ? 'border-[#f3c863] bg-[#f3c863]/15 text-[#f7d98a]'
                      : 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10'
                  }`}
                >
                  {config.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 lg:px-8">
        <BannerAssetPreview
          config={activeConfig}
          embedded={true}
          showHeader={true}
        />
      </div>
    </div>
  )
}
