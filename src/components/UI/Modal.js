import React from 'react';
import ReactDom from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalDestination = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onClick={props.onClick} />,
        portalDestination
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalDestination
      )}
    </>
  );
};

export default Modal;
