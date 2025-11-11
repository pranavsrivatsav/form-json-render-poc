import { MenuItem, Select, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import CustomizedTextArea from '../common-components/customized-textarea/CustomizedTextArea';
import CustomizedTextField from '../common-components/customized-textfield/CustomizedTextField';

export const TextInput = ({ rhfField, rhfFieldState, label, maxLength }) => (
  <>
    <div className="flex flex-row items-center gap-2 w-full">
      <div className="min-w-[8rem] flex-shrink-0">
        <Typography variant="body2" className="!text-[#666666]">
          {label}
        </Typography>
      </div>
      <div className="flex-1 max-w-[20rem]">
        <CustomizedTextField
          {...rhfField}
          {...rhfFieldState}
          className="w-full"
          sx={{
            '.MuiInputLabel-root': {
              fontFamily: "'graphik', sans-serif",
              fontSize: '13px',
              lineHeight: '12px',
            },
            '& .MuiOutlinedInput-root': {
              fontFamily: "'graphik', sans-serif",
              fontSize: '13px',
              height: '35px',
              '&.Mui-focused fieldset': {
                borderColor: '#259566',
                borderWidth: '2px',
              },
            },
          }}
          id="outlined-basic"
          variant="outlined"
          color="primary"
          maxLength={maxLength}
        />
      </div>
    </div>

    {/* Error message */}
    {rhfFieldState.error && (
      <div className="flex flex-row items-center gap-2 w-full">
        {/* Dummy label to keep the layout consistent - and show the error message under the input */}
        <div className="min-w-[8rem] flex-shrink-0">
          <Typography variant="body2" className="!text-[#666666] invisible">
            {label}
          </Typography>
        </div>
        <div className="flex-1 max-w-[20rem]">
          <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-600">
            {rhfFieldState.error.message}
          </p>
        </div>
      </div>
    )}
  </>
);

TextInput.propTypes = {
  rhfField: PropTypes.object.isRequired,
  rhfFieldState: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export const SelectInput = ({ rhfField, rhfFieldState, options, label }) => (
  <>
    <div className="flex flex-row items-center gap-2 w-full">
      <div className="min-w-[8rem] flex-shrink-0">
        <Typography variant="body2" className="!text-[#666666]">
          {label}
        </Typography>
      </div>
      <div className="w-auto">
        <Select fullWidth className="h-[35px] !text-[#666666]" {...rhfField} {...rhfFieldState}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.display}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>

    {/* Error message */}
    {rhfFieldState.error && (
      <div className="flex flex-row items-center gap-2 w-full">
        {/* Dummy label to keep the layout consistent - and show the error message under the input */}
        <div className="min-w-[8rem] flex-shrink-0">
          <Typography variant="body2" className="!text-[#666666] invisible">
            {label}
          </Typography>
        </div>
        <div className="w-auto">
          <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-600">
            {rhfFieldState.error.message}
          </p>
        </div>
      </div>
    )}
  </>
);

SelectInput.propTypes = {
  rhfField: PropTypes.object.isRequired,
  rhfFieldState: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      display: PropTypes.string.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
};

export const TextAreaInput = ({ rhfField, rhfFieldState, label, maxLength }) => (
  <>
    <div className="flex flex-row gap-2 w-full">
      <div className="min-w-[8rem] flex-shrink-0 pt-[0.600rem]">
        <Typography variant="body2" className="!text-[#666666]">
          {label}
        </Typography>
      </div>
      <div className="flex-1">
        <CustomizedTextArea {...rhfField} {...rhfFieldState} maxLength={maxLength} />
      </div>
    </div>

    {/* Error message */}
    {rhfFieldState.error && (
      <div className="flex flex-row gap-2 w-full">
        {/* Dummy label to keep the layout consistent - and show the error message under the input */}
        <div className="min-w-[8rem] flex-shrink-0 pt-[0.600rem]">
          <Typography variant="body2" className="!text-[#666666] invisible">
            {label}
          </Typography>
        </div>
        <div className="flex-1">
          <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-600">
            {rhfFieldState.error.message}
          </p>
        </div>
      </div>
    )}
  </>
);

TextAreaInput.propTypes = {
  rhfField: PropTypes.object.isRequired,
  rhfFieldState: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

