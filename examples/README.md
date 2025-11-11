# Examples

This directory contains example implementations of the FormJsonRenderer.

## Files

- **BasicExample.jsx** - Demonstrates using FormJsonRenderer with inline form field configuration
- **JsonExample.jsx** - Demonstrates loading form configuration from a JSON file (`sampleFormFields.json`)
- **sampleFormFields.json** - Sample JSON configuration with various field types and validation rules
- **main.jsx** - Entry point that renders one of the examples

## Running Examples

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Switch between examples by editing `main.jsx`:
   ```jsx
   const App = JsonExample; // or BasicExample
   ```

## Sample JSON Structure

The `sampleFormFields.json` file includes examples of:

- **Text fields** with min/max length validation
- **Email fields** with automatic email validation
- **Number fields** with min/max value validation
- **Select dropdowns** with multiple options
- **Textarea fields** with max length validation
- **Phone number** with regex pattern validation

## Field Types in Sample JSON

1. **firstName** - Text field (required, 2-50 characters)
2. **lastName** - Text field (required, 2-50 characters)
3. **email** - Email field (required, automatic email validation)
4. **phone** - Text field (optional, 10-digit phone number pattern)
5. **age** - Number field (optional, 18-100 range)
6. **country** - Select field (required, 7 country options)
7. **message** - Textarea field (optional, max 500 characters)
8. **company** - Text field (optional, max 100 characters)
9. **jobTitle** - Text field (optional, max 50 characters)

## Customizing the Sample JSON

You can modify `sampleFormFields.json` to:
- Add or remove fields
- Change validation rules
- Update field labels
- Modify options for select fields
- Add conditional visibility rules

After modifying the JSON, the changes will be reflected when you run `JsonExample.jsx`.

