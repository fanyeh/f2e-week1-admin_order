import React, { Component } from 'react';
import firebase from '../firebase';
import ProductForm from './ProductForm';
import { dataURLtoFile, formDataToObject } from '../components/helpers';
class NewProduct extends Component {
  static defaultProps = {
    handler: () => {},
  };

  uploadImage = (productID, images) => {
    images.forEach((image, index) => {
      const fileName = `${index + 1}.${image.extension}`;
      const file = dataURLtoFile(image.src, fileName);
      const storageRef = firebase.storage().ref();
      storageRef
        .child(`images/products/${productID}/${file.name}`)
        .put(file)
        .then(snapshot => {
          console.log('Uploaded a data_url string!');
          console.log(snapshot);
        });
    });
  };

  uploadData = ({ images, desc, specs, isDraft }) => {
    const descData = { ...formDataToObject(desc), isDraft };
    const specsData = specs.map(spec => formDataToObject(spec.ref));
    const database = firebase.database();
    database
      .ref('products/')
      .push(descData)
      .then(snapshot => {
        const productID = snapshot.key;
        // const specsToUpload = ;
        Promise.all(
          specsData.map(specData => {
            const { size, color, inventory } = specData;
            return database.ref(`specs/${productID}/${size}`).push({ color, inventory });
          }),
        ).then(response => {
          this.props.handler();
          // this.uploadImage(productID, images);
        });
      });
  };

  publishHandler = data => {
    this.uploadData({ ...data, isDraft: false });
  };

  draftHandler = data => {
    this.uploadData({ ...data, isDraft: true });
  };

  childProps = () => {
    return {
      publishHandler: this.publishHandler,
      draftHandler: this.draftHandler,
      closeHandler: this.props.handler,
    };
  };

  render() {
    return <ProductForm {...this.childProps()} />;
  }
}

export default NewProduct;
