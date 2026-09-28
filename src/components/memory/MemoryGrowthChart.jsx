import React from 'react';
import { Info } from 'lucide-react';

export default function MemoryGrowthChart({ data, isLive = false }) {
  const chartData = data || [
    { date: 'Day 1', count: 12 },
    { date: 'Day 2', count: 18 },
    { date: 'Day 3', count: 27 },
    { date: 'Day 4', count: 39 },
    { date: 'Day 5', count: 51 },
    { date: 'Day 6', count: 67 },
    { date: 'Day 7', count: 84 },
  ];

  const maxCount = Math.max(...chartData.map((d) => d.count));
  const width = 500;
  const height = 180;
  const padX = 10;
  const padY = 10;

  const points = chartData.map((d, i) => {
    const x = padX + (i / (chartData.length - 1)) * (width - padX * 2);
    const y = padY + (1 - d.count / (maxCount + 10)) * (height - padY * 2);
    return { x, y, ...d };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPath = `M${points[0].x},${height} ` +
    points.map((p) => `L${p.x},${p.y}`).join(' ') +
    ` L${points[points.length - 1].x},${height} Z`;

  return (
    <div className="bg-[#17191C] border border-[#272A2F] rounded-2xl p-5 flex flex-col">
      <div className="flex items-start justify-between pb-3 border-b border-[#272A2F]/80 mb-3">
        <div>
          <h3 className="text-xs font-semibold text-[#EDEDED] uppercase tracking-wider font-mono">
            Memory Growth
          </h3>
          <p className="text-xs text-[#8E95A0] mt-0.5">
            Hindsight memory entries accumulated across production incidents
          </p>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#84E071]/12 text-[#84E071] border border-[#84E071]/30">
          {isLive ? 'Live Bank' : 'Hindsight Active'}
        </span>
      </div>

      <div className="w-full mt-2 overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="w-full h-40"
        >
          <defs>
            <linearGradient id="memGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#84E071" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#84E071" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0.25, 0.5, 0.75].map((t, i) => (
            <line
              key={i}
              x1={padX}
              y1={padY + t * (height - padY * 2)}
              x2={width - padX}
              y2={padY + t * (height - padY * 2)}
              stroke="#272A2F"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area fill */}
          <path d={areaPath} fill="url(#memGreen)" />

          {/* Line */}
          <polyline
            points={polyline}
            fill="none"
            stroke="#84E071"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Data points */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#84E071" stroke="#111214" strokeWidth="2" />
          ))}
        </svg>

        {/* X axis labels */}
        <div className="flex justify-between mt-1 px-1">
          {chartData.map((d, i) => (
            <span key={i} className="text-[10px] font-mono text-[#5A606B]">{d.date}</span>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-[#272A2F]/60 flex items-center justify-between text-[11px] text-[#8E95A0] font-mono">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#5A606B]" />
          <span>Hindsight memory entries</span>
        </div>
        <span className="text-[#EDEDED] font-semibold">Total: {maxCount} entries</span>
      </div>
    </div>
  );
}
