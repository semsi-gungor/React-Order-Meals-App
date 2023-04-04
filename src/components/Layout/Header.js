import React from 'react';
import HeaderCartButton from './HeaderCartButton';

import classes from './Header.module.css';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onCartShown} />
      </header>
      <div className={classes['main-image']}>
        <img
          src="https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg"
          alt="table"
        />
      </div>
    </React.Fragment>
  );
};

export default Header;
