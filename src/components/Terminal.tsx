import React from 'react';
import { LogEntry } from '../types';

const levelColors: Record<LogEntry['level'], string> = {
  INFO: 'text-emerald-300',
  WARN: 'text-amber-300',
  ERROR: 'text-rose-300',
  DEBUG: 'text-sky-300',
};

type TerminalProps = {
  logs: LogEntry[];
};

export const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-inner p-4 max-h-80 overflow-y-auto scrollbar-hide font-mono text-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase text-slate-500 tracking-wide">Audit Log</p>
          <h3 className="text-lg font-semibold text-white">Sandbox Console</h3>
        </div>
        <span className="text-xs text-slate-500">tail -f secure.log</span>
      </div>
      <ul className="space-y-1">
        {logs.map((log) => (
          <li key={log.id} className="flex gap-3">
            <span className="text-slate-500">{log.timestamp}</span>
            <span className={`${levelColors[log.level]} font-semibold`}>{log.level.padEnd(5, ' ')}</span>
            <span className="text-slate-400">[{log.component}]</span>
            <span className="text-slate-200">{log.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
