import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Text from '@components/ui/Text';
import styled from 'styled-components';

const InputContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
`;

const LabelStyle = styled.label`
  margin-bottom: 5px;
  display: block;
`;

const InputStyle = styled.input`
  width: calc(100% - 2px);
  border-radius: 6px;
  padding: ${(props) => (props.type == 'date' ? '7.5px 12px 8px 12px' : '10px 12px 9px 12px')};
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

const ErrorMessageStyle = styled.div`
  position: absolute;
  bottom: -27px;
  left: 2px;
`;

const Input = forwardRef(({ id, name, label, type, placeholder, error, ...rest }, ref) => {
  const errorBoxshadow = error ? '0 0 4px 4px rgba(255, 107, 0, 0.7)' : 'none';

  return (
    <InputContainerStyle>
      <div>
        {label && (
          <LabelStyle htmlFor={id}>
            <Text typography="semibold_s" display="block" color="gray08">
              {label}
            </Text>
          </LabelStyle>
        )}
        <InputStyle id={id} name={name} aria-label={label} type={type} placeholder={placeholder} ref={ref} {...rest} style={{ boxShadow: errorBoxshadow }} />
      </div>
      {error && (
        <ErrorMessageStyle>
          <Text color="primary01" display="block" typography="bold_s">
            {error}
          </Text>
        </ErrorMessageStyle>
      )}
    </InputContainerStyle>
  );
});

Input.propTypes = {
  id: PropTypes.string.isRequired,
  typography: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  labelInside: PropTypes.string,
};

Input.displayName = 'Input';

export default Input;
