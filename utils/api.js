import axios from 'axios';
const host = 'http://10.0.2.2:3000';  // localDb
// const host = 'http://testmobimall2.herokuapp.com';
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

  saveAddress (fbId, address, type) {
    return createRequest(['users', 'saveAddress'], { fbId, address, type });
  }
}

export default api;
