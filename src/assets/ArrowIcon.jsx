import PropTypes from 'prop-types';

ArrowIcon.propTypes = {
  stroke: PropTypes.string,
  width: PropTypes.string,
};

function ArrowIcon({ stroke, width }) {
  return (
    <svg width={width} viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.2551 18.7449C0.945888 18.4357 0.917777 17.9518 1.17077 17.6109L1.2551 17.5132L8.76787 10L1.2551 2.48684C0.945887 2.17762 0.917777 1.69375 1.17077 1.35279L1.2551 1.2551C1.56431 0.945888 2.04818 0.917778 2.38915 1.17077L2.48683 1.2551L10.6159 9.38413C10.9251 9.69335 10.9532 10.1772 10.7002 10.5182L10.6159 10.6159L2.48683 18.7449C2.1467 19.085 1.59523 19.085 1.2551 18.7449Z"
        fill={stroke}
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
}

export default ArrowIcon;
