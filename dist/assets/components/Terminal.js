import { jsx, jsxs } from 'react/jsx-runtime';

const levelColors = {
  INFO: 'text-emerald-300',
  WARN: 'text-amber-300',
  ERROR: 'text-rose-300',
  DEBUG: 'text-sky-300',
};

export function Terminal({ logs }) {
  return jsxs('div', {
    className: 'bg-slate-900 rounded-xl border border-slate-800 shadow-inner p-4 max-h-80 overflow-y-auto scrollbar-hide font-mono text-sm',
    children: [
      jsxs('div', {
        className: 'flex items-center justify-between mb-3',
        children: [
          jsxs('div', {
            children: [
              jsx('p', { className: 'text-xs uppercase text-slate-500 tracking-wide', children: 'Audit Log' }),
              jsx('h3', { className: 'text-lg font-semibold text-white', children: 'Sandbox Console' }),
            ],
          }),
          jsx('span', { className: 'text-xs text-slate-500', children: 'tail -f secure.log' }),
        ],
      }),
      jsx('ul', {
        className: 'space-y-1',
        children: logs.map((log) =>
          jsxs(
            'li',
            {
              className: 'flex gap-3',
              children: [
                jsx('span', { className: 'text-slate-500', children: log.timestamp }),
                jsx('span', { className: `${levelColors[log.level]} font-semibold`, children: log.level.padEnd(5, ' ') }),
                jsx('span', { className: 'text-slate-400', children: `[${log.component}]` }),
                jsx('span', { className: 'text-slate-200', children: log.message }),
              ],
            },
            log.id,
          ),
        ),
      }),
    ],
  });
}
