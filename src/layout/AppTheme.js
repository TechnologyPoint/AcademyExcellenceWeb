import * as React from 'react';
import PropTypes from 'prop-types';

export default function AppTheme(props) {
  const { children } = props;

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}

AppTheme.propTypes = {
  children: PropTypes.element.isRequired,
};
