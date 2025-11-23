import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type ResourcePoint = {
  time: string;
  cpu: number;
  memory: number;
};

type ResourceMonitorProps = {
  data: ResourcePoint[];
};

export const ResourceMonitor: React.FC<ResourceMonitorProps> = ({ data }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase text-slate-400 tracking-wide">Telemetry</p>
          <h3 className="text-xl font-semibold text-white">Resource Monitor</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">Last 20 samples</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="memGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} domain={[0, 'dataMax + 20']} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Area type="monotone" dataKey="cpu" stroke="#34d399" fillOpacity={1} fill="url(#cpuGradient)" name="CPU %" />
            <Area type="monotone" dataKey="memory" stroke="#60a5fa" fillOpacity={1} fill="url(#memGradient)" name="Memory MB" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
