
import React from 'react';
import { ExecutionStep, StepKey } from '../types';
import { CheckIcon } from './Icons';

interface ExecutionFlowPanelProps {
  steps: ExecutionStep[];
  currentStep: StepKey | null;
  isComplete: boolean;
}

const ExecutionFlowPanel: React.FC<ExecutionFlowPanelProps> = ({ steps, currentStep, isComplete }) => {
  const currentStepIndex = currentStep ? steps.findIndex(step => step.key === currentStep) : -1;

  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 h-full">
      <h2 className="text-2xl font-bold text-slate-100 mb-6">Execution Flow</h2>
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isActive = !isComplete && currentStep === step.key;
          const isCompleted = isComplete || currentStepIndex > index;
          const Icon = step.icon;

          return (
            <div key={step.key} className="flex items-start space-x-4">
              <div className="relative flex-shrink-0 w-12 h-12">
                {/* Spinner for active state */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full border-2 border-blue-400 border-t-transparent animate-spin"
                    aria-label="Processing..."
                    role="status"
                  ></div>
                )}
                <div
                  className={`w-full h-full rounded-full flex items-center justify-center transition-colors duration-300
                  ${isCompleted ? 'bg-green-500' : ''}
                  ${isActive ? 'bg-blue-500' : ''}
                  ${!isActive && !isCompleted ? 'bg-slate-700' : ''}`}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-6 h-6 text-white" />
                  ) : (
                    <Icon className={`w-6 h-6 ${isActive || isCompleted ? 'text-white' : 'text-slate-400'}`} />
                  )}
                </div>
              </div>
              <div>
                <h3 className={`font-semibold transition-colors duration-300 ${isActive ? 'text-blue-400' : 'text-slate-200'}`}>
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutionFlowPanel;
