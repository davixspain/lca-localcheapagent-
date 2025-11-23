import React from 'react';
import { ProcessNode } from '../types';

const TYPE_COLORS: Record<ProcessNode['type'], string> = {
  launcher: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40',
  browser: 'bg-blue-500/20 text-blue-200 border-blue-500/40',
  sandbox: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
  network: 'bg-violet-500/20 text-violet-200 border-violet-500/40',
};

type ProcessVisualizerProps = {
  data: ProcessNode;
};

function ProcessNodeItem({ node }: { node: ProcessNode }) {
  return (
    <li className="ml-4">
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${TYPE_COLORS[node.type]}`}
      >
        <span className="font-semibold">{node.name}</span>
        <span className="font-mono text-xs">PID {node.pid}</span>
        <span className="uppercase text-[10px] tracking-wide">{node.type}</span>
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="mt-2 space-y-2">
          {node.children.map((child) => (
            <ProcessNodeItem key={`${child.name}-${child.pid}`} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export const ProcessVisualizer: React.FC<ProcessVisualizerProps> = ({ data }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase text-slate-400 tracking-wide">Process Model</p>
          <h3 className="text-xl font-semibold text-white">Namespace Tree</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">PID ROOT</span>
      </div>
      <ul className="space-y-2">
        <ProcessNodeItem node={data} />
      </ul>
    </div>
  );
};
