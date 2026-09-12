import { useState } from "react";
import { SAMPLE_MISSIONS, SAMPLE_CREWS } from "../../data/missions";
import type { Mission, Crew } from "../../types/mission";
import { WorkGraphVisualizer } from "../mission/WorkGraphVisualizer";
import { BudgetBreakdown } from "../mission/BudgetBreakdown";
import { MilestoneTimeline } from "../mission/MilestoneTimeline";
import { Deliverables } from "../mission/Deliverables";

interface MissionCompilerPageProps {
  onNavigate: (view: any) => void;
}

export function MissionCompilerPage({ onNavigate }: MissionCompilerPageProps) {
  const [selectedCrew, setSelectedCrew] = useState<Crew>(SAMPLE_CREWS[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'workgraph' | 'budget' | 'milestones' | 'deliverables' | 'crew'>('overview');
  const mission = SAMPLE_MISSIONS[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-charcoal to-midnight text-white">
      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-20 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo/30 bg-indigo/10 px-4 py-2">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-indigo" />
            <span className="font-mono text-sm text-indigo">Mission Compiler</span>
          </div>
          <h1 className="mb-4 font-display text-5xl font-black md:text-6xl">
            Mission Compiled
          </h1>
          <p className="mb-6 text-xl text-white/70">
            AI has analyzed your outcome and created an optimized execution plan
          </p>

          {/* Tabs Navigation */}
          <div className="flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-2">
            {[
              { id: 'overview' as const, label: 'Overview', icon: '📊' },
              { id: 'workgraph' as const, label: 'Work Graph', icon: '🔗' },
              { id: 'budget' as const, label: 'Budget', icon: '💰' },
              { id: 'milestones' as const, label: 'Milestones', icon: '🎯' },
              { id: 'deliverables' as const, label: 'Deliverables', icon: '📦' },
              { id: 'crew' as const, label: 'Crew', icon: '👥' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo to-violet text-white shadow-lg'
                    : 'text-white/60 hover:bg-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Mission Overview */}
            <div className="mb-8 rounded-3xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="mb-2 font-display text-3xl font-bold">
                    {mission.title}
                  </h2>
                  <p className="text-lg text-white/70">{mission.outcome}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-white/50">Budget</p>
                  <p className="font-display text-3xl font-bold">
                    ${mission.budget.total.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="mb-1 font-mono text-xs text-white/50">Deadline</p>
                  <p className="font-semibold">{mission.constraints.deadline}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="mb-1 font-mono text-xs text-white/50">Quality Target</p>
                  <p className="font-semibold">{mission.constraints.quality}%</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="mb-1 font-mono text-xs text-white/50">Work Graph</p>
                  <p className="font-semibold">
                    {mission.workGraph.nodes.length} tasks
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="mb-1 font-mono text-xs text-white/50">
                    Total Hours
                  </p>
                  <p className="font-semibold">
                    {mission.workGraph.totalEstimatedHours}h
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border-2 border-emerald/30 bg-emerald/5 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-3xl">✅</span>
                  <h3 className="font-display text-xl font-bold text-emerald">Success Probability</h3>
                </div>
                <p className="font-display text-5xl font-black text-emerald">{mission.successProbability}%</p>
                <p className="mt-2 text-sm text-white/60">Based on crew quality & timeline</p>
              </div>
              <div className="rounded-3xl border-2 border-indigo/30 bg-indigo/5 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-3xl">⏱️</span>
                  <h3 className="font-display text-xl font-bold text-indigo">Deadline Confidence</h3>
                </div>
                <p className="font-display text-5xl font-black text-indigo">{mission.deadlineConfidence}%</p>
                <p className="mt-2 text-sm text-white/60">High confidence in on-time delivery</p>
              </div>
              <div className="rounded-3xl border-2 border-amber/30 bg-amber/5 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-3xl">⚠️</span>
                  <h3 className="font-display text-xl font-bold text-amber">Risk Level</h3>
                </div>
                <p className="font-display text-5xl font-black text-amber capitalize">{mission.risk.overallRisk}</p>
                <p className="mt-2 text-sm text-white/60">{mission.risk.factors.length} risk factors identified</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => onNavigate('execution-dashboard')}
                className="flex-1 rounded-full bg-gradient-to-r from-indigo to-violet py-4 font-semibold text-white shadow-lg transition-all hover:scale-105"
              >
                Start Mission →
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
              >
                Save as Draft
              </button>
            </div>
          </>
        )}

        {/* Work Graph Tab */}
        {activeTab === 'workgraph' && (
          <WorkGraphVisualizer mission={mission} />
        )}

        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <BudgetBreakdown mission={mission} />
        )}

        {/* Milestones Tab */}
        {activeTab === 'milestones' && (
          <MilestoneTimeline mission={mission} />
        )}

        {/* Deliverables Tab */}
        {activeTab === 'deliverables' && (
          <Deliverables mission={mission} />
        )}

        {/* Crew Tab */}
        {activeTab === 'crew' && (
          <div className="mb-8 rounded-3xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">
                Optimized Crew Options
              </h2>
              <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald">
                {SAMPLE_CREWS.length} options available
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {SAMPLE_CREWS.map((crew, i) => (
                <div
                  key={crew.id}
                  onClick={() => setSelectedCrew(crew)}
                  className={`cursor-pointer rounded-2xl border-2 p-6 transition-all ${
                    selectedCrew.id === crew.id
                      ? "border-indigo bg-indigo/5"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="mb-1 font-display text-xl font-bold">
                        {crew.name}
                      </h3>
                      <p className="text-sm text-white/60">
                        {crew.workers.length} humans + {crew.agents.length} AI agents
                      </p>
                    </div>
                    {i === 0 && (
                      <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald">
                        Recommended
                      </span>
                    )}
                  </div>

                  {/* Crew Members */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {crew.workers.map((worker) => (
                      <div
                        key={worker.workerId}
                        className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5"
                      >
                        <span className="text-lg">{worker.avatar}</span>
                        <div>
                          <p className="text-sm font-semibold">{worker.name}</p>
                          <p className="font-mono text-xs text-white/50">{worker.role}</p>
                        </div>
                      </div>
                    ))}
                    {crew.agents.map((agent) => (
                      <div
                        key={agent.agentId}
                        className="flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-1.5"
                      >
                        <span className="text-lg">🤖</span>
                        <div>
                          <p className="text-sm font-semibold">{agent.name}</p>
                          <p className="font-mono text-xs text-white/50">{agent.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="font-mono text-xs text-white/50">Cost</p>
                      <p className="font-display text-xl font-bold">
                        ${crew.totalCost.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="font-mono text-xs text-white/50">Delivery</p>
                      <p className="font-display text-xl font-bold">
                        {new Date(crew.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="font-mono text-xs text-white/50">Success Rate</p>
                      <p className="font-display text-xl font-bold text-emerald">
                        {crew.successProbability}%
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3">
                      <p className="font-mono text-xs text-white/50">Risk</p>
                      <p className={`font-display text-xl font-bold ${
                        crew.risk === "low" ? "text-emerald" : crew.risk === "medium" ? "text-amber" : "text-rose"
                      }`}>
                        {crew.risk}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
