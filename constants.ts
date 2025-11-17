import { ExecutionStep, StepKey } from './types';
import {
  ComputerDesktopIcon,
  BoltIcon,
  CubeTransparentIcon,
  DocumentTextIcon,
} from './components/Icons';

export const INITIAL_PYTHON_CODE = `import pandas as pd

# Create a sample DataFrame
data = {'Product': ['Apples', 'Oranges', 'Bananas', 'Grapes'],
        'Category': ['Fruit', 'Fruit', 'Fruit', 'Fruit'],
        'Price': [1.20, 0.80, 0.50, 2.50],
        'Quantity': [100, 150, 200, 80]}
df = pd.DataFrame(data)

print("Initial DataFrame:")
print(df)

# Calculate total price for each product
df['TotalPrice'] = df['Price'] * df['Quantity']

print("\\nDataFrame with TotalPrice:")
print(df)

# Calculate total revenue
total_revenue = df['TotalPrice'].sum()
// FIX: Escaped the dollar sign to prevent TypeScript from treating the python f-string as a template literal placeholder.
print(f"\\nTotal Revenue: \${total_revenue:.2f}")
`;

export const EXECUTION_STEPS: ExecutionStep[] = [
  {
    key: StepKey.FRONTEND,
    title: 'Frontend (UI)',
    description: 'User triggers action from the interface.',
    icon: ComputerDesktopIcon,
  },
  {
    key: StepKey.BACKEND_API,
    title: 'POST /run -> Backend API',
    description: 'Request is sent to the backend service.',
    icon: BoltIcon,
  },
  {
    key: StepKey.SANDBOX,
    title: 'Execute in Python Sandbox',
    description: 'Backend executes the code in a secure environment.',
    icon: CubeTransparentIcon,
  },
  {
    key: StepKey.OUTPUT,
    title: 'Output/Logs -> Frontend',
    description: 'Results are streamed back to the UI for display.',
    icon: DocumentTextIcon,
  },
];
