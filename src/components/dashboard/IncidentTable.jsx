import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Brain } from 'lucide-react';
import SeverityBadge from '../incidents/SeverityBadge';
import StatusBadge from '../incidents/StatusBadge';
import EmptyState from '../ui/EmptyState';

export default function IncidentTable({ incidents = [], limit }) {
  const navigate = useNavigate();
  const displayIncidents = limit ? incidents.slice(0, limit) : incidents;

  if (!displayIncidents || displayIncidents.length === 0) {
    return <EmptyState title="No incidents logged" description="No operational incidents currently recorded in this view." />;
  }

  const getSeverityDot = (sev) => {
    switch ((sev || '').toLowerCase()) {
      case 'critical': return 'bg-rose-500 shadow-sm shadow-rose-500/50';
      case 'high':     return 'bg-amber-400';
      case 'medium':   return 'bg-yellow-400';
      default:         return 'bg-[#8E95A0]';
    }
  };

  return (
    <div className="space-y-2">
      {displayIncidents.map((incident, i) => (
        <div
          key={incident.id}
          onClick={() => navigate(`/app/incidents/${incident.id}`)}
          className="row-hover animate-fade-in-up group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:px-4 sm:py-3.5 rounded-2xl bg-[#17191C] border border-[#272A2F] cursor-pointer"
          style={{ animationDelay: `${i * 0.06}s` }}
        >
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <span className={`w-2 h-2 rounded-full shrink-0 ${getSeverityDot(incident.severity)}`} title={`Severity: ${incident.severity}`} />
            <span className="font-mono text-xs font-bold text-[#EDEDED] group-hover:text-[#84E071] transition-colors duration-150 shrink-0">
              {incident.id}
            </span>
            <span className="text-xs text-[#EDEDED] font-medium truncate font-sans">{incident.title}</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap sm:flex-nowrap">
            <span className="chip-hover text-[11px] px-2.5 py-0.5 rounded-full bg-[#111214] border border-[#272A2F] text-[#8E95A0] font-mono">
              {incident.service}
            </span>
            <SeverityBadge severity={incident.severity} size="sm" />
            <StatusBadge status={incident.status} size="sm" />
            <div className="chip-hover inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#84E071]/10 border border-[#84E071]/25 text-[#84E071] text-[11px] font-mono">
              <Brain className="w-3 h-3 shrink-0" />
              <span>{incident.memory_matches} {incident.memory_matches === 1 ? 'match' : 'matches'}</span>
            </div>
            <span className="text-[11px] text-[#8E95A0] font-mono hidden md:inline-block">{incident.created_at}</span>
            <ChevronRight className="w-4 h-4 text-[#5A606B] group-hover:text-[#84E071] transition-all duration-150 group-hover:translate-x-1 shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
}
