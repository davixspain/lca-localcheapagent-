import { Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { jsx, jsxs } from 'react/jsx-runtime';

export function SecurityControls({ modules, toggleModule }) {
  return jsxs('div', {
    className: 'bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg',
    children: [
      jsxs('div', {
        className: 'flex items-center justify-between mb-4',
        children: [
          jsxs('div', {
            children: [
              jsx('p', { className: 'text-xs uppercase text-slate-400 tracking-wide', children: 'Security Controls' }),
              jsx('h3', { className: 'text-xl font-semibold text-white', children: 'Sandbox Policies' }),
            ],
          }),
          jsx(Shield, { className: 'text-emerald-400' }),
        ],
      }),
      jsx('div', {
        className: 'space-y-3',
        children: modules.map((module) =>
          jsxs(
            'div',
            {
              className: 'flex items-center justify-between p-3 rounded-lg bg-slate-900/70 border border-slate-700',
              children: [
                jsxs('div', {
                  children: [
                    jsxs('div', {
                      className: 'flex items-center gap-2',
                      children: [
                        jsx('span', { className: 'text-white font-medium', children: module.name }),
                        jsx('span', {
                          className: `text-xs px-2 py-0.5 rounded-full ${
                            module.status === 'active'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : module.status === 'warning'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-rose-500/20 text-rose-300'
                          }`,
                          children: module.status.toUpperCase(),
                        }),
                      ],
                    }),
                    jsx('p', { className: 'text-sm text-slate-400', children: module.description }),
                  ],
                }),
                jsx('button', {
                  onClick: () => toggleModule(module.id),
                  className: 'text-emerald-400 hover:text-emerald-300 transition-colors',
                  'aria-label': `Toggle ${module.name}`,
                  children: module.enabled ? jsx(ToggleRight, {}) : jsx(ToggleLeft, {}),
                }),
              ],
            },
            module.id,
          ),
        ),
      }),
    ],
  });
}
