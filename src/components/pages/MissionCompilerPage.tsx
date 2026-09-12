import { useState } from "react";
import { SAMPLE_MISSIONS, SAMPLE_CREWS } from "../../data/missions";
import type { Mission, Crew } from "../../types/mission";

interface MissionCompilerPageProps {
  onNavigate: (view: any) => void;
}

export function MissionCompilerPage({ onNavigate }: MissionCompilerPageProps) {
  const [selectedCrew, setSelectedCrew] = useState<Crew>(SAMPLE_CREWS[0]);
  const mission = SAMPLE_MISSIONS[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-charcoal to-midnight text-white">
      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-20 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo/30 bg-indigo/10 px-4 py-2">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-indigo" />
            <span className="font-mono text-sm text-indigo">Mission Compiler</span>
          </div>
          <h1 className="mb-4 font-display text-5xl font-black md:text-6xl">
            Mission Compiled
          </h1>
          <p className="text-xl text-white/70">
            AI has analyzed your outcome and created an optimized execution plan
          </p>
        </div>

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

        {/* Work Graph Visualization */}
        <div className="mb-8 rounded-3xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold">Work Graph</h2>
            <div className="flex gap-2">
              <span className="rounded-full bg-indigo/10 px-3 py-1 font-mono text-xs text-indigo">
                Critical Path: {mission.workGraph.criticalPath.length} tasks
              </span>
              <span className="rounded-full bg-emerald/10 px-3 py-1 font-mono text-xs text-emerald">
                Parallelism: {mission.workGraph.parallelism}x
              </span>
            </div>
          </div>

          {/* Visual Graph */}
          <div className="relative mb-8 overflow-hidden rounded-2xl bg-midnight/50 p-8">
            <div className="grid gap-6 md:grid-cols-3">
              {mission.workGraph.nodes.map((node, i) => (
                <div
                  key={node.id}
                  className={`rounded-2xl border-2 p-4 transition-all ${
                    node.status === "completed"
                      ? "border-emerald/50 bg-emerald/5"
                      : node.status === "in-progress"
                        ? "border-indigo/50 bg-indigo/5"
                        : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <p className="mb-1 font-semibold">{node.name}</p>
                      <div className="flex gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-xs ${
                            node.type === "human"
                              ? "bg-blue-500/20 text-blue-400"
                              : node.type === "ai"
                                ? "bg-purple-500/20 text-purple-400"
                                : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {node.type}
                        </span>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-xs text-white/60">
                          {node.estimatedHours}h
                        </span>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 font-mono text-xs ${
                        node.status === "completed"
                          ? "bg-emerald/20 text-emerald"
                          : node.status === "in-progress"
                            ? "bg-indigo/20 text-indigo"
                            : "bg-white/10 text-white/50"
                      }`}
                    >
                      {node.progress}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full transition-all ${
                          node.status === "completed"
                            ? "bg-emerald"
                            : node.status === "in-progress"
                              ? "bg-indigo"
                              : "bg-white/20"
                        }`}
                        style={{ width: `${node.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {node.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-xs text-white/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Difficulty */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="font-mono text-xs text-white/50">
                      Difficulty:
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-1.5 rounded-full ${
                            i < node.difficulty
                              ? "bg-amber"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dependencies */}
          <div className="rounded-2xl bg-midnight/50 p-6">
            <h3 className="mb-4 font-semibold">Task Dependencies</h3>
            <div className="space-y-2">
              {mission.workGraph.edges.map((edge, i) => {
                const fromNode = mission.workGraph.nodes.find(
                  (n) => n.id === edge.from,
                );
                const toNode = mission.workGraph.nodes.find(
                  (n) => n.id === edge.to,
                );
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl bg-white/5 p-3"
                  >
                    <span className="font-semibold">{fromNode?.name}</span>
                    <span className="text-white/50">→</span>
                    <span className="font-semibold">{toNode?.name}</span>
                    <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 font-mono text-xs text-white/60">
                      {edge.type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Crew Options */}
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
                      {crew.workers.length} humans + {crew.agents.length} AI
                      agents
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
                        <p className="font-mono text-xs text-white/50">
                          {worker.role}
                        </p>
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
                        <p className="font-mono text-xs text-white/50">
                          {agent.type}
                        </p>
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
                    <p className="font-mono text-xs text-white/50">
                      Success Rate
                    </p>
                    <p className="font-display text-xl font-bold text-emerald">
                      {crew.successProbability}%
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="font-mono text-xs text-white/50">Risk</p>
                    <p
                      className={`font-display text-xl font-bold ${
                        crew.risk === "low"
                          ? "text-emerald"
                          : crew.risk === "medium"
                            ? "text-amber"
                            : "text-rose"
                      }`}
                    >
                      {crew.risk}
                    </p>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="font-mono text-xs text-white/50">
                      Collaboration
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-indigo"
                          style={{ width: `${crew.collaborationScore}%` }}
                        />
                      </div>
                      <span className="font-mono text-sm">
                        {crew.collaborationScore}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white/50">
                      Skill Coverage
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-emerald"
                          style={{ width: `${crew.skillCoverage}%` }}
                        />
                      </div>
                      <span className="font-mono text-sm">
                        {crew.skillCoverage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="mb-8 rounded-3xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-6 font-display text-2xl font-bold">
            Risk Assessment
          </h2>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="mb-2 font-mono text-xs text-white/50">
                Overall Risk
              </p>
              <p
                className={`font-display text-2xl font-bold ${
                  mission.risk.overallRisk === "low"
                    ? "text-emerald"
                    : mission.risk.overallRisk === "medium"
                      ? "text-amber"
                      : "text-rose"
                }`}
              >
                {mission.risk.overallRisk.toUpperCase()}
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="mb-2 font-mono text-xs text-white/50">
                Deadline Confidence
              </p>
              <p className="font-display text-2xl font-bold text-emerald">
                {mission.risk.deadlineConfidence}%
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="mb-2 font-mono text-xs text-white/50">
                Budget Confidence
              </p>
              <p className="font-display text-2xl font-bold text-emerald">
                {mission.risk.budgetConfidence}%
              </p>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold">Risk Factors</h3>
            <div className="space-y-3">
              {mission.risk.factors.map((factor, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white/5 p-4"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <p className="font-semibold">{factor.name}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-xs ${
                        factor.severity === "low"
                          ? "bg-emerald/20 text-emerald"
                          : factor.severity === "medium"
                            ? "bg-amber/20 text-amber"
                            : "bg-rose/20 text-rose"
                      }`}
                    >
                      {factor.severity}
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-white/70">{factor.impact}</p>
                  <p className="text-sm text-emerald">
                    <span className="font-semibold">Mitigation:</span>{" "}
                    {factor.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mitigation Strategies */}
          <div>
            <h3 className="mb-3 font-semibold">Mitigation Strategies</h3>
            <div className="space-y-2">
              {mission.risk.mitigation.map((strategy, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl bg-white/5 p-3"
                >
                  <span className="text-emerald">✓</span>
                  <span>{strategy}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => onNavigate("home")}
            className="flex-1 rounded-full border-2 border-white/20 bg-white/5 py-4 font-semibold transition-all hover:bg-white/10"
          >
            ← Back
          </button>
          <button
            onClick={() => onNavigate("mission-detail")}
            className="flex-1 rounded-full bg-gradient-to-r from-indigo to-violet py-4 font-semibold text-white shadow-lg transition-all hover:scale-105"
          >
            Accept & Start Mission →
          </button>
        </div>
      </div>
    </div>
  );
}
