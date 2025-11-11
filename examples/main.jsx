import React from 'react';
import ReactDOM from 'react-dom/client';
import SampleFormFieldsExample from './SampleFormFieldsExample.jsx';
import '../src/index.css';

// Switch between examples by changing the component below
// Options: BasicExample (inline config), JsonExample (loads from JSON), or SampleFormFieldsExample (uses sampleFormFields.json)
const App = SampleFormFieldsExample; // Change to BasicExample or JsonExample to see other examples

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
