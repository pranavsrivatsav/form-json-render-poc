# Form JSON Renderer POC

A flexible JSON-based form renderer built with React, React Hook Form, and Yup validation. This library allows you to define forms using JSON configuration and automatically generates form fields with validation.

## Features

- 🎨 **JSON-based form configuration** - Define forms using simple JSON objects
- ✅ **Built-in validation** - Automatic Yup schema generation from field definitions
- 🎯 **Multiple field types** - Support for text, email, number, select, textarea, and more
- 🔄 **React Hook Form integration** - Seamless integration with React Hook Form
- 🎨 **Material-UI components** - Beautiful UI components out of the box
- 📝 **Customizable** - Easy to extend with custom field types

## Installation

```bash
npm install
```

## Dependencies

This project requires:
- React 18+
- React Hook Form 7+
- Yup 1.6+
- Material-UI 6+
- PropTypes

## Sample JSON Configuration

A sample JSON file is provided at `examples/sampleFormFields.json` that demonstrates various field types and configurations. You can use this as a reference or load it directly in your application.

```json
[
  {
    "name": "firstName",
    "type": "text",
    "label": "First Name",
    "required": true,
    "validations": [
      { "rule": "minLength", "value": 2 },
      { "rule": "maxLength", "value": 50 }
    ]
  },
  {
    "name": "email",
    "type": "email",
    "label": "Email Address",
    "required": true
  }
  // ... more fields
]
```

To use the sample JSON file:

```jsx
import sampleFormFields from './examples/sampleFormFields.json';
// Use sampleFormFields as your formFields array
```

## Usage

### Basic Example

```jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormJsonRenderer from './src/components/form-json-render/FormJsonRenderer';
import buildYupSchema from './src/utils/form-json-render/yupSchemaBuilder';

const formFields = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    required: true,
    validations: [
      { rule: 'minLength', value: 2 },
      { rule: 'maxLength', value: 50 },
    ],
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    required: true,
  },
  {
    name: 'country',
    type: 'select',
    label: 'Country',
    required: true,
    options: [
      { value: 'us', display: 'United States' },
      { value: 'uk', display: 'United Kingdom' },
      { value: 'ca', display: 'Canada' },
    ],
  },
  {
    name: 'message',
    type: 'textarea',
    label: 'Message',
    required: false,
  },
];

function MyForm() {
  const schema = buildYupSchema(formFields);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FormJsonRenderer fields={formFields} methods={methods} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
```

## Field Configuration

### Field Object Structure

```javascript
{
  name: string,           // Required: Field name (used as form field key)
  type: string,           // Required: Field type ('text', 'email', 'number', 'select', 'textarea')
  label: string,          // Optional: Field label
  required: boolean,      // Optional: Whether field is required
  options: array,         // Required for 'select' type: Array of {value, display} objects
  validations: array,     // Optional: Array of validation rules
  visibleWhen: object,    // Optional: Conditional visibility rules
}
```

### Supported Field Types

- `text` - Text input field
- `email` - Email input field with email validation
- `number` - Number input field
- `select` - Dropdown select field (requires `options` array)
- `textarea` - Multi-line text area

### Validation Rules

Validation rules are defined in the `validations` array:

```javascript
{
  rule: 'min' | 'max' | 'minLength' | 'maxLength' | 'matches',
  value: number | string | RegExp
}
```

Examples:
- `{ rule: 'minLength', value: 5 }` - Minimum 5 characters
- `{ rule: 'maxLength', value: 100 }` - Maximum 100 characters
- `{ rule: 'matches', value: '^[A-Z]' }` - Must match regex pattern

### Conditional Visibility

Fields can be conditionally shown/hidden based on other field values:

```javascript
{
  name: 'lastName',
  type: 'text',
  label: 'Last Name',
  visibleWhen: {
    field: 'showLastName',
    operator: 'equals',
    value: true,
  },
}
```

Supported operators:
- `equals` - Field value equals
- `notEquals` - Field value does not equal
- `greaterThan` - Field value is greater than
- `lessThan` - Field value is less than
- `in` - Field value is in array
- `notIn` - Field value is not in array

## API Reference

### `FormJsonRenderer`

Main component that renders form fields from JSON configuration.

**Props:**
- `fields` (array, required) - Array of field configuration objects
- `methods` (object, required) - React Hook Form methods object (must include `control`)

### `buildYupSchema(fields)`

Generates a Yup validation schema from field configurations.

**Parameters:**
- `fields` (array) - Array of field configuration objects

**Returns:** Yup schema object

### `evaluateVisibility(field, watchValues)`

Evaluates whether a field should be visible based on conditional rules.

**Parameters:**
- `field` (object) - Field configuration object
- `watchValues` (object) - Current form values (from React Hook Form's `watch()`)

**Returns:** boolean

## Project Structure

```
form-json-render-poc/
├── src/
│   ├── components/
│   │   ├── form-json-render/
│   │   │   ├── FormJsonRenderer.jsx
│   │   │   └── FieldComponents.jsx
│   │   └── common-components/
│   │       ├── customized-textfield/
│   │       └── customized-textarea/
│   ├── utils/
│   │   └── form-json-render/
│   │       ├── yupSchemaBuilder.js
│   │       ├── evaluatorFunctions.js
│   │       └── miscUtils.js
│   ├── hocs/
│   │   └── RHFController.js
│   └── index.js
├── examples/
├── package.json
└── README.md
```

## Examples

Two example implementations are provided in the `examples/` directory:

1. **BasicExample.jsx** - Uses inline form field configuration
2. **JsonExample.jsx** - Loads form configuration from `sampleFormFields.json`

To switch between examples, edit `examples/main.jsx` and change the `App` component:

```jsx
const App = JsonExample; // or BasicExample
```

Both examples demonstrate:
- Form rendering from JSON configuration
- Validation with Yup
- Form submission handling
- Real-time form value display

See `examples/README.md` for more details about the examples and the sample JSON structure.

## Development

To run the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

## Extending the Library

### Adding Custom Field Types

1. Create a new field component in `src/components/form-json-render/FieldComponents.jsx`
2. Add the component to the `getFieldComponent` function in `src/utils/form-json-render/miscUtils.js`
3. Add validation logic in `src/utils/form-json-render/yupSchemaBuilder.js` if needed

### Example Custom Field

```jsx
// In FieldComponents.jsx
export const CustomInput = ({ rhfField, rhfFieldState, label }) => (
  // Your custom component implementation
);

// In miscUtils.js
export const getFieldComponent = (type) => {
  switch (type) {
    case 'text':
      return TextInput;
    case 'custom':
      return CustomInput; // Add your custom type
    // ...
  }
};
```

## License

MIT

