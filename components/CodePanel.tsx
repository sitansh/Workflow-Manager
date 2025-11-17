
import React from 'react';
import { ArrowUpTrayIcon } from './Icons';

interface CodePanelProps {
  code: string;
  setCode: (code: string) => void;
  output: string;
  error: string;
  isLoading: boolean;
  onRun: () => void;
  onReset: () => void;
  onUpload: () => void;
}

const CodePanel: React.FC<CodePanelProps> = ({
  code,
  setCode,
  output,
  error,
  isLoading,
  onRun,
  onReset,
  onUpload,
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-2xl font-bold text-slate-100">Python Code</h2>
                <p className="text-slate-400">Edit the code below and run the simulation.</p>
            </div>
            <button
                onClick={onUpload}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
            >
                <ArrowUpTrayIcon className="w-5 h-5" />
                <span>Upload</span>
            </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-80 bg-slate-900 text-slate-300 font-mono p-4 rounded-md border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
          placeholder="Enter your Python code here..."
          spellCheck="false"
        />
        <div className="mt-6 flex items-center justify-end space-x-4">
          <button
            onClick={onReset}
            disabled={isLoading}
            className="px-6 py-2 rounded-md bg-slate-600 text-slate-200 font-semibold hover:bg-slate-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
          <button
            onClick={onRun}
            disabled={isLoading}
            className="px-8 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Running...
              </>
            ) : (
              'Run Simulation'
            )}
          </button>
        </div>
      </div>
      <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">Output & Logs</h2>
        <pre className="w-full h-48 bg-slate-900 text-slate-300 font-mono p-4 rounded-md border border-slate-600 overflow-auto">
          {error ? (
            <code className="text-red-400">{error}</code>
          ) : output ? (
            <code>{output}</code>
          ) : (
            <span className="text-slate-500">Output will appear here after running the simulation.</span>
          )}
        </pre>
      </div>
    </div>
  );
};

export default CodePanel;
