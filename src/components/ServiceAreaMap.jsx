import { useState } from 'react'
import JV from '../data/jv'

export default function ServiceAreaMap({ onCity }) {
  const [hover, setHover] = useState(null)
  const cities = JV.cities

  return (
    <div className="jv-map">
      <svg viewBox="0 0 100 100" className="jv-map-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="jv-rad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="var(--jv-accent)" stopOpacity="0.32"/>
            <stop offset="60%"  stopColor="var(--jv-accent)" stopOpacity="0.16"/>
            <stop offset="100%" stopColor="var(--jv-accent)" stopOpacity="0"/>
          </radialGradient>
          <pattern id="jv-grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.15" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#jv-grid)" />
        <path d="M 55 0 Q 60 20 58 35 Q 65 45 60 55 Q 70 70 65 90 Q 70 100 60 100 L 100 100 L 100 0 Z" fill="currentColor" opacity="0.06" />
        <path d="M 56 5 Q 60 22 59 36 Q 66 46 62 56 Q 71 72 67 92" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4" strokeDasharray="1,1.5" />
        <circle cx="50" cy="50" r="40" fill="url(#jv-rad)" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--jv-accent)" strokeWidth="0.5" strokeDasharray="0.8,1.2" opacity="0.7" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="var(--jv-accent)" strokeWidth="0.3" strokeDasharray="0.6,1" opacity="0.45" />
        <g transform="translate(50, 10)">
          <text textAnchor="middle" fontSize="2.4" fill="var(--jv-accent)" fontWeight="700" letterSpacing="0.3">40 MI RADIUS</text>
        </g>
        {cities.map((c, i) => (
          <g key={c.name} className="jv-map-city" data-active={hover === i}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            onClick={() => onCity?.(c)} style={{ cursor: 'pointer' }}>
            {c.hq ? (
              <>
                <circle cx={c.x} cy={c.y} r="2.6" fill="var(--jv-accent)" />
                <circle cx={c.x} cy={c.y} r="2.6" fill="none" stroke="var(--jv-accent)" strokeWidth="0.4">
                  <animate attributeName="r" values="2.6;5;2.6" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0;1" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <text x={c.x} y={c.y - 4} textAnchor="middle" fontSize="2.6" fontWeight="800" fill="currentColor">{c.name}</text>
                <text x={c.x} y={c.y + 5.5} textAnchor="middle" fontSize="1.6" fill="var(--jv-accent)" fontWeight="600" letterSpacing="0.2">HQ</text>
              </>
            ) : (
              <>
                <circle cx={c.x} cy={c.y} r={hover === i ? 1.4 : 0.9} fill="currentColor" opacity={hover === i ? 1 : 0.55} />
                <text x={c.x} y={c.y - 1.8} textAnchor="middle" fontSize={hover === i ? 2.2 : 1.8}
                  fill="currentColor" opacity={hover === i ? 1 : 0.7} fontWeight={hover === i ? 700 : 500}>
                  {c.name}
                </text>
                {hover === i && (
                  <text x={c.x} y={c.y + 3} textAnchor="middle" fontSize="1.5" fill="var(--jv-accent)" fontWeight="700">
                    {c.dist} mi
                  </text>
                )}
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
