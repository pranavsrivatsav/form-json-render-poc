# Quick Start Guide

## Getting Started

1. **Install dependencies:**
   ```bash
   cd form-json-render-poc
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Project Structure

```
form-json-render-poc/
├── src/
│   ├── components/
│   │   ├── form-json-render/      # Main form renderer components
│   │   └── common-components/      # Reusable UI components
│   ├── utils/
│   │   └── form-json-render/       # Utility functions (validation, evaluation)
│   ├── hocs/                       # Higher-order components
│   ├── index.js                    # Main exports
│   └── index.css                   # Global styles
├── examples/                        # Example implementations
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md                        # Full documentation
```

## Using in Your Project

### Import the components:

```jsx
import FormJsonRenderer from './src/components/form-json-render/FormJsonRenderer';
import buildYupSchema from './src/utils/form-json-render/yupSchemaBuilder';
```

### Or use the main export:

```jsx
import { FormJsonRenderer, buildYupSchema } from './src/index';
```

## Example Usage

See `examples/BasicExample.jsx` for a complete working example.

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check out the examples in the `examples/` directory
- Customize field components in `src/components/form-json-render/FieldComponents.jsx`
- Add new field types by extending the `getFieldComponent` function

