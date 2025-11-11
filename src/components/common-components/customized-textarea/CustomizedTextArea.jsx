import React from 'react';
import PropTypes from 'prop-types';

const CustomizedTextArea = ({
  rhfField = {},
  placeholder = 'Type here...',
  value,
  onChange,
  width = '100%',
  height = '40px',
  maxLength
}) => (
  <textarea
    className="border border-gray-300 outline-none resize-none p-2 rounded-lg box-border focus:border-[#259566] text-sm"
    rows={3}
    maxLength={maxLength}
    placeholder={placeholder}
    value={value}
    style={{
      width,
      height,
      overflow: 'auto',
    }}
    onInput={(e) => {
      e.target.style.height = height;
      e.target.style.height = `${e.target.scrollHeight}px`;
    }}
    onChange={onChange}
    {...rhfField}
  />
);

CustomizedTextArea.propTypes = {
  rhfField: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
};

CustomizedTextArea.defaultProps = {
  rhfField: {},
  placeholder: 'Type here...',
  value: '',
  onChange: () => {},
  width: '100%',
  height: '40px',
};

export default CustomizedTextArea;

