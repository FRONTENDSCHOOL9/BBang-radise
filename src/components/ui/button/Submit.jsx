import Button from '@components/ui/button/Button';
import PropTypes from 'prop-types';

Submit.propTypes = {
  children: PropTypes.any.isRequired,
};

function Submit({ children, ...rest }) {
  return (
    <Button type="submit" {...rest}>
      {children}
    </Button>
  );
}

export default Submit;
