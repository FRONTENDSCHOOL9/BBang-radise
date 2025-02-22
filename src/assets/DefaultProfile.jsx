import PropTypes from 'prop-types';

DefaultProfile.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function DefaultProfile({ fill, stroke, width }) {
  return (
    <svg width={String(width)} height={String(width)} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 12C25 18.6274 19.4036 24 12.5 24C5.59644 24 0 18.6274 0 12C0 5.37258 5.59644 0 12.5 0C19.4036 0 25 5.37258 25 12Z" fill={fill} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 23.4074C19.0626 23.4074 24.3827 18.3001 24.3827 12C24.3827 5.69986 19.0626 0.592593 12.5 0.592593C5.93736 0.592593 0.617284 5.69986 0.617284 12C0.617284 18.3001 5.93736 23.4074 12.5 23.4074ZM12.5 24C19.4036 24 25 18.6274 25 12C25 5.37258 19.4036 0 12.5 0C5.59644 0 0 5.37258 0 12C0 18.6274 5.59644 24 12.5 24Z"
        fill={stroke}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 13.4074C14.7479 13.4074 16.5702 11.658 16.5702 9.5C16.5702 7.342 14.7479 5.59259 12.5 5.59259C10.2521 5.59259 8.42978 7.342 8.42978 9.5C8.42978 11.658 10.2521 13.4074 12.5 13.4074ZM12.5 14C15.0888 14 17.1875 11.9853 17.1875 9.5C17.1875 7.01472 15.0888 5 12.5 5C9.91116 5 7.8125 7.01472 7.8125 9.5C7.8125 11.9853 9.91116 14 12.5 14Z"
        fill={stroke}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.61646 19.3478C4.77536 16.7221 8.39671 15 12.4999 15C16.6031 15 20.2244 16.7221 22.3833 19.3478C22.2534 19.5086 22.1193 19.6661 21.9812 19.8203C19.9619 17.2882 16.499 15.5926 12.4999 15.5926C8.50079 15.5926 5.03792 17.2882 3.01855 19.8203C2.88045 19.6661 2.74637 19.5086 2.61646 19.3478Z"
        fill={stroke}
      />
    </svg>
  );
}

export default DefaultProfile;
