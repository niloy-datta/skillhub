import type { Mission } from '../../types/mission';

interface BudgetBreakdownProps {
  mission: Mission;
}

export function BudgetBreakdown({ mission }: BudgetBreakdownProps) {
  const totalBudget = mission.constraints.budget;
  const allocated = mission.budget.allocated;
  const remaining = totalBudget - allocated;
  const spent = mission.budget.spent;

  // Calculate breakdown by category
  const breakdown = [
    { category: 'Human Workers', amount: allocated * 0.6, percentage: 60, color: 'bg-indigo' },
    { category: 'AI Agents', amount: allocated * 0.25, percentage: 25, color: 'bg-violet' },
    { category: 'Tools & Services', amount: allocated * 0.1, percentage: 10, color: 'bg-amber' },
    { category: 'Contingency', amount: allocated * 0.05, percentage: 5, color: 'bg-emerald' },
  ];

  return (
    <div className="rounded-3xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
      <h2 className="mb-6 font-display text-2xl font-bold text-white">Budget Breakdown</h2>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-gradient-to-br from-indigo/20 to-violet/20 p-5">
          <p className="text-sm text-white/60">Total Budget</p>
          <p className="mt-2 font-display text-3xl font-bold text-white">
            ${totalBudget.toLocaleString()}
          </p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-emerald/20 to-indigo/20 p-5">
          <p className="text-sm text-white/60">Allocated</p>
          <p className="mt-2 font-display text-3xl font-bold text-white">
            ${allocated.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-emerald">{((allocated / totalBudget) * 100).toFixed(1)}%</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-amber/20 to-rose/20 p-5">
          <p className="text-sm text-white/60">Spent</p>
          <p className="mt-2 font-display text-3xl font-bold text-white">
            ${spent.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-amber">{((spent / allocated) * 100).toFixed(1)}% of allocated</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-5">
          <p className="text-sm text-white/60">Remaining</p>
          <p className="mt-2 font-display text-3xl font-bold text-white">
            ${remaining.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-white/60">{((remaining / totalBudget) * 100).toFixed(1)}% left</p>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-white">Allocation by Category</h3>
        <div className="space-y-4">
          {breakdown.map((item) => (
            <div key={item.category}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="text-sm text-white">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">
                    ${item.amount.toLocaleString()}
                  </span>
                  <span className="text-xs text-white/60">{item.percentage}%</span>
                </div>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${item.color} transition-all`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Timeline */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">Spending Timeline</h3>
        <div className="rounded-2xl bg-midnight/50 p-6">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-white/60">Start</span>
            <span className="text-white/60">Current</span>
            <span className="text-white/60">End</span>
          </div>
          <div className="relative h-32">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-white/20" />
            
            {/* Spending curve */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 0 80 Q 25 70, 50 50 T 100 20"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Current position marker */}
            <div
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo shadow-lg shadow-indigo/50"
              style={{ left: `${(spent / allocated) * 100}%` }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-white/60">
              Budget Confidence: <span className="font-semibold text-emerald">{mission.risk.budgetConfidence}%</span>
            </span>
            <span className="text-white/60">
              Burn Rate: <span className="font-semibold text-amber">${(spent / 7).toFixed(0)}/day</span>
            </span>
          </div>
        </div>
      </div>

      {/* Cost Optimization Tips */}
      <div className="mt-6 rounded-2xl border border-emerald/30 bg-emerald/5 p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          <h4 className="font-semibold text-emerald">Cost Optimization Tips</h4>
        </div>
        <ul className="space-y-2 text-sm text-white/70">
          <li className="flex items-start gap-2">
            <span className="text-emerald">✓</span>
            <span>Consider using more AI agents for repetitive tasks to reduce costs by 15-20%</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald">✓</span>
            <span>Parallel task execution can reduce timeline by 3 days, saving $1,200</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald">✓</span>
            <span>Current burn rate is optimal - no immediate action needed</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
