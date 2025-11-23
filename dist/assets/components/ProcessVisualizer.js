import { jsx, jsxs } from 'react/jsx-runtime';

const TYPE_COLORS = {
  launcher: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40',
  browser: 'bg-blue-500/20 text-blue-200 border-blue-500/40',
  sandbox: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
  network: 'bg-violet-500/20 text-violet-200 border-violet-500/40',
};

function ProcessNodeItem({ node }) {
  return jsxs('li', {
    className: 'ml-4',
    children: [
      jsxs('div', {
        className: `inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${TYPE_COLORS[node.type]}`,
        children: [
          jsx('span', { className: 'font-semibold', children: node.name }),
          jsx('span', { className: 'font-mono text-xs', children: `PID ${node.pid}` }),
          jsx('span', { className: 'uppercase text-[10px] tracking-wide', children: node.type }),
        ],
      }),
      node.children && node.children.length > 0
        ? jsx('ul', { className: 'mt-2 space-y-2', children: node.children.map((child) => jsx(ProcessNodeItem, { node: child }, `${child.name}-${child.pid}`)) })
        : null,
    ],
  });
}

export function ProcessVisualizer({ data }) {
  return jsxs('div', {
    className: 'bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg h-full',
    children: [
      jsxs('div', {
        className: 'flex items-center justify-between mb-4',
        children: [
          jsxs('div', {
            children: [
              jsx('p', { className: 'text-xs uppercase text-slate-400 tracking-wide', children: 'Process Model' }),
              jsx('h3', { className: 'text-xl font-semibold text-white', children: 'Namespace Tree' }),
            ],
          }),
          jsx('span', { className: 'text-xs text-slate-400 font-mono', children: 'PID ROOT' }),
        ],
      }),
      jsx('ul', { className: 'space-y-2', children: jsx(ProcessNodeItem, { node: data }) }),
    ],
  });
}
