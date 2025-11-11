# Extraction Notes

This project was extracted from the `parrot-studio-web-v2` codebase for POC purposes.

## Files Extracted

### Core Components
- `src/components/form-json-render/FormJsonRenderer.jsx` - Main form renderer component
- `src/components/form-json-render/FieldComponents.jsx` - Field type components (TextInput, SelectInput, TextAreaInput)

### Utilities
- `src/utils/form-json-render/yupSchemaBuilder.js` - Yup schema generation from field configs
- `src/utils/form-json-render/evaluatorFunctions.js` - Conditional visibility evaluation
- `src/utils/form-json-render/miscUtils.js` - Field component mapping utility

### Supporting Components
- `src/hocs/RHFController.js` - React Hook Form controller wrapper
- `src/components/common-components/customized-textfield/CustomizedTextField.jsx` - Custom text field component
- `src/components/common-components/customized-textarea/CustomizedTextArea.jsx` - Custom textarea component

## Changes Made During Extraction

1. **Import Paths**: Updated all imports from `src/` absolute paths to relative paths
2. **Dependencies**: Extracted only necessary dependencies into `package.json`
3. **Project Structure**: Created standalone project structure with examples
4. **Configuration**: Added Vite, Tailwind CSS, and PostCSS configuration
5. **Documentation**: Created comprehensive README and quick start guide

## Dependencies

### Runtime Dependencies
- React 18+
- React Hook Form 7+
- Yup 1.6+
- Material-UI 6+
- PropTypes

### Development Dependencies
- Vite 6+
- Tailwind CSS 3+
- PostCSS
- Autoprefixer

## Original Source Location

- Components: `parrot-studio-web-v2/src/components/form-json-render/`
- Utils: `parrot-studio-web-v2/src/utils/form-json-render/`
- HOC: `parrot-studio-web-v2/src/hocs/RHFController.js`
- Custom Components: `parrot-studio-web-v2/src/components/common-components/`

## Notes

- The project maintains the same functionality as the original implementation
- All Tailwind CSS classes are preserved
- Material-UI theming is maintained
- The form renderer is fully functional and ready for POC testing

