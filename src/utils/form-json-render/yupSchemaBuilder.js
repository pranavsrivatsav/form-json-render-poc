import * as yup from 'yup';

function buildYupSchema(fields) {
  const shape = {};

  // Normalize input: support both single-page (array) and multi-page (object with pages) formats
  let allFields = [];
  if (fields && typeof fields === 'object' && !Array.isArray(fields) && fields.pages) {
    // Multi-page format: extract all fields from all pages
    allFields = fields.pages.flatMap((page) => page.fields || []);
  } else if (Array.isArray(fields)) {
    // Single-page format: array of fields
    allFields = fields;
  }

  allFields.forEach((field) => {
    let validator;

    switch (field.type) {
      case 'text':
      case 'email':
        validator = yup.string();
        if (field.type === 'email') {
          validator = validator.email('Invalid email format');
        }
        break;

      case 'number':
        validator = yup.number().typeError(`${field.label} must be a number`);
        break;

      case 'checkbox':
        validator = yup.boolean();
        break;

      case 'select':
        validator = yup.string();
        break;

      case 'textarea':
        validator = yup.string();
        break;

      default:
        validator = yup.mixed();
    }

    if (field.required) {
      validator = validator.required(`${field.label} is required`);
    }

    (field.validations ?? []).forEach((ruleObj) => {
      const { rule, value } = ruleObj;
      switch (rule) {
        case 'min':
          validator = validator.min(value, `${field.label} must be at least ${value}`);
          break;
        case 'max':
          validator = validator.max(value, `${field.label} must be at most ${value}`);
          break;
        case 'minLength':
          validator = validator.min(value, `${field.label} must be at least ${value} characters`);
          break;
        case 'maxLength':
          validator = validator.max(value, `${field.label} must be at most ${value} characters`);
          break;
        case 'matches':
          validator = validator.matches(new RegExp(value), `${field.label} format is invalid`);
          break;
        default:
          break;
      }
    });

    shape[field.name] = validator;
  });

  return yup.object().shape(shape);
}

export default buildYupSchema;

