import axios from 'axios';
// const host = 'http://10.0.2.2:3000';  // local server
// const host = 'http://testmobimall2.herokuapp.com'; // heroku server
const host = 'http://192.168.1.244:3000' // server to use when running on physical device;
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

  saveCard (fbId, cardToken) {
    return createRequest(['users', 'saveCard'], { fbId, cardToken });
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
  }
}

export default api;
