import {
  EmailInput,
  SelectInput,
  TextAreaInput,
  TextInput,
} from '../../components/form-json-render/FieldComponents';

export const getFieldComponent = (type) => {
  switch (type) {
    case 'text':
      return TextInput;
    case 'select':
      return SelectInput;
    case 'textarea':
      return TextAreaInput;
    case 'email':
      return EmailInput;
    case 'number':
      return TextInput;
    default:
      return null;
  }
};

