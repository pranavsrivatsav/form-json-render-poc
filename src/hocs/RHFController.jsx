// RHFController.jsx
import { cloneElement } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const RHFController = (props) => {
  const { control, name, children, applyFields = false, handleErrors = false } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const elementProps = applyFields
          ? {
              ...field,
              ...fieldState,
            }
          : {
              rhfField: field,
              rhfFieldState: fieldState,
            };

        // return children with field props as a prop called RHFField
        const childElement = cloneElement(children, {
          ...elementProps,
          control,
        });

        return (
          <>
            {childElement}
            {handleErrors && fieldState.error && (
              <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-600">
                {fieldState.error.message}
              </p>
            )}
          </>
        );
      }}
    />
  );
};

RHFController.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  applyFields: PropTypes.bool,
  handleErrors: PropTypes.bool,
};

RHFController.defaultProps = {
  applyFields: false,
  handleErrors: false,
};

export default RHFController;

