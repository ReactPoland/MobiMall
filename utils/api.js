import axios from 'axios';
// const host = 'http://192.168.1.244:3000';  // local server
const host = 'http://testmobimall2.herokuapp.com'; // heroku server
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

  saveAddresses (fbId, addresses) {
    return createRequest(['users', 'saveAddresses'], { fbId, addresses });
  },

  loginInstagram (fbId, login, pass) {
    return createRequest(['users', 'loginInstagram'], { fbId, login, pass });
  }
}

export default api;
