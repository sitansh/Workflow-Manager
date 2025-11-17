// FIX: Import React to make React.ComponentType available.
import React from 'react';

export enum StepKey {
  FRONTEND = 'FRONTEND',
  BACKEND_API = 'BACKEND_API',
  SANDBOX = 'SANDBOX',
  OUTPUT = 'OUTPUT',
}

export interface ExecutionStep {
  key: StepKey;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}
