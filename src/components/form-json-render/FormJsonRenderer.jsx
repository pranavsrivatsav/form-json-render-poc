import React from 'react';
import PropTypes from 'prop-types';

import RHFController from '../../hocs/RHFController';
import { getFieldComponent } from '../../utils/form-json-render/miscUtils';

const FormJsonRenderer = ({ fields, methods }) => (
  <div className="space-y-4">
    {fields.map((field) => {
      const FieldComponent = getFieldComponent(field.type);
      if (!FieldComponent) return null;

      return (
        <div key={field.name}>
          <RHFController
            name={field.name}
            control={methods.control}
            applyFields={false}
            handleErrors={false}
          >
            <FieldComponent {...field} />
          </RHFController>
        </div>
      );
    })}
  </div>
);

FormJsonRenderer.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string,
      required: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          display: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  methods: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
};

export default FormJsonRenderer;

