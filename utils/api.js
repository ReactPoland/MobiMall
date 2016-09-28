import axios from 'axios';
const host = 'http://10.0.2.2:3000';
const prependHost = path => `${host ? host : ''}${path}`;

const api = {
  getCards (fbId) {
    return axios({
      method: 'post',
      url: prependHost('/api/users/getCards'),
      data: {
        fbId
      }
    });
  },
  saveCard (fbId, cardToken) {
    return axios({
      method: 'post',
      url: prependHost('/api/users/saveCard'),
      data: {
        fbId,
        cardToken
      }
    });
  },
  createUser (profileData) {
    return axios({
      method: 'post',
      url: prependHost('/api/users/createUser'),
      data: profileData
    });
  }
}

export default api;
