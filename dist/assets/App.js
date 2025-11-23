import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, Layers, Shield } from 'lucide-react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { ProcessVisualizer } from './components/ProcessVisualizer.js';
import { ResourceMonitor } from './components/ResourceMonitor.js';
import { SecurityControls } from './components/SecurityControls.js';
import { Terminal } from './components/Terminal.js';

const INITIAL_LOGS = [
  { id: '1', timestamp: '10:00:01', level: 'INFO', component: 'launcher', message: 'Chimera Launcher initialized (uid=0)' },
  { id: '2', timestamp: '10:00:01', level: 'INFO', component: 'ns_setup', message: 'Unsharing namespaces: NEWUSER NEWNET NEWNS NEWPID' },
  { id: '3', timestamp: '10:00:02', level: 'INFO', component: 'caps', message: 'Dropped capabilities: Effective, Permitted, Inheritable' },
  { id: '4', timestamp: '10:00:02', level: 'INFO', component: 'seccomp', message: 'Filter loaded: 14 syscalls allowed' },
  { id: '5', timestamp: '10:00:03', level: 'INFO', component: 'launcher', message: 'Exec: chimera-browser (sandbox active)' },
  { id: '6', timestamp: '10:00:05', level: 'DEBUG', component: 'bpf', message: 'LSM attached: socket_connect' },
];

const INITIAL_PROCESS_DATA = {
  name: 'chimera-launcher',
  pid: 1240,
  type: 'launcher',
  children: [
    {
      name: 'chimera-browser',
      pid: 1241,
      type: 'browser',
      children: [
        { name: 'render-gpu', pid: 1245, type: 'sandbox', children: [] },
        { name: 'net-thread', pid: 1246, type: 'network', children: [] },
        { name: 'tab-isolate-1', pid: 1250, type: 'sandbox', children: [] },
      ],
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [modules, setModules] = useState([
    {
      id: 'apparmor',
      name: 'AppArmor Profiles',
      enabled: true,
      status: 'active',
      description: '/etc/apparmor.d/usr.bin.chimera-browser enforced',
    },
    {
      id: 'seccomp',
      name: 'Seccomp-BPF',
      enabled: true,
      status: 'active',
      description: 'Strict syscall filtering whitelist active',
    },
    {
      id: 'bpf',
      name: 'eBPF LSM',
      enabled: true,
      status: 'active',
      description: 'Socket connect hooks attached',
    },
    {
      id: 'netns',
      name: 'Network Namespaces',
      enabled: false,
      status: 'warning',
      description: 'Tor per-tab isolation (pending)',
    },
  ]);
  const [resourceData, setResourceData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString();

      setResourceData((prev) => {
        const newData = [...prev, { time: timeStr, cpu: 10 + Math.random() * 15, memory: 200 + Math.random() * 50 }];
        return newData.slice(-20);
      });

      if (Math.random() > 0.8) {
        const msgType = Math.random();
        let newLog;

        if (msgType > 0.9) {
          newLog = {
            id: Date.now().toString(),
            timestamp: timeStr,
            level: 'WARN',
            component: 'seccomp',
            message: `Syscall blocked: SYS_ptrace (${Math.floor(Math.random() * 9999)})`,
          };
        } else if (msgType > 0.6) {
          newLog = {
            id: Date.now().toString(),
            timestamp: timeStr,
            level: 'DEBUG',
            component: 'netns',
            message: 'Packet drop: out-of-bounds destination',
          };
        } else {
          newLog = {
            id: Date.now().toString(),
            timestamp: timeStr,
            level: 'INFO',
            component: 'browser',
            message: 'Garbage collection in isolated heap',
          };
        }
        setLogs((prev) => [...prev, newLog]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleModule = (id) => {
    setModules((prev) => prev.map((module) => (module.id === id ? { ...module, enabled: !module.enabled } : module)));
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        level: 'WARN',
        component: 'user_action',
        message: `Security module ${id} toggled by admin`,
      },
    ]);
  };

  return jsxs('div', {
    className: 'min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row font-sans',
    children: [
      jsxs('aside', {
        className: 'w-full md:w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0',
        children: [
          jsxs('div', {
            className: 'p-6 flex items-center gap-3 border-b border-slate-800',
            children: [
              jsx('div', {
                className:
                  'w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-emerald-500/20 shadow-lg',
                children: jsx(Shield, { className: 'text-white w-5 h-5' }),
              }),
              jsx('h1', { className: 'text-xl font-bold tracking-tight text-white', children: 'CHIMERA' }),
            ],
          }),
          jsxs('nav', {
            className: 'p-4 space-y-2',
            children: [
              jsxs('button', {
                onClick: () => setActiveTab('dashboard'),
                className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'hover:bg-slate-800 text-slate-400'
                }`,
                'aria-current': activeTab === 'dashboard',
                children: [jsx(Layers, { size: 18 }), jsx('span', { className: 'font-medium', children: 'Dashboard' })],
              }),
              jsxs('button', {
                onClick: () => setActiveTab('security'),
                className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'security'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'hover:bg-slate-800 text-slate-400'
                }`,
                'aria-current': activeTab === 'security',
                children: [jsx(Shield, { size: 18 }), jsx('span', { className: 'font-medium', children: 'Security Policy' })],
              }),
              jsxs('button', {
                onClick: () => setActiveTab('network'),
                className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'network'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'hover:bg-slate-800 text-slate-400'
                }`,
                'aria-current': activeTab === 'network',
                children: [jsx(Activity, { size: 18 }), jsx('span', { className: 'font-medium', children: 'Telemetry' })],
              }),
            ],
          }),
          jsx('div', {
            className: 'mt-auto p-4',
            children: jsxs('div', {
              className: 'bg-slate-800/50 rounded-lg p-4 border border-slate-700',
              children: [
                jsx('h3', {
                  className: 'text-xs font-bold text-slate-500 uppercase mb-2',
                  children: 'System Status',
                }),
                jsxs('div', {
                  className: 'flex items-center gap-2 mb-1',
                  children: [
                    jsx('div', { className: 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse', 'aria-hidden': true }),
                    jsx('span', { className: 'text-sm font-mono text-emerald-400', children: 'SECURE_BOOT' }),
                  ],
                }),
                jsxs('div', {
                  className: 'flex items-center gap-2',
                  children: [
                    jsx('div', { className: 'w-2 h-2 rounded-full bg-emerald-500', 'aria-hidden': true }),
                    jsx('span', { className: 'text-sm font-mono text-emerald-400', children: 'LOCKDOWN: ON' }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      jsxs('main', {
        className: 'flex-1 p-6 md:p-8 overflow-y-auto',
        children: [
          jsxs('header', {
            className: 'flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8',
            children: [
              jsxs('div', {
                children: [
                  jsx('h2', { className: 'text-2xl font-bold text-white', children: 'System Dashboard' }),
                  jsx('p', {
                    className: 'text-slate-400',
                    children: 'Monitoring runtime integrity for PID 1240 (chimera-launcher)',
                  }),
                ],
              }),
              jsxs('div', {
                className: 'flex gap-3',
                children: [
                  jsxs('div', {
                    className: 'bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 flex items-center gap-2',
                    children: [jsx(AlertTriangle, { size: 16, className: 'text-amber-500' }), jsx('span', { className: 'text-sm font-mono', children: '0 THREATS' })],
                  }),
                  jsx('button', {
                    className:
                      'bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20',
                    children: 'Run Audit',
                  }),
                ],
              }),
            ],
          }),
          jsxs('div', {
            className: 'grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6',
            children: [
              jsx(SecurityControls, { modules, toggleModule }),
              jsx(ProcessVisualizer, { data: INITIAL_PROCESS_DATA }),
            ],
          }),
          jsxs('div', {
            className: 'grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6',
            children: [
              jsx('div', { className: 'lg:col-span-2', children: jsx(ResourceMonitor, { data: resourceData }) }),
              jsxs('div', {
                className: 'bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg flex flex-col justify-center items-center text-center',
                children: [
                  jsxs('div', {
                    className: 'w-32 h-32 rounded-full border-4 border-emerald-500/30 flex items-center justify-center mb-4 relative',
                    children: [
                      jsx('div', {
                        className: 'absolute inset-0 rounded-full border-t-4 border-emerald-500 animate-spin',
                        'aria-hidden': true,
                      }),
                      jsx('span', { className: 'text-3xl font-bold text-white', children: '100%' }),
                    ],
                  }),
                  jsx('h3', { className: 'text-lg font-semibold text-white', children: 'Integrity Score' }),
                  jsx('p', { className: 'text-sm text-slate-400 mt-2', children: 'All kernel hooks verified.' }),
                  jsx('p', { className: 'text-sm text-slate-400', children: 'AppArmor enforcing mode.' }),
                ],
              }),
            ],
          }),
          jsx(Terminal, { logs }),
        ],
      }),
    ],
  });
}
