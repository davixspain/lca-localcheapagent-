import React from 'react';
import { Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { SecurityModule } from '../types';

type SecurityControlsProps = {
  modules: SecurityModule[];
  toggleModule: (id: string) => void;
};

export const SecurityControls: React.FC<SecurityControlsProps> = ({ modules, toggleModule }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase text-slate-400 tracking-wide">Security Controls</p>
          <h3 className="text-xl font-semibold text-white">Sandbox Policies</h3>
        </div>
        <Shield className="text-emerald-400" />
      </div>

      <div className="space-y-3">
        {modules.map((module) => (
          <div key={module.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/70 border border-slate-700">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{module.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    module.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : module.status === 'warning'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {module.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-slate-400">{module.description}</p>
            </div>
            <button
              onClick={() => toggleModule(module.id)}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
              aria-label={`Toggle ${module.name}`}
            >
              {module.enabled ? <ToggleRight /> : <ToggleLeft />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
