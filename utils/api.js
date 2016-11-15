import axios from 'axios';
// const host = 'http://10.0.2.2:3000';  // local server
export const host = 'http://testmobimall2.herokuapp.com'; // heroku server
// export const host = 'http://192.168.1.244:3000' // server to use when running on physical device;
const createUrl = pathArray => `${host ? host : ''}/api/${pathArray.join('/')}`;

const createRequest = (pathArray, data) => axios({
  method: 'post',
  url: createUrl(pathArray),
  data
});

const api = {
  getCards (fbId) {
    return createRequest(['users', 'getCards'], { fbId });
  },

  saveCard (fbId, cardToken, name) {
    return createRequest(['users', 'saveCard'], { fbId, cardToken, name });
  },

  createUser (profileData) {
    return createRequest(['users', 'createUser'], profileData);
  },

  getPersonalInfo (fbId) {
    return createRequest(['users', 'getPersonalInfo'], { fbId });
  },

  updatePersonalInfo (fbId, user) {
    return createRequest(['users', 'updatePersonalInfo'], { fbId, user });
  },

  getAddresses (fbId) {
    return createRequest(['users', 'getAddresses'], { fbId });
  },

  saveAddresses (fbId, addresses) {
    return createRequest(['users', 'saveAddresses'], { fbId, addresses });
  },

  saveBankAccountData(fbId, bankAccountData) {
    return createRequest(['users', 'saveBankAccountData'], { fbId, bankAccountData });
  },

  loginInstagram (fbId, login, pass) {
    return createRequest(['users', 'loginInstagram'], { fbId, login, pass });
  },

  getBuyerAddresses (fbId) {
    return createRequest(['users', 'getBuyerAddresses'], { fbId });
  },

  saveBuyerAddresses (fbId, buyerAddresses) {
    return createRequest(['users', 'saveBuyerAddresses'], { fbId, buyerAddresses });
  },

  deleteCard (fbId, cardId) {
    return createRequest(['users', 'deleteCard'], { fbId, cardId });
  },

  checkNewProduct (fbId, productInfo) {
    return createRequest(['users', 'checkNewProduct'], { fbId, productInfo });
  },

  addNewProduct (fbId, productInfo) {
    return createRequest(['users', 'addNewProduct'], { fbId, productInfo });
  },

  getBankAccountData (fbId) {
    return createRequest(['users', 'getBankAccountData'], { fbId });
  },

  checkOpenTransaction (fbId) {
    return createRequest(['users', 'checkOpenTransaction'], { fbId });
  },

  transactionProductList (fbId) {
    return createRequest(['users', 'transactionProductList'], { fbId });
  },

  acceptProductList (fbId, transaction ) {
    return createRequest(['users', 'acceptProductList'], { fbId, transaction });
  },

  saveUserType (fbId, type ) {
    return createRequest(['users', 'saveUserType'], { fbId, type });
  },

  removeUser (fbId ) {
    return createRequest(['users', 'removeUser'], { fbId });
  },

  getTokenMark () {
    return createRequest(['access', 'getToken']);
  },

  updatePersonalStore ( fbId, store ) {
    return createRequest(['users', 'updatePersonalStore'], { fbId, store });
  },

  getSellerDashboard ( fbId ) {
    return createRequest(['users', 'getSellerDashboard'], { fbId });
  },

  bodyAddNewProduct( fbId, productInfo ) {

    // let request = new XMLHttpRequest();
    let formdata = new FormData();

    formdata.append('fbId', fbId);
    
    Object.entries( productInfo ).map(item => {
      formdata.append(item[0], item[1]);
    });

    // console.log(formdata);

    return fetch( createUrl(['users', 'addNewProduct']), {
    // return fetch( 'http://192.168.1.244:3000/upload', {
      method: 'POST',
      body: formdata
    } );
  }


  
}

export default api;
