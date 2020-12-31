import React from 'react';

import './custom-buttom.styles.scss';

const CustomButton = ({ children, isGoogleButton, ...otherProps }) => (
  <button className={` ${isGoogleButton ? 'google-sign-in' : ''}  custom-button`} {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
