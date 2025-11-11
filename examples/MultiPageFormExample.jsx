import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormJsonRenderer from '../src/components/form-json-render/FormJsonRenderer';
import buildYupSchema from '../src/utils/form-json-render/yupSchemaBuilder';
import multiPageFormFields from './multiPageFormFields.json';

function MultiPageFormExample() {
  // Build default values from form fields (handles both single-page and multi-page formats)
  const getDefaultValues = (fields) => {
    const defaults = {};
    let allFields = [];

    // Normalize input: support both single-page (array) and multi-page (object with pages) formats
    if (fields && typeof fields === 'object' && !Array.isArray(fields) && fields.pages) {
      // Multi-page format: extract all fields from all pages
      allFields = fields.pages.flatMap((page) => page.fields || []);
    } else if (Array.isArray(fields)) {
      // Single-page format: array of fields
      allFields = fields;
    }

    allFields.forEach((field) => {
      defaults[field.name] = '';
    });
    return defaults;
  };

  const schema = buildYupSchema(multiPageFormFields);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues(multiPageFormFields),
  });

  const onSubmit = (data) => {
    console.log('Form submitted with data:', data);
    alert('Form submitted successfully! Check console for submitted data.');
  };

  // Reset fields that are not visible
  const formValues = methods.watch();

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem', color: '#333' }}>
        Form JSON Renderer - Multi-Page Form Example
      </h1>
      <p style={{ marginBottom: '2rem', color: '#666', fontSize: '1rem' }}>
        This example demonstrates a multi-page form using the form configuration from{' '}
        <code>multiPageFormFields.json</code>. The form is split into three pages: Personal
        Information, Contact Details, and Additional Information. You can navigate between pages
        using the Previous/Next buttons, and validation occurs when moving to the next page.
      </p>

      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormJsonRenderer fields={multiPageFormFields} methods={methods} />

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
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
            onMouseOver={(e) => (e.target.style.backgroundColor = '#1e7a4f')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#259566')}
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
            onMouseOver={(e) => (e.target.style.backgroundColor = '#555')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#666')}
          >
            Reset Form
          </button>
        </div>
      </form>

      <div
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>
          Current Form Values:
        </h3>
        <pre
          style={{
            overflow: 'auto',
            maxHeight: '300px',
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '4px',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>

      <div
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#e8f4f8',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>
          Form Configuration (from multiPageFormFields.json):
        </h3>
        <pre
          style={{
            overflow: 'auto',
            maxHeight: '300px',
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '4px',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
        >
          {JSON.stringify(multiPageFormFields, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default MultiPageFormExample;

