import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { jsx, jsxs } from 'react/jsx-runtime';

export function ResourceMonitor({ data }) {
  return jsxs('div', {
    className: 'bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg h-full',
    children: [
      jsxs('div', {
        className: 'flex items-center justify-between mb-4',
        children: [
          jsxs('div', {
            children: [
              jsx('p', { className: 'text-xs uppercase text-slate-400 tracking-wide', children: 'Telemetry' }),
              jsx('h3', { className: 'text-xl font-semibold text-white', children: 'Resource Monitor' }),
            ],
          }),
          jsx('span', { className: 'text-xs text-slate-400 font-mono', children: 'Last 20 samples' }),
        ],
      }),
      jsx('div', {
        className: 'h-64',
        children: jsx(ResponsiveContainer, {
          width: '100%',
          height: '100%',
          children: jsxs(AreaChart, {
            data,
            margin: { top: 10, right: 20, left: 0, bottom: 0 },
            children: [
              jsxs('defs', {
                children: [
                  jsxs('linearGradient', {
                    id: 'cpuGradient',
                    x1: '0',
                    y1: '0',
                    x2: '0',
                    y2: '1',
                    children: [
                      jsx('stop', { offset: '5%', stopColor: '#34d399', stopOpacity: 0.6 }),
                      jsx('stop', { offset: '95%', stopColor: '#34d399', stopOpacity: 0 }),
                    ],
                  }),
                  jsxs('linearGradient', {
                    id: 'memGradient',
                    x1: '0',
                    y1: '0',
                    x2: '0',
                    y2: '1',
                    children: [
                      jsx('stop', { offset: '5%', stopColor: '#60a5fa', stopOpacity: 0.6 }),
                      jsx('stop', { offset: '95%', stopColor: '#60a5fa', stopOpacity: 0 }),
                    ],
                  }),
                ],
              }),
              jsx(CartesianGrid, { strokeDasharray: '3 3', stroke: '#1e293b' }),
              jsx(XAxis, { dataKey: 'time', stroke: '#94a3b8', tick: { fontSize: 12 } }),
              jsx(YAxis, { stroke: '#94a3b8', tick: { fontSize: 12 }, domain: [0, 'dataMax + 20'] }),
              jsx(Tooltip, {
                contentStyle: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: 8 },
                labelStyle: { color: '#e2e8f0' },
              }),
              jsx(Area, { type: 'monotone', dataKey: 'cpu', stroke: '#34d399', fillOpacity: 1, fill: 'url(#cpuGradient)', name: 'CPU %' }),
              jsx(Area, { type: 'monotone', dataKey: 'memory', stroke: '#60a5fa', fillOpacity: 1, fill: 'url(#memGradient)', name: 'Memory MB' }),
            ],
          }),
        }),
      }),
    ],
  });
}
