import { useState } from 'react';
import type { Mission, WorkGraphNode } from '../../types/mission';
import { SAMPLE_MISSIONS } from '../../data/missions';

interface WorkGraphVisualizerProps {
  mission: Mission;
}

export function WorkGraphVisualizer({ mission }: WorkGraphVisualizerProps) {
  const [selectedNode, setSelectedNode] = useState<WorkGraphNode | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline' | 'gantt'>('grid');

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-emerald bg-emerald/10';
      case 'in-progress': return 'border-indigo bg-indigo/10';
      case 'blocked': return 'border-rose bg-rose/10';
      default: return 'border-white/20 bg-white/5';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'human': return '👤';
      case 'ai': return '🤖';
      case 'hybrid': return '👥';
      default: return '⚙️';
    }
  };

  return (
    <div className="rounded-3xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Work Graph</h2>
          <p className="mt-1 text-sm text-white/60">
            {mission.workGraph.nodes.length} tasks · {mission.workGraph.edges.length} dependencies
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              viewMode === 'grid' ? 'bg-indigo text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              viewMode === 'timeline' ? 'bg-indigo text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setViewMode('gantt')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              viewMode === 'gantt' ? 'bg-indigo text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Gantt
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid gap-4 md:grid-cols-3">
          {mission.workGraph.nodes.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`cursor-pointer rounded-2xl border-2 p-5 transition-all hover:scale-105 ${getNodeColor(node.status)}`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getNodeIcon(node.type)}</span>
                  <div>
                    <p className="font-semibold text-white">{node.name}</p>
                    <p className="text-xs text-white/60">{node.estimatedHours}h estimated</p>
                  </div>
                </div>
                <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-bold text-white">
                  {node.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all ${
                      node.status === 'completed' ? 'bg-emerald' :
                      node.status === 'in-progress' ? 'bg-indigo' :
                      node.status === 'blocked' ? 'bg-rose' : 'bg-white/20'
                    }`}
                    style={{ width: `${node.progress}%` }}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="mb-3 flex flex-wrap gap-1">
                {node.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Difficulty */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/50">Difficulty:</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full ${
                        i < node.difficulty ? 'bg-amber' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="space-y-4">
          {mission.workGraph.nodes.map((node, index) => (
            <div key={node.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${getNodeColor(node.status)}`}>
                  <span className="text-lg">{getNodeIcon(node.type)}</span>
                </div>
                {index < mission.workGraph.nodes.length - 1 && (
                  <div className="h-16 w-0.5 bg-white/20" />
                )}
              </div>
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-white">{node.name}</h3>
                  <span className="text-sm text-white/60">{node.progress}%</span>
                </div>
                <p className="mb-2 text-sm text-white/60">
                  {node.estimatedHours}h · {node.type} · Difficulty: {node.difficulty}/10
                </p>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${
                      node.status === 'completed' ? 'bg-emerald' :
                      node.status === 'in-progress' ? 'bg-indigo' : 'bg-white/20'
                    }`}
                    style={{ width: `${node.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gantt Chart View */}
      {viewMode === 'gantt' && (
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="mb-4 grid grid-cols-12 gap-2">
              <div className="col-span-3 text-sm font-semibold text-white">Task</div>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="text-center text-xs text-white/60">
                  Day {i + 1}
                </div>
              ))}
            </div>
            {/* Bars */}
            {mission.workGraph.nodes.map((node, index) => (
              <div key={node.id} className="mb-2 grid grid-cols-12 gap-2">
                <div className="col-span-3 flex items-center gap-2">
                  <span>{getNodeIcon(node.type)}</span>
                  <span className="text-sm text-white">{node.name}</span>
                </div>
                <div className="col-span-9 relative">
                  <div
                    className={`absolute top-1 h-8 rounded-lg ${
                      node.status === 'completed' ? 'bg-emerald/50' :
                      node.status === 'in-progress' ? 'bg-indigo/50' : 'bg-white/20'
                    }`}
                    style={{
                      left: `${(index * 10)}%`,
                      width: `${Math.max(10, node.estimatedHours / 10)}%`,
                    }}
                  >
                    <div className="flex h-full items-center justify-center text-xs font-bold text-white">
                      {node.progress}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Node Detail Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-2xl rounded-3xl border-2 border-white/10 bg-midnight p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold text-white">{selectedNode.name}</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-white/60">Type</p>
                  <p className="text-lg font-semibold text-white capitalize">{selectedNode.type}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-white/60">Estimated Hours</p>
                  <p className="text-lg font-semibold text-white">{selectedNode.estimatedHours}h</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-white/60">Difficulty</p>
                  <p className="text-lg font-semibold text-white">{selectedNode.difficulty}/10</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-white/60">Progress</p>
                  <p className="text-lg font-semibold text-white">{selectedNode.progress}%</p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-white">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-indigo/20 px-3 py-1 text-sm text-indigo">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-white">Dependencies</p>
                <div className="space-y-2">
                  {selectedNode.dependencies.map((depId) => {
                    const depNode = mission.workGraph.nodes.find((n) => n.id === depId);
                    return depNode ? (
                      <div key={depId} className="flex items-center gap-2 rounded-xl bg-white/5 p-3">
                        <span>{getNodeIcon(depNode.type)}</span>
                        <span className="text-sm text-white">{depNode.name}</span>
                        <span className="ml-auto text-xs text-white/60">{depNode.progress}%</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="w-full rounded-full bg-gradient-to-r from-indigo to-violet py-3 font-semibold text-white transition-all hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
