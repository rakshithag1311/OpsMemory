import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function LearnedPatternCard({ pattern }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card-hover p-4 rounded-2xl bg-[#17191C] border border-[#272A2F] space-y-3 animate-fade-in-up">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#84E071] shrink-0 animate-pulse" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8E95A0]">Learned Signature</div>
            <h4 className="text-xs font-semibold text-[#EDEDED] font-mono">{pattern.pattern}</h4>
          </div>
        </div>
        <span className="chip-hover text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#84E071]/12 text-[#84E071] border border-[#84E071]/30">
          {pattern.success_rate}% success
        </span>
      </div>

      <div className="p-3 rounded-xl bg-[#111214] border border-[#272A2F] space-y-1.5 text-xs hover:border-[#84E071]/20 transition-colors duration-200">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#8E95A0] uppercase">Identified Cause:</span>
          <ArrowRight className="w-3 h-3 text-[#84E071] shrink-0" />
          <span className="text-[#EDEDED] font-mono font-semibold text-[11px] truncate">{pattern.cause}</span>
        </div>
        {pattern.description && (
          <p className="text-[#8E95A0] text-xs leading-relaxed pt-0.5">{pattern.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="card-hover p-2 rounded-lg bg-[#111214] border border-[#272A2F] cursor-default">
          <span className="text-[10px] text-[#5A606B] uppercase block">Incidents</span>
          <span className="text-[#EDEDED] font-semibold">{pattern.incidents} logged</span>
        </div>
        <div className="card-hover p-2 rounded-lg bg-[#111214] border border-[#272A2F] cursor-default">
          <span className="text-[10px] text-[#5A606B] uppercase block">Last Seen</span>
          <span className="text-[#EDEDED] font-semibold">{pattern.last_seen}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap pt-1">
        <span className="text-[10px] font-mono text-[#5A606B] uppercase">Services:</span>
        {pattern.related_services.map((service) => (
          <span key={service} className="chip-hover text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#111214] border border-[#272A2F] text-[#8E95A0]">
            {service}
          </span>
        ))}
      </div>

      {expanded && pattern.preventive_rule && (
        <div className="p-3 rounded-xl bg-[#111214] border border-[#84E071]/30 text-xs font-mono space-y-1 animate-fade-in-up">
          <span className="text-[10px] text-[#84E071] font-semibold uppercase block">Hindsight Preventive Rule</span>
          <p className="text-[#EDEDED] text-[11px] leading-relaxed">{pattern.preventive_rule}</p>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full pt-2 border-t border-[#272A2F] flex items-center justify-between text-[11px] text-[#84E071] hover:text-[#73D460] transition-colors duration-150 cursor-pointer group"
      >
        <span className="group-hover:underline">{expanded ? 'Hide preventive rule' : 'Inspect learned mitigation'}</span>
        {expanded
          ? <ChevronUp  className="w-3.5 h-3.5 transition-transform duration-200" />
          : <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />}
      </button>
    </div>
  );
}
