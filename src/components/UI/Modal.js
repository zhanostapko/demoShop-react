import React, { Component, createRef } from 'react';
import Backdrop from './Backdrop';
import Button from './Button';
// Styles
import classes from './Modal.module.css';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
  }

  modalClose = (e) => {
    if (e.path[0] !== this.modalRef.current) {
      return this.props.modalClose();
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.modalClose);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.modalClose);
  }
  render() {
    return (
      <Backdrop className={this.props.className} open={this.props.modalOpen}>
        <div ref={this.modalRef} className={classes.modal}>
          {this.props.title}
          <Button onClick={this.props.modalClose} title="close" />
        </div>
      </Backdrop>
    );
  }
}
