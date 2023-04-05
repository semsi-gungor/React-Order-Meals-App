import React, { useContext, useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";

import CartContext from "../../store/cart-context";

import classes from "./HeaderCardButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const [btnHighlighted, setBtnHighlighted] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const buttonClases = `${classes.button} ${btnHighlighted && classes.bump}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) return;

    setBtnHighlighted(true);

    const timer = setTimeout(() => {
      setBtnHighlighted(false);
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={buttonClases} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
