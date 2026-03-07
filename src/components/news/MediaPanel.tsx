/**
 * MediaPanel — Live business news TV for African markets.
 *
 * Embed strategy (in priority order):
 *  1. Official iframe embeds  — Al Jazeera (Brightcove), France 24 (embed.france24.com)
 *  2. HLS via hls.js          — DW Africa, TRT World (public Akamai/CDN streams)
 *  3. Link-only               — CNBC Africa, Channels TV, Arise, NTV Kenya
 *
 * Sources:
 *  - AJE: players.brightcove.net (Al Jazeera's official Brightcove account)
 *  - F24: embed.france24.com/en/live (officially supported embed endpoint)
 *  - DW:  dwamdstream107.akamaized.net (public Akamai HLS)
 *  - TRT: tv-trtworld.live.trt.com.tr (Turkish public broadcaster, open CORS)
 */
import { useState, useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { ExternalLink, Tv } from 'lucide-react'

type EmbedType = 'iframe' | 'hls' | 'none'

interface Channel {
  id:          string
  name:        string
  shortName:   string
  region:      string
  flag:        string
  description: string
  embedType:   EmbedType
  embedSrc:    string | null   // iframe src OR hls m3u8 URL
  watchUrl:    string
}

const CHANNELS: Channel[] = [
  {
    id:          'al-jazeera',
    name:        'Al Jazeera English',
    shortName:   'Al Jazeera',
    region:      'Global / Africa',
    flag:        '🇶🇦',
    description: 'Al Jazeera\'s 24/7 English live stream — comprehensive Africa and Middle East coverage.',
    embedType:   'iframe',
    // Official Brightcove player — Al Jazeera's own CDN, not YouTube
    embedSrc:    'https://players.brightcove.net/665003303001/AvByVmBYDu_default/index.html?videoId=6368602483112',
    watchUrl:    'https://www.aljazeera.com/live/',
  },
  {
    id:          'france-24',
    name:        'France 24 English',
    shortName:   'France 24',
    region:      'Global / Africa',
    flag:        '🇫🇷',
    description: 'France 24\'s official live embed — strong Africa Bureau and Francophone Africa coverage.',
    embedType:   'iframe',
    // Official embed endpoint that France 24 actively maintains for third-party embedding
    embedSrc:    'https://embed.france24.com/en/live',
    watchUrl:    'https://www.france24.com/en/live-news/',
  },
  {
    id:          'dw-africa',
    name:        'DW Africa',
    shortName:   'DW Africa',
    region:      'Pan-African',
    flag:        '🇩🇪',
    description: 'Deutsche Welle\'s dedicated Africa channel. Business and economic reporting in English.',
    embedType:   'hls',
    // Public Akamai HLS stream for DW English (includes Africa programming)
    embedSrc:    'https://dwamdstream107.akamaized.net/hls/live/2017968/dwstream107/stream05/streamPlaylist.m3u8',
    watchUrl:    'https://www.dw.com/en/media-center/live-tv/s-100825',
  },
  {
    id:          'trt-world',
    name:        'TRT World',
    shortName:   'TRT World',
    region:      'Global / Africa',
    flag:        '🇹🇷',
    description: 'Turkish public broadcaster. 24/7 international news with solid Africa coverage.',
    embedType:   'hls',
    // TRT World public CDN stream — open CORS
    embedSrc:    'https://tv-trtworld.live.trt.com.tr/master.m3u8',
    watchUrl:    'https://www.trtworld.com/watch',
  },
  {
    id:          'cnbc-africa',
    name:        'CNBC Africa',
    shortName:   'CNBC Africa',
    region:      'Pan-African',
    flag:        '🌍',
    description: 'Sub-Saharan African markets and business news — JSE, NGX, NSE coverage.',
    embedType:   'none',
    embedSrc:    null,
    watchUrl:    'https://www.cnbcafrica.com/live-tv/',
  },
  {
    id:          'channels-tv',
    name:        'Channels Television',
    shortName:   'Channels TV',
    region:      'Nigeria',
    flag:        '🇳🇬',
    description: 'Nigeria\'s leading 24-hour news channel. NGX and Nigerian economy coverage.',
    embedType:   'none',
    embedSrc:    null,
    watchUrl:    'https://www.channelstv.com/live-tv/',
  },
  {
    id:          'arise-news',
    name:        'Arise News',
    shortName:   'Arise',
    region:      'West Africa',
    flag:        '🇳🇬',
    description: 'Pan-African international TV, Nigeria-based. Business and markets programming.',
    embedType:   'none',
    embedSrc:    null,
    watchUrl:    'https://www.arise.tv/live',
  },
  {
    id:          'ntv-kenya',
    name:        'NTV Kenya',
    shortName:   'NTV Kenya',
    region:      'East Africa',
    flag:        '🇰🇪',
    description: 'Kenyan broadcast news. Market updates from the Nairobi Securities Exchange.',
    embedType:   'none',
    embedSrc:    null,
    watchUrl:    'https://www.ntv.co.ke/live/',
  },
]

// ── HLS video player ─────────────────────────────────────────────────────────

function HlsPlayer({ src, onError }: { src: string; onError: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Safari / iOS — native HLS support
    if (!Hls.isSupported()) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
      } else {
        onError()
      }
      return
    }

    const hls = new Hls({
      maxBufferLength: 15,
      maxMaxBufferLength: 30,
      enableWorker: true,
    })

    hls.on(Hls.Events.ERROR, (_event, data) => {
      if (data.fatal) onError()
    })

    hls.loadSource(src)
    hls.attachMedia(video)

    return () => hls.destroy()
  }, [src, onError])

  return (
    <video
      ref={videoRef}
      className="mp-video"
      controls
      autoPlay={false}
      muted
      playsInline
    />
  )
}

// ── Main panel ───────────────────────────────────────────────────────────────

export default function MediaPanel() {
  const [activeId,    setActiveId]    = useState(CHANNELS[0].id)
  const [embedFailed, setEmbedFailed] = useState<Record<string, boolean>>({})

  const active = CHANNELS.find(c => c.id === activeId) ?? CHANNELS[0]
  const failed = embedFailed[active.id]
  const canEmbed = active.embedSrc && !failed

  function selectChannel(id: string) {
    setActiveId(id)
  }

  function handleEmbedError() {
    setEmbedFailed(prev => ({ ...prev, [active.id]: true }))
  }

  return (
    <div className="mp-wrap">

      {/* Tab strip */}
      <div className="mp-tabs">
        {CHANNELS.map(c => (
          <button
            key={c.id}
            className={`mp-tab ${c.id === activeId ? 'mp-tab--active' : ''}`}
            onClick={() => selectChannel(c.id)}
            title={c.name}
          >
            <span className="mp-tab-flag">{c.flag}</span>
            <span className="mp-tab-name">{c.shortName}</span>
            {c.embedType !== 'none' && !embedFailed[c.id] && (
              <span className="mp-live-dot" title="Live stream available" />
            )}
          </button>
        ))}
      </div>

      {/* Info bar */}
      <div className="mp-info-bar">
        <div className="mp-channel-meta">
          <span className="mp-channel-name">{active.name}</span>
          <span className="mp-channel-region">{active.region}</span>
        </div>
        <a
          href={active.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mp-external-btn"
        >
          <ExternalLink size={10} /> Open in new tab
        </a>
      </div>

      {/* Player */}
      {canEmbed ? (
        <div className="mp-player-wrap">
          {active.embedType === 'hls' ? (
            <HlsPlayer
              key={active.id}
              src={active.embedSrc!}
              onError={handleEmbedError}
            />
          ) : (
            <iframe
              key={active.id}
              src={active.embedSrc!}
              title={active.name}
              className="mp-iframe"
              allowFullScreen
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              onError={handleEmbedError}
            />
          )}
        </div>
      ) : (
        <div className="mp-no-embed">
          <Tv size={26} style={{ opacity: 0.12, marginBottom: '0.5rem' }} />
          <p className="mp-no-embed-desc">{active.description}</p>
          {active.embedType === 'none' ? (
            <p className="mp-no-embed-note">
              {active.shortName} streams live on their website — direct embedding is not permitted.
            </p>
          ) : (
            <p className="mp-no-embed-note">
              Stream failed to load — may be a CORS restriction or temporary outage.
            </p>
          )}
          <a
            href={active.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mp-watch-btn"
          >
            <ExternalLink size={11} /> Watch {active.shortName} live →
          </a>
        </div>
      )}

      {/* Quick-access channel grid */}
      <div className="mp-all-channels">
        <div className="mp-all-label">All Channels</div>
        <div className="mp-channel-grid">
          {CHANNELS.map(c => (
            <button
              key={c.id}
              className={`mp-channel-card ${c.id === activeId ? 'mp-channel-card--active' : ''}`}
              onClick={() => selectChannel(c.id)}
            >
              <span className="mp-cc-flag">{c.flag}</span>
              <div className="mp-cc-info">
                <span className="mp-cc-name">{c.shortName}</span>
                <span className="mp-cc-region">{c.region}</span>
              </div>
              {c.embedType !== 'none' && !embedFailed[c.id]
                ? <span className="mp-cc-live" title="Live embed">●</span>
                : null}
              <a
                href={c.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mp-cc-link"
                onClick={e => e.stopPropagation()}
                title="Open live stream"
              >
                <ExternalLink size={9} />
              </a>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .mp-wrap {
          display: flex; flex-direction: column;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 4px; overflow: hidden;
        }

        /* Tabs */
        .mp-tabs {
          display: flex; overflow-x: auto;
          border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-tertiary);
          scrollbar-width: thin;
        }
        .mp-tab {
          display: flex; align-items: center; gap: 3px;
          padding: 6px 9px; font-size: 10px; font-weight: 600;
          color: var(--color-text-muted); background: none; border: none;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          border-bottom: 2px solid transparent; transition: all 0.15s;
        }
        .mp-tab:hover { color: var(--color-text-primary); }
        .mp-tab--active { color: var(--color-gold); border-bottom-color: var(--color-gold); }
        .mp-tab-flag { font-size: 11px; }
        .mp-tab-name { font-size: 9px; }
        .mp-live-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--color-up); flex-shrink: 0;
          box-shadow: 0 0 4px var(--color-up);
        }

        /* Info bar */
        .mp-info-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.3rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .mp-channel-meta { display: flex; align-items: baseline; gap: 0.5rem; }
        .mp-channel-name { font-size: 11px; font-weight: 700; color: var(--color-text-primary); }
        .mp-channel-region { font-size: 9px; color: var(--color-text-muted); }
        .mp-external-btn {
          display: flex; align-items: center; gap: 3px;
          font-size: 9px; font-weight: 600; color: var(--color-text-muted);
          text-decoration: none; padding: 2px 7px; border-radius: 3px;
          border: 1px solid var(--color-border); transition: all 0.1s; white-space: nowrap;
        }
        .mp-external-btn:hover { color: var(--color-gold); border-color: var(--color-gold-dim); }

        /* Player */
        .mp-player-wrap {
          position: relative; width: 100%; aspect-ratio: 16/9;
          background: #000; overflow: hidden;
        }
        .mp-iframe { width: 100%; height: 100%; border: none; display: block; }
        .mp-video  { width: 100%; height: 100%; display: block; background: #000; }

        /* Fallback */
        .mp-no-embed {
          padding: 1.5rem 1rem; text-align: center;
          display: flex; flex-direction: column; align-items: center;
          background: var(--color-bg-primary); min-height: 120px; justify-content: center;
          gap: 0.4rem;
        }
        .mp-no-embed-desc { font-size: 11px; color: var(--color-text-muted); margin: 0; max-width: 300px; line-height: 1.5; }
        .mp-no-embed-note { font-size: 9px; color: var(--color-text-muted); margin: 0; font-style: italic; opacity: 0.7; }
        .mp-watch-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 6px 14px; border-radius: 3px; font-size: 11px; font-weight: 700;
          background: var(--color-gold-subtle); border: 1px solid var(--color-gold-dim);
          color: var(--color-gold); text-decoration: none; transition: all 0.1s;
          margin-top: 0.25rem;
        }
        .mp-watch-btn:hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        /* Channel grid */
        .mp-all-channels { padding: 0.5rem 0.75rem; border-top: 1px solid var(--color-border-subtle); }
        .mp-all-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.375rem;
        }
        .mp-channel-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
        .mp-channel-card {
          display: flex; align-items: center; gap: 5px;
          padding: 4px 6px; border-radius: 3px; cursor: pointer;
          border: 1px solid transparent; background: none; transition: all 0.1s; text-align: left;
        }
        .mp-channel-card:hover { background: var(--color-bg-hover); border-color: var(--color-border); }
        .mp-channel-card--active { background: var(--color-gold-subtle); border-color: var(--color-gold-dim); }
        .mp-cc-flag { font-size: 13px; flex-shrink: 0; }
        .mp-cc-info { display: flex; flex-direction: column; gap: 1px; flex: 1; min-width: 0; }
        .mp-cc-name {
          font-size: 10px; font-weight: 600; color: var(--color-text-secondary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .mp-channel-card--active .mp-cc-name { color: var(--color-gold); }
        .mp-cc-region { font-size: 8px; color: var(--color-text-muted); }
        .mp-cc-live { font-size: 7px; color: var(--color-up); flex-shrink: 0; }
        .mp-cc-link {
          color: var(--color-text-muted); flex-shrink: 0; padding: 2px;
          border-radius: 2px; transition: color 0.1s; display: flex; align-items: center;
          text-decoration: none;
        }
        .mp-cc-link:hover { color: var(--color-gold); }
      `}</style>
    </div>
  )
}
