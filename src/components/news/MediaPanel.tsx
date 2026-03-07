/**
 * MediaPanel — African business news video feeds.
 * Embeds a YouTube player for the selected channel.
 * Falls back to a "Watch on YouTube" link if the embed is blocked.
 */
import { useState } from 'react'
import { ExternalLink, Tv } from 'lucide-react'

interface Channel {
  id:          string
  name:        string
  shortName:   string
  region:      string
  flag:        string
  description: string
  youtubeHandle: string
  // YouTube channel ID (UCxxx) for live embed; null = link-only
  channelId:   string | null
  // Direct link to channel or live page
  liveUrl:     string
}

const CHANNELS: Channel[] = [
  {
    id:            'cnbc-africa',
    name:          'CNBC Africa',
    shortName:     'CNBC Africa',
    region:        'Pan-African',
    flag:          '🌍',
    description:   'African markets, business, and economic news — live from Johannesburg.',
    youtubeHandle: '@CNBCAfrica',
    channelId:     'UCy5OdcYp9L-gzFxGIBHsElQ',
    liveUrl:       'https://www.youtube.com/@CNBCAfrica/live',
  },
  {
    id:            'bloomberg-tv',
    name:          'Bloomberg Television',
    shortName:     'Bloomberg TV',
    region:        'Global / Africa',
    flag:          '🇺🇸',
    description:   'Global markets and finance. Bloomberg\'s Africa Equity Report airs weekdays.',
    youtubeHandle: '@BloombergTelevision',
    channelId:     'UCIALMKvObZNtJ6AmdCLP7Lg',
    liveUrl:       'https://www.youtube.com/@BloombergTelevision/live',
  },
  {
    id:            'arise-news',
    name:          'Arise News',
    shortName:     'Arise',
    region:        'West Africa',
    flag:          '🇳🇬',
    description:   'Pan-African international news channel based in Nigeria. Business and markets coverage.',
    youtubeHandle: '@ARISENews',
    channelId:     null,
    liveUrl:       'https://www.youtube.com/@ARISENews/live',
  },
  {
    id:            'channels-tv',
    name:          'Channels Television',
    shortName:     'Channels TV',
    region:        'Nigeria',
    flag:          '🇳🇬',
    description:   'Nigeria\'s leading 24-hour news channel. Covers NGX and the Nigerian economy.',
    youtubeHandle: '@channelstelevision',
    channelId:     null,
    liveUrl:       'https://www.youtube.com/@channelstelevision/live',
  },
  {
    id:            'ntv-kenya',
    name:          'NTV Kenya',
    shortName:     'NTV Kenya',
    region:        'East Africa',
    flag:          '🇰🇪',
    description:   'Kenyan news and business coverage. Market updates from the NSE.',
    youtubeHandle: '@NTVKenyaOfficial',
    channelId:     null,
    liveUrl:       'https://www.youtube.com/@NTVKenyaOfficial/live',
  },
  {
    id:            'dw-africa',
    name:          'DW Africa',
    shortName:     'DW Africa',
    region:        'Pan-African',
    flag:          '🇩🇪',
    description:   'Deutsche Welle\'s dedicated Africa channel. Business and economic reporting from across the continent.',
    youtubeHandle: '@dwafrica',
    channelId:     null,
    liveUrl:       'https://www.youtube.com/@dwafrica',
  },
]

export default function MediaPanel() {
  const [activeId, setActiveId] = useState(CHANNELS[0].id)
  const [embedFailed, setEmbedFailed] = useState(false)

  const active = CHANNELS.find(c => c.id === activeId) ?? CHANNELS[0]

  const embedUrl = active.channelId
    ? `https://www.youtube.com/embed/live_stream?channel=${active.channelId}&autoplay=0&rel=0&modestbranding=1`
    : null

  function handleChannelChange(id: string) {
    setActiveId(id)
    setEmbedFailed(false)
  }

  return (
    <div className="mp-wrap">
      {/* Channel tabs */}
      <div className="mp-tabs">
        {CHANNELS.map(c => (
          <button
            key={c.id}
            className={`mp-tab ${c.id === activeId ? 'mp-tab--active' : ''}`}
            onClick={() => handleChannelChange(c.id)}
            title={c.name}
          >
            <span className="mp-tab-flag">{c.flag}</span>
            <span className="mp-tab-name">{c.shortName}</span>
          </button>
        ))}
      </div>

      {/* Channel info bar */}
      <div className="mp-info-bar">
        <div className="mp-channel-meta">
          <span className="mp-channel-name">{active.name}</span>
          <span className="mp-channel-region">{active.region}</span>
        </div>
        <a
          href={active.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mp-external-btn"
          title="Open on YouTube"
        >
          <ExternalLink size={11} /> YouTube
        </a>
      </div>

      {/* Embed area */}
      {embedUrl && !embedFailed ? (
        <div className="mp-player-wrap">
          <iframe
            src={embedUrl}
            title={active.name}
            className="mp-iframe"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onError={() => setEmbedFailed(true)}
          />
        </div>
      ) : (
        <div className="mp-no-embed">
          <Tv size={32} style={{ opacity: 0.15, marginBottom: '0.75rem' }} />
          <p className="mp-no-embed-desc">{active.description}</p>
          <a
            href={active.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mp-watch-btn"
          >
            <ExternalLink size={12} /> Watch on YouTube →
          </a>
        </div>
      )}

      {/* Channel grid — all channels as quick-access cards */}
      <div className="mp-all-channels">
        <div className="mp-all-label">All Channels</div>
        <div className="mp-channel-grid">
          {CHANNELS.map(c => (
            <button
              key={c.id}
              className={`mp-channel-card ${c.id === activeId ? 'mp-channel-card--active' : ''}`}
              onClick={() => handleChannelChange(c.id)}
            >
              <span className="mp-cc-flag">{c.flag}</span>
              <div className="mp-cc-info">
                <span className="mp-cc-name">{c.shortName}</span>
                <span className="mp-cc-region">{c.region}</span>
              </div>
              <a
                href={c.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mp-cc-link"
                onClick={e => e.stopPropagation()}
                title="Open on YouTube"
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
          display: flex; overflow-x: auto; border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-tertiary);
        }
        .mp-tabs::-webkit-scrollbar { height: 2px; }
        .mp-tabs::-webkit-scrollbar-thumb { background: var(--color-border); }
        .mp-tab {
          display: flex; align-items: center; gap: 4px;
          padding: 6px 10px; font-size: 10px; font-weight: 600;
          color: var(--color-text-muted); background: none; border: none;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          border-bottom: 2px solid transparent; transition: all 0.15s;
        }
        .mp-tab:hover { color: var(--color-text-primary); }
        .mp-tab--active { color: var(--color-gold); border-bottom-color: var(--color-gold); }
        .mp-tab-flag { font-size: 12px; }
        .mp-tab-name { }

        /* Info bar */
        .mp-info-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.375rem 0.75rem; border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-secondary);
        }
        .mp-channel-meta { display: flex; align-items: baseline; gap: 0.5rem; }
        .mp-channel-name { font-size: 11px; font-weight: 700; color: var(--color-text-primary); }
        .mp-channel-region { font-size: 9px; color: var(--color-text-muted); }
        .mp-external-btn {
          display: flex; align-items: center; gap: 3px;
          font-size: 9px; font-weight: 600; color: var(--color-text-muted);
          text-decoration: none; padding: 2px 6px; border-radius: 3px;
          border: 1px solid var(--color-border); transition: all 0.1s;
        }
        .mp-external-btn:hover { color: var(--color-gold); border-color: var(--color-gold-dim); }

        /* Player */
        .mp-player-wrap {
          position: relative; width: 100%; aspect-ratio: 16/9;
          background: #000;
        }
        .mp-iframe {
          width: 100%; height: 100%; border: none; display: block;
        }

        /* No-embed fallback */
        .mp-no-embed {
          padding: 1.5rem 1rem; text-align: center;
          display: flex; flex-direction: column; align-items: center;
          background: var(--color-bg-primary); min-height: 120px;
          justify-content: center;
        }
        .mp-no-embed-desc { font-size: 11px; color: var(--color-text-muted); margin: 0 0 0.75rem; max-width: 300px; line-height: 1.5; }
        .mp-watch-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 6px 14px; border-radius: 3px; font-size: 11px; font-weight: 700;
          background: var(--color-gold-subtle); border: 1px solid var(--color-gold-dim);
          color: var(--color-gold); text-decoration: none; transition: all 0.1s;
        }
        .mp-watch-btn:hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        /* Channel grid */
        .mp-all-channels { padding: 0.625rem 0.75rem; border-top: 1px solid var(--color-border-subtle); }
        .mp-all-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.4rem;
        }
        .mp-channel-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 4px;
        }
        .mp-channel-card {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 7px; border-radius: 3px; cursor: pointer;
          border: 1px solid transparent; background: none; transition: all 0.1s;
          text-align: left;
        }
        .mp-channel-card:hover { background: var(--color-bg-hover); border-color: var(--color-border); }
        .mp-channel-card--active { background: var(--color-gold-subtle); border-color: var(--color-gold-dim); }
        .mp-cc-flag { font-size: 14px; flex-shrink: 0; }
        .mp-cc-info { display: flex; flex-direction: column; gap: 1px; flex: 1; min-width: 0; }
        .mp-cc-name { font-size: 10px; font-weight: 600; color: var(--color-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mp-channel-card--active .mp-cc-name { color: var(--color-gold); }
        .mp-cc-region { font-size: 8px; color: var(--color-text-muted); }
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
