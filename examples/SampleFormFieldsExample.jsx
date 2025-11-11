import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormJsonRenderer from '../src/components/form-json-render/FormJsonRenderer';
import buildYupSchema from '../src/utils/form-json-render/yupSchemaBuilder';
import sampleFormFields from './sampleFormFields.json';

function SampleFormFieldsExample() {
  // Build default values from form fields
  const getDefaultValues = (fields) => {
    const defaults = {};
    fields.forEach((field) => {
      defaults[field.name] = '';
    });
    return defaults;
  };

  const schema = buildYupSchema(sampleFormFields);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues(sampleFormFields),
  });

  const onSubmit = (data) => {
    console.log('Form submitted with data:', data);
    alert('Form submitted successfully! Check console for submitted data.');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem', color: '#333' }}>
        Form JSON Renderer - Sample Form Fields Example
      </h1>
      <p style={{ marginBottom: '2rem', color: '#666', fontSize: '1rem' }}>
        This example uses the form configuration from <code>sampleFormFields.json</code>.
        The form includes fields for personal information, contact details, and additional information.
      </p>
      
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormJsonRenderer fields={sampleFormFields} methods={methods} />
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#259566',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1e7a4f'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#259566'}
          >
            Submit Form
          </button>
          <button
            type="button"
            onClick={() => methods.reset()}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#666'}
          >
            Reset Form
          </button>
        </div>
      </form>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>Current Form Values:</h3>
        <pre style={{ 
          overflow: 'auto', 
          maxHeight: '300px',
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '4px',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}>
          {JSON.stringify(methods.watch(), null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#e8f4f8', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>
          Form Configuration (from sampleFormFields.json):
        </h3>
        <pre style={{ 
          overflow: 'auto', 
          maxHeight: '300px',
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '4px',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}>
          {JSON.stringify(sampleFormFields, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default SampleFormFieldsExample;

