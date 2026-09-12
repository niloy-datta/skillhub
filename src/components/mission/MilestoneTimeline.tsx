import type { Mission } from '../../types/mission';

interface MilestoneTimelineProps {
  mission: Mission;
}

export function MilestoneTimeline({ mission }: MilestoneTimelineProps) {
  const milestones = mission.milestones;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald border-emerald';
      case 'in-progress': return 'bg-indigo border-indigo';
      default: return 'bg-white/20 border-white/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'in-progress': return '⚡';
      default: return '○';
    }
  };

  return (
    <div className="rounded-3xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Milestone Timeline</h2>
          <p className="mt-1 text-sm text-white/60">
            {milestones.filter(m => m.status === 'completed').length} of {milestones.length} completed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
            On Track
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/20 md:left-8" />

        {/* Milestones */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 md:h-16 md:w-16 ${getStatusColor(milestone.status)}`}>
                <span className="text-xl font-bold text-white md:text-2xl">
                  {getStatusIcon(milestone.status)}
                </span>
              </div>

              {/* Milestone content */}
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{milestone.name}</h3>
                    <p className="mt-1 text-sm text-white/60">
                      Due: {new Date(milestone.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">${milestone.paymentAmount.toLocaleString()}</p>
                    <p className="text-xs text-white/60">Payment</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-white/60">Progress</span>
                    <span className="font-semibold text-white">{milestone.completionPercent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full transition-all ${
                        milestone.status === 'completed' ? 'bg-emerald' :
                        milestone.status === 'in-progress' ? 'bg-indigo' : 'bg-white/20'
                      }`}
                      style={{ width: `${milestone.completionPercent}%` }}
                    />
                  </div>
                </div>

                {/* Deliverables */}
                {milestone.deliverables.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-semibold text-white">Deliverables</p>
                    <div className="flex flex-wrap gap-2">
                      {milestone.deliverables.map((delivId) => {
                        const deliverable = mission.deliverables.find(d => d.id === delivId);
                        return deliverable ? (
                          <span
                            key={delivId}
                            className={`rounded-full px-3 py-1 text-xs ${
                              deliverable.status === 'verified' ? 'bg-emerald/20 text-emerald' :
                              deliverable.status === 'in-progress' ? 'bg-indigo/20 text-indigo' :
                              'bg-white/10 text-white/70'
                            }`}
                          >
                            {deliverable.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Status badge */}
                <div className="mt-4 flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    milestone.status === 'completed' ? 'bg-emerald/20 text-emerald' :
                    milestone.status === 'in-progress' ? 'bg-indigo/20 text-indigo' :
                    'bg-white/10 text-white/60'
                  }`}>
                    {milestone.status === 'completed' ? '✓ Completed' :
                     milestone.status === 'in-progress' ? '⚡ In Progress' : '○ Pending'}
                  </span>
                  {index === 0 && milestone.status === 'in-progress' && (
                    <span className="rounded-full bg-amber/20 px-3 py-1 text-xs font-semibold text-amber">
                      Current Milestone
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-emerald/10 p-5">
          <p className="text-sm text-white/60">Completed</p>
          <p className="mt-2 font-display text-3xl font-bold text-emerald">
            {milestones.filter(m => m.status === 'completed').length}
          </p>
          <p className="mt-1 text-xs text-white/60">
            ${milestones.filter(m => m.status === 'completed').reduce((sum, m) => sum + m.paymentAmount, 0).toLocaleString()} paid
          </p>
        </div>
        <div className="rounded-2xl bg-indigo/10 p-5">
          <p className="text-sm text-white/60">In Progress</p>
          <p className="mt-2 font-display text-3xl font-bold text-indigo">
            {milestones.filter(m => m.status === 'in-progress').length}
          </p>
          <p className="mt-1 text-xs text-white/60">
            ${milestones.filter(m => m.status === 'in-progress').reduce((sum, m) => sum + m.paymentAmount, 0).toLocaleString()} pending
          </p>
        </div>
        <div className="rounded-2xl bg-white/5 p-5">
          <p className="text-sm text-white/60">Upcoming</p>
          <p className="mt-2 font-display text-3xl font-bold text-white">
            {milestones.filter(m => m.status === 'pending').length}
          </p>
          <p className="mt-1 text-xs text-white/60">
            ${milestones.filter(m => m.status === 'pending').reduce((sum, m) => sum + m.paymentAmount, 0).toLocaleString()} remaining
          </p>
        </div>
      </div>
    </div>
  );
}
