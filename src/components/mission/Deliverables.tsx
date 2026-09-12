import type { Mission } from '../../types/mission';

interface DeliverablesProps {
  mission: Mission;
}

export function Deliverables({ mission }: DeliverablesProps) {
  const deliverables = mission.deliverables;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-emerald/20 text-emerald border-emerald/30';
      case 'submitted': return 'bg-indigo/20 text-indigo border-indigo/30';
      case 'in-progress': return 'bg-amber/20 text-amber border-amber/30';
      case 'rejected': return 'bg-rose/20 text-rose border-rose/30';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return '✓';
      case 'submitted': return '📤';
      case 'in-progress': return '⚡';
      case 'rejected': return '✕';
      default: return '○';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'code': return '💻';
      case 'design': return '🎨';
      case 'document': return '📄';
      case 'data': return '📊';
      case 'service': return '⚙️';
      default: return '📦';
    }
  };

  return (
    <div className="rounded-3xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Deliverables</h2>
          <p className="mt-1 text-sm text-white/60">
            {deliverables.filter(d => d.status === 'verified').length} of {deliverables.length} verified
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
            {((deliverables.filter(d => d.status === 'verified').length / deliverables.length) * 100).toFixed(0)}% Complete
          </span>
        </div>
      </div>

      {/* Deliverables Grid */}
      <div className="space-y-4">
        {deliverables.map((deliverable) => (
          <div
            key={deliverable.id}
            className={`rounded-2xl border-2 p-5 transition-all hover:scale-[1.02] ${getStatusColor(deliverable.status)}`}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{getTypeIcon(deliverable.type)}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{deliverable.name}</h3>
                  <p className="mt-1 text-sm text-white/70">{deliverable.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getStatusIcon(deliverable.status)}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold capitalize">
                  {deliverable.status}
                </span>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold text-white">Requirements</p>
              <div className="flex flex-wrap gap-2">
                {deliverable.requirements.map((req, i) => (
                  <span key={i} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    {req}
                  </span>
                ))}
              </div>
            </div>

            {/* Acceptance Criteria */}
            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold text-white">Acceptance Criteria</p>
              <ul className="space-y-1">
                {deliverable.acceptanceCriteria.map((criteria, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-emerald">✓</span>
                    <span>{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-4">
                {deliverable.assignedTo && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👤</span>
                    <span className="text-sm text-white/70">Assigned</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  <span className="text-sm text-white/70">
                    Due: {new Date(deliverable.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              <button className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/20">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-emerald/10 p-4 text-center">
          <p className="text-sm text-white/60">Verified</p>
          <p className="mt-2 font-display text-2xl font-bold text-emerald">
            {deliverables.filter(d => d.status === 'verified').length}
          </p>
        </div>
        <div className="rounded-2xl bg-indigo/10 p-4 text-center">
          <p className="text-sm text-white/60">Submitted</p>
          <p className="mt-2 font-display text-2xl font-bold text-indigo">
            {deliverables.filter(d => d.status === 'submitted').length}
          </p>
        </div>
        <div className="rounded-2xl bg-amber/10 p-4 text-center">
          <p className="text-sm text-white/60">In Progress</p>
          <p className="mt-2 font-display text-2xl font-bold text-amber">
            {deliverables.filter(d => d.status === 'in-progress').length}
          </p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4 text-center">
          <p className="text-sm text-white/60">Pending</p>
          <p className="mt-2 font-display text-2xl font-bold text-white">
            {deliverables.filter(d => d.status === 'pending').length}
          </p>
        </div>
      </div>
    </div>
  );
}
