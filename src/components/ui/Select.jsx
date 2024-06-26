import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Text from '@components/ui/Text';
import styled from 'styled-components';

const SelectContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const LabelStyle = styled.label`
  margin-bottom: 5px;
  display: block;
`;

const SelectStyle = styled.select`
  width: calc(100% - 2px);
  border-radius: 6px;
  padding: 10.5px 12px 10px 12px;
  margin-left: 1px;
  font-family: pretendard, sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 1.4rem;
  line-height: 1.5;
  color: var(--gray-08);
  outline: var(--gray-06) solid 1px;
  border: none;

  &:focus,
  &:hover {
    outline: var(--primary-01) solid 2px;
    border: none;
  }

  &::placeholder {
    color: var(--gray-05);
    font-weight: 400;
  }
`;

const Select = forwardRef(({ id, onChange, onBlur, name, label, placeholder, optionData, ...rest }, ref) => {
  return (
    <SelectContainerStyle>
      <LabelStyle htmlFor={id}>
        <Text typography="semibold_s" display="block" color="gray08">
          {label}
        </Text>
      </LabelStyle>
      <SelectStyle id={id} name={name} aria-label={label} defaultValue="" ref={ref} onChange={onChange} onBlur={onBlur} placeholder={placeholder} {...rest}>
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {optionData?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectStyle>
    </SelectContainerStyle>
  );
});

Select.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  optionData: PropTypes.arrayOf(PropTypes.object),
};

Select.displayName = 'Select';

export default Select;
