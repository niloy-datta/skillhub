import { useState, useEffect } from "react";
import { SAMPLE_MISSIONS } from "../../data/missions";

interface ExecutionDashboardProps {
  onNavigate: (view: any) => void;
}

export function ExecutionDashboard({ onNavigate }: ExecutionDashboardProps) {
  const mission = SAMPLE_MISSIONS[0];
  const [deadlineConfidence, setDeadlineConfidence] = useState(93);
  const [showHealing, setShowHealing] = useState(false);

  // Simulate self-healing demo
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHealing(true);
      setTimeout(() => {
        setDeadlineConfidence(91);
        setShowHealing(false);
      }, 3000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-charcoal to-midnight text-white">
      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-20 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-2">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-emerald" />
            <span className="font-mono text-sm text-emerald">
              Mission In Progress
            </span>
          </div>
          <h1 className="mb-2 font-display text-4xl font-black md:text-5xl">
            {mission.title}
          </h1>
          <p className="text-lg text-white/70">{mission.outcome}</p>
        </div>

        {/* Main Progress Card */}
        <div className="mb-8 rounded-3xl border-2 border-emerald/30 bg-gradient-to-br from-emerald/5 to-indigo/5 p-8 backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="mb-2 font-mono text-sm text-white/50">
                Overall Progress
              </p>
              <p className="font-display text-6xl font-black">
                {mission.progress}%
              </p>
            </div>
            <div className="text-right">
              <p className="mb-2 font-mono text-sm text-white/50">
                Deadline Confidence
              </p>
              <p className="font-display text-6xl font-black text-emerald">
                {deadlineConfidence}%
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-4 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo via-violet to-emerald transition-all duration-1000"
                style={{ width: `${mission.progress}%` }}
              />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="mb-1 font-mono text-xs text-white/50">Budget Used</p>
              <p className="font-display text-2xl font-bold">
                ${mission.budget.spent.toLocaleString()}
              </p>
              <p className="font-mono text-xs text-white/50">
                of ${mission.budget.total.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="mb-1 font-mono text-xs text-white/50">
                Time Remaining
              </p>
              <p className="font-display text-2xl font-bold">8 days</p>
              <p className="font-mono text-xs text-emerald">On track</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="mb-1 font-mono text-xs text-white/50">
                Tasks Completed
              </p>
              <p className="font-display text-2xl font-bold">
                {mission.workGraph.nodes.filter((n) => n.status === "completed").length}
                /{mission.workGraph.nodes.length}
              </p>
              <p className="font-mono text-xs text-white/50">
                {mission.workGraph.nodes.filter((n) => n.status === "in-progress").length} in progress
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="mb-1 font-mono text-xs text-white/50">
                Success Probability
              </p>
              <p className="font-display text-2xl font-bold text-emerald">
                {mission.successProbability}%
              </p>
              <p className="font-mono text-xs text-emerald">High</p>
            </div>
          </div>
        </div>

        {/* Self-Healing Alert */}
        {showHealing && (
          <div className="mb-8 rounded-3xl border-2 border-amber/50 bg-amber/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="font-display text-xl font-bold text-amber">
                  Self-Healing Activated
                </h3>
                <p className="text-sm text-white/70">
                  System detected issue and is automatically resolving
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="mb-2 font-semibold text-amber">
                  Issue Detected: Developer inactive for 14h
                </p>
                <p className="text-sm text-white/70">
                  Deadline confidence dropped from 93% to 61%
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="mb-2 font-semibold text-indigo">
                  Auto-Resolution in Progress...
                </p>
                <div className="space-y-2 text-sm text-white/70">
                  <p>✓ Finding replacement worker</p>
                  <p>✓ Checking verified skills</p>
                  <p>✓ Checking availability</p>
                  <p>✓ Calculating cost impact</p>
                  <p>✓ Transferring context</p>
                  <p>✓ Reassigning unfinished tasks</p>
                  <p>✓ Notifying team</p>
                </div>
              </div>

              <div className="rounded-xl bg-emerald/10 p-4">
                <p className="mb-2 font-semibold text-emerald">
                  Resolution Complete
                </p>
                <p className="text-sm text-white/70">
                  New worker assigned. Deadline confidence restored to 91%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Live Task Status */}
        <div className="mb-8 rounded-3xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-6 font-display text-2xl font-bold">
            Live Task Status
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {mission.workGraph.nodes.map((node) => (
              <div
                key={node.id}
                className={`rounded-2xl border-2 p-5 transition-all ${
                  node.status === "completed"
                    ? "border-emerald/30 bg-emerald/5"
                    : node.status === "in-progress"
                      ? "border-indigo/30 bg-indigo/5"
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
                      <span
                        className={`rounded-full px-2 py-0.5 font-mono text-xs ${
                          node.status === "completed"
                            ? "bg-emerald/20 text-emerald"
                            : node.status === "in-progress"
                              ? "bg-indigo/20 text-indigo"
                              : "bg-white/10 text-white/50"
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>
                  </div>
                  <p className="font-display text-2xl font-bold">
                    {node.progress}%
                  </p>
                </div>

                {/* Progress Bar */}
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

                {/* Assigned Worker */}
                {node.assignedWorker && (
                  <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2">
                    <span className="text-lg">👨‍💻</span>
                    <div>
                      <p className="text-sm font-semibold">Ahmed Hassan</p>
                      <p className="font-mono text-xs text-white/50">
                        Full-stack Developer
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Crew Status */}
        <div className="mb-8 rounded-3xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-6 font-display text-2xl font-bold">
            Active Crew
          </h2>

          {mission.crew && (
            <div>
              {/* Human Workers */}
              <div className="mb-6">
                <h3 className="mb-3 font-semibold">Human Workers</h3>
                <div className="grid gap-3 md:grid-cols-3">
                  {mission.crew.workers.map((worker) => (
                    <div
                      key={worker.workerId}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="text-3xl">{worker.avatar}</span>
                        <div>
                          <p className="font-semibold">{worker.name}</p>
                          <p className="font-mono text-xs text-white/50">
                            {worker.role}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-white/50">Confidence</span>
                            <span className="font-semibold">
                              {(worker.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-emerald"
                              style={{
                                width: `${worker.confidence * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-white/50">
                              Past Quality
                            </span>
                            <span className="font-semibold">
                              {worker.pastOutcomeQuality}%
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-indigo"
                              style={{
                                width: `${worker.pastOutcomeQuality}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Agents */}
              <div>
                <h3 className="mb-3 font-semibold">AI Agents</h3>
                <div className="grid gap-3 md:grid-cols-3">
                  {mission.crew.agents.map((agent) => (
                    <div
                      key={agent.agentId}
                      className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-4"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="text-3xl">🤖</span>
                        <div>
                          <p className="font-semibold">{agent.name}</p>
                          <p className="font-mono text-xs text-white/50">
                            {agent.type}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-white/50">Confidence</span>
                            <span className="font-semibold">
                              {(agent.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-purple-500"
                              style={{
                                width: `${agent.confidence * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <p className="font-mono text-xs text-white/50">
                          Cost: ${agent.estimatedCost}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => onNavigate("mission-compiler")}
            className="flex-1 rounded-full border-2 border-white/20 bg-white/5 py-4 font-semibold transition-all hover:bg-white/10"
          >
            ← Back to Mission
          </button>
          <button
            onClick={() => onNavigate("outcome-graph")}
            className="flex-1 rounded-full bg-gradient-to-r from-indigo to-violet py-4 font-semibold text-white shadow-lg transition-all hover:scale-105"
          >
            View Outcome Graph →
          </button>
        </div>
      </div>
    </div>
  );
}
