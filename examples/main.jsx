import React from 'react';
import ReactDOM from 'react-dom/client';
import SampleFormFieldsExample from './SampleFormFieldsExample.jsx';
import MultiPageFormExample from './MultiPageFormExample.jsx';
import '../src/index.css';

// Switch between examples by changing the component below
// Options: 
//   - SampleFormFieldsExample: Single-page form (uses sampleFormFields.json)
//   - MultiPageFormExample: Multi-page form (uses multiPageFormFields.json)
const App = MultiPageFormExample; // Change to SampleFormFieldsExample to see single-page example

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
