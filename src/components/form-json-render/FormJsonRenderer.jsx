import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import RHFController from '../../hocs/RHFController';
import { getFieldComponent } from '../../utils/form-json-render/miscUtils';

const FormJsonRenderer = ({ fields, methods, validateOnPageChange = true }) => {
  // Normalize input: support both single-page (array) and multi-page (object with pages) formats
  const { pages, isMultiPage } = useMemo(() => {
    // Check if it's the new multi-page format
    if (fields && typeof fields === 'object' && !Array.isArray(fields) && fields.pages) {
      return {
        pages: fields.pages,
        isMultiPage: true,
      };
    }
    // Old format: array of fields (single page)
    return {
      pages: [{ title: '', fields: Array.isArray(fields) ? fields : [] }],
      isMultiPage: false,
    };
  }, [fields]);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = pages[currentPageIndex] || pages[0];
  const currentFields = currentPage?.fields || [];

  const handleNext = async () => {
    if (currentPageIndex < pages.length - 1) {
      if (validateOnPageChange) {
        // Validate only fields on current page
        const fieldNames = currentFields.map((field) => field.name);
        const isValid = await methods.trigger(fieldNames);
        if (!isValid) {
          return; // Don't proceed if validation fails
        }
      }
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const canGoNext = currentPageIndex < pages.length - 1;
  const canGoPrevious = currentPageIndex > 0;

  return (
    <div className="space-y-4">
      {/* Page Title (only show for multi-page forms) */}
      {isMultiPage && currentPage.title && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{currentPage.title}</h2>
          {currentPage.description && (
            <p className="text-sm text-gray-600 mt-1">{currentPage.description}</p>
          )}
        </div>
      )}

      {/* Page Indicator (only show for multi-page forms) */}
      {isMultiPage && pages.length > 1 && (
        <div className="mb-4 flex items-center gap-2">
          {pages.map((page, index) => (
            <React.Fragment key={index}>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index === currentPageIndex
                    ? 'bg-blue-600 text-white'
                    : index < currentPageIndex
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              {index < pages.length - 1 && (
                <div
                  className={`h-1 flex-1 ${
                    index < currentPageIndex ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-4">
        {currentFields.map((field) => {
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

      {/* Navigation Buttons (only show for multi-page forms) */}
      {isMultiPage && pages.length > 1 && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className={`px-4 py-2 rounded ${
              canGoPrevious
                ? 'bg-gray-600 text-white hover:bg-gray-700 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPageIndex + 1} of {pages.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext}
            className={`px-4 py-2 rounded ${
              canGoNext
                ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

FormJsonRenderer.propTypes = {
  fields: PropTypes.oneOfType([
    // Single-page format: array of fields
    PropTypes.arrayOf(
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
    ),
    // Multi-page format: object with pages array
    PropTypes.shape({
      pages: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
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
        }),
      ).isRequired,
    }),
  ]).isRequired,
  methods: PropTypes.shape({
    control: PropTypes.object.isRequired,
    trigger: PropTypes.func.isRequired,
  }).isRequired,
  validateOnPageChange: PropTypes.bool,
};

FormJsonRenderer.defaultProps = {
  validateOnPageChange: true,
};

export default FormJsonRenderer;

