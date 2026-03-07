/**
 * MediaPanel — African & international business news video feeds.
 * Tries to embed the channel's live stream (YouTube or website player).
 * Falls back to a "Watch" link if embedding is blocked.
 */
import { useState } from 'react'
import { ExternalLink, Tv, Radio } from 'lucide-react'

interface Channel {
  id:          string
  name:        string
  shortName:   string
  region:      string
  flag:        string
  description: string
  // Primary embed src — null means link-only
  embedSrc:    string | null
  // External watch link
  watchUrl:    string
  // Type of embed
  embedType:   'youtube-channel' | 'youtube-video' | 'website' | 'none'
}

const CHANNELS: Channel[] = [
  {
    id:          'al-jazeera',
    name:        'Al Jazeera English',
    shortName:   'Al Jazeera',
    region:      'Global / Africa',
    flag:        '🇶🇦',
    description: 'Al Jazeera\'s 24/7 English live stream — comprehensive Africa and Middle East coverage.',
    // AJE's well-known YouTube live stream
    embedSrc:    'https://www.youtube.com/embed/Z_3pcnlgZmo?autoplay=0&rel=0&modestbranding=1',
    watchUrl:    'https://www.aljazeera.com/live/',
    embedType:   'youtube-video',
  },
  {
    id:          'bbc-world-service',
    name:        'BBC World Service',
    shortName:   'BBC World',
    region:      'Global / Africa',
    flag:        '🇬🇧',
    description: 'BBC\'s global news service — strong Africa Bureau reporting, business and markets.',
    // BBC News YouTube live stream
    embedSrc:    'https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA&autoplay=0&rel=0&modestbranding=1',
    watchUrl:    'https://www.bbc.co.uk/sounds/play/live:bbc_world_service',
    embedType:   'youtube-channel',
  },
  {
    id:          'bloomberg-tv',
    name:        'Bloomberg Television',
    shortName:   'Bloomberg TV',
    region:      'Global / Africa',
    flag:        '🇺🇸',
    description: 'Global markets and finance. Bloomberg\'s Africa Equity Report airs weekdays.',
    embedSrc:    'https://www.youtube.com/embed/live_stream?channel=UCIALMKvObZNtJ6AmdCLP7Lg&autoplay=0&rel=0&modestbranding=1',
    watchUrl:    'https://www.bloomberg.com/live',
    embedType:   'youtube-channel',
  },
  {
    id:          'cnbc-africa',
    name:        'CNBC Africa',
    shortName:   'CNBC Africa',
    region:      'Pan-African',
    flag:        '🌍',
    description: 'Sub-Saharan African markets and business news — JSE, NGX, NSE coverage.',
    // CNBC Africa streams live on their website
    embedSrc:    null,
    watchUrl:    'https://www.cnbcafrica.com/live-tv/',
    embedType:   'none',
  },
  {
    id:          'dw-africa',
    name:        'DW Africa',
    shortName:   'DW Africa',
    region:      'Pan-African',
    flag:        '🇩🇪',
    description: 'Deutsche Welle\'s dedicated Africa channel. Business and economic reporting.',
    embedSrc:    'https://www.youtube.com/embed/live_stream?channel=UCNye-wNBqNL5ZzHSJj3l8Bg&autoplay=0&rel=0&modestbranding=1',
    watchUrl:    'https://www.dw.com/en/africa/s-11756',
    embedType:   'youtube-channel',
  },
  {
    id:          'channels-tv',
    name:        'Channels Television',
    shortName:   'Channels TV',
    region:      'Nigeria',
    flag:        '🇳🇬',
    description: 'Nigeria\'s leading 24-hour news channel. NGX and Nigerian economy coverage.',
    embedSrc:    null,
    watchUrl:    'https://www.channelstv.com/live-tv/',
    embedType:   'none',
  },
  {
    id:          'arise-news',
    name:        'Arise News',
    shortName:   'Arise',
    region:      'West Africa',
    flag:        '🇳🇬',
    description: 'Pan-African international TV, Nigeria-based. Business and markets programming.',
    embedSrc:    null,
    watchUrl:    'https://www.arise.tv/live',
    embedType:   'none',
  },
  {
    id:          'ntv-kenya',
    name:        'NTV Kenya',
    shortName:   'NTV Kenya',
    region:      'East Africa',
    flag:        '🇰🇪',
    description: 'Kenyan broadcast news. Market updates from the Nairobi Securities Exchange.',
    embedSrc:    null,
    watchUrl:    'https://www.ntv.co.ke/live/',
    embedType:   'none',
  },
]

export default function MediaPanel() {
  const [activeId,    setActiveId]    = useState(CHANNELS[0].id)
  const [embedFailed, setEmbedFailed] = useState(false)

  const active = CHANNELS.find(c => c.id === activeId) ?? CHANNELS[0]

  function handleChannelChange(id: string) {
    setActiveId(id)
    setEmbedFailed(false)
  }

  const canEmbed = !!active.embedSrc && !embedFailed

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
            {c.embedSrc && <span className="mp-live-dot" title="Live embed available" />}
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
          <ExternalLink size={11} /> Watch live
        </a>
      </div>

      {/* Player */}
      {canEmbed ? (
        <div className="mp-player-wrap">
          <iframe
            key={active.id}
            src={active.embedSrc!}
            title={active.name}
            className="mp-iframe"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onError={() => setEmbedFailed(true)}
          />
        </div>
      ) : (
        <div className="mp-no-embed">
          {active.embedType === 'none'
            ? <Radio size={28} style={{ opacity: 0.15, marginBottom: '0.625rem' }} />
            : <Tv size={28} style={{ opacity: 0.15, marginBottom: '0.625rem' }} />}
          <p className="mp-no-embed-desc">{active.description}</p>
          {active.embedType === 'none' && (
            <p className="mp-no-embed-note">
              {active.name} streams live on their website — embedding is not permitted.
            </p>
          )}
          <a
            href={active.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mp-watch-btn"
          >
            <ExternalLink size={12} /> Watch {active.shortName} live →
          </a>
        </div>
      )}

      {/* All channels quick grid */}
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
              {c.embedSrc
                ? <span className="mp-cc-embed-badge" title="Embeddable">●</span>
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
          display: flex; overflow-x: auto; border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-tertiary);
          scrollbar-width: thin;
        }
        .mp-tab {
          display: flex; align-items: center; gap: 3px;
          padding: 6px 9px; font-size: 10px; font-weight: 600;
          color: var(--color-text-muted); background: none; border: none;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          border-bottom: 2px solid transparent; transition: all 0.15s;
          position: relative;
        }
        .mp-tab:hover { color: var(--color-text-primary); }
        .mp-tab--active { color: var(--color-gold); border-bottom-color: var(--color-gold); }
        .mp-tab-flag { font-size: 11px; }
        .mp-live-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--color-up); flex-shrink: 0;
          box-shadow: 0 0 4px var(--color-up);
        }

        /* Info bar */
        .mp-info-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.375rem 0.75rem; border-bottom: 1px solid var(--color-border-subtle);
        }
        .mp-channel-meta { display: flex; align-items: baseline; gap: 0.5rem; }
        .mp-channel-name { font-size: 11px; font-weight: 700; color: var(--color-text-primary); }
        .mp-channel-region { font-size: 9px; color: var(--color-text-muted); }
        .mp-external-btn {
          display: flex; align-items: center; gap: 3px;
          font-size: 9px; font-weight: 600; color: var(--color-text-muted);
          text-decoration: none; padding: 2px 7px; border-radius: 3px;
          border: 1px solid var(--color-border); transition: all 0.1s;
          white-space: nowrap;
        }
        .mp-external-btn:hover { color: var(--color-gold); border-color: var(--color-gold-dim); }

        /* Embed player */
        .mp-player-wrap {
          position: relative; width: 100%; aspect-ratio: 16/9;
          background: #000;
        }
        .mp-iframe { width: 100%; height: 100%; border: none; display: block; }

        /* Link-only fallback */
        .mp-no-embed {
          padding: 1.25rem 1rem; text-align: center;
          display: flex; flex-direction: column; align-items: center;
          background: var(--color-bg-primary); min-height: 100px; justify-content: center;
          gap: 0.5rem;
        }
        .mp-no-embed-desc { font-size: 11px; color: var(--color-text-muted); margin: 0; max-width: 320px; line-height: 1.5; }
        .mp-no-embed-note { font-size: 9px; color: var(--color-text-muted); margin: 0; font-style: italic; opacity: 0.7; }
        .mp-watch-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 6px 14px; border-radius: 3px; font-size: 11px; font-weight: 700;
          background: var(--color-gold-subtle); border: 1px solid var(--color-gold-dim);
          color: var(--color-gold); text-decoration: none; transition: all 0.1s;
          margin-top: 0.25rem;
        }
        .mp-watch-btn:hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        /* All-channels grid */
        .mp-all-channels { padding: 0.5rem 0.75rem; border-top: 1px solid var(--color-border-subtle); }
        .mp-all-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.375rem;
        }
        .mp-channel-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
        .mp-channel-card {
          display: flex; align-items: center; gap: 5px;
          padding: 4px 6px; border-radius: 3px; cursor: pointer;
          border: 1px solid transparent; background: none; transition: all 0.1s;
          text-align: left;
        }
        .mp-channel-card:hover { background: var(--color-bg-hover); border-color: var(--color-border); }
        .mp-channel-card--active { background: var(--color-gold-subtle); border-color: var(--color-gold-dim); }
        .mp-cc-flag { font-size: 13px; flex-shrink: 0; }
        .mp-cc-info { display: flex; flex-direction: column; gap: 1px; flex: 1; min-width: 0; }
        .mp-cc-name { font-size: 10px; font-weight: 600; color: var(--color-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mp-channel-card--active .mp-cc-name { color: var(--color-gold); }
        .mp-cc-region { font-size: 8px; color: var(--color-text-muted); }
        .mp-cc-embed-badge { font-size: 7px; color: var(--color-up); flex-shrink: 0; }
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
