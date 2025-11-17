
import React, { useState, useCallback, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ExecutionStep, StepKey } from './types';
import { EXECUTION_STEPS, INITIAL_PYTHON_CODE } from './constants';
import { executePythonCode } from './services/geminiService';
import ExecutionFlowPanel from './components/ExecutionFlowPanel';
import CodePanel from './components/CodePanel';

const promiseWithTimeout = <T,>(
  promise: Promise<T>,
  ms: number,
  errorMessage = 'Operation timed out.'
): Promise<T> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(errorMessage));
    }, ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

const App: React.FC = () => {
  const [code, setCode] = useState<string>(INITIAL_PYTHON_CODE);
  const [output, setOutput] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<StepKey | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isSimulationComplete, setIsSimulationComplete] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const handleRunSimulation = useCallback(async () => {
    setIsLoading(true);
    setOutput('');
    setError('');
    setIsSimulationComplete(false);

    try {
      setCurrentStep(StepKey.FRONTEND);
      await delay(700);

      setCurrentStep(StepKey.BACKEND_API);
      await delay(700);
      
      setCurrentStep(StepKey.SANDBOX);
      const result = await promiseWithTimeout(
        executePythonCode(code),
        15000, // 15 seconds timeout
        'The service is unavailable. Your request timed out. Please try again later.'
      );
      await delay(700);
      
      setCurrentStep(StepKey.OUTPUT);
      await delay(700);
      setOutput(result);
      setIsSimulationComplete(true);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Error during execution: ${errorMessage}`);
      setOutput('');
      setCurrentStep(null);
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  const handleReset = () => {
    setCode(INITIAL_PYTHON_CODE);
    setOutput('');
    setCurrentStep(null);
    setIsLoading(false);
    setError('');
    setIsSimulationComplete(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCode(text);
      };
      reader.readAsText(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-400">
            Dev Workflow Simulator
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Visualize the journey of a request from UI to execution and back.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ExecutionFlowPanel
              steps={EXECUTION_STEPS}
              currentStep={currentStep}
              isComplete={isSimulationComplete}
            />
          </div>
          <div className="lg:col-span-2">
            <CodePanel
              code={code}
              setCode={setCode}
              output={output}
              error={error}
              isLoading={isLoading}
              onRun={handleRunSimulation}
              onReset={handleReset}
              onUpload={triggerFileUpload}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".py"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
