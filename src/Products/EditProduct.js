import React, { Component } from 'react';
import firebase from '../firebase';
import Product from './Product';
// import { dataURLtoFile, formDataToObject } from './helpers';
class EditProduct extends Component {
  async componentDidMount() {
    const id = '-LFPBtNzLiRm2O49HUe8';
    const descData = await firebase
      .database()
      .ref(`products/${id}/`)
      .once('value');

    const specData = await firebase
      .database()
      .ref(`specs/${id}/`)
      .once('value');

    this.setState({ desc: descData.val(), spec: specData.val() });
  }
  updatePublishHandler = () => {};
  updateDraftHandler = () => {};

  childProps = () => {
    return {
      publishHandler: this.updatePublishHandler,
      draftHandler: this.updateDraftHandler,
      product: { ...this.state },
    };
  };

  render() {
    return <Product {...this.childProps()} />;
  }
}

export default EditProduct;
