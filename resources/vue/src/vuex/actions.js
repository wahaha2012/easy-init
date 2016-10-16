import 'whatwg-fetch';
import RequestConfig from './requestConfig';

const _get = (requestOptions) => {
  let _url = RequestConfig.getURL(requestOptions);

  return fetch(_url, {
  }).then((res) => {
      if(res.status >= 200){
        return res.json();
      }

      return Promise.reject(new Error(res.status));
    })
}

const _post = (requestOptions, params) => {
  let _url = RequestConfig.getURL(requestOptions);
  return fetch(_url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    }
    return Promise.reject(new Error(res.status));
  });
};


export const fetchIndex = ({ dispatch }) => {
  return _get({url: 'index'})
    .then((json) => {
      if(json.success) {
        return dispatch('FETCH_INDEX_SUCCESS', json.data);
      }

      return Promise.reject(new Error('fetch index failed'))
    })
    .catch((error) => {
      dispatch('FETCH_INDEX_FAILURE');
      return Promise.reject(error);
    })
}


export const setTitle = ({ dispatch }, title) => {
  return dispatch('UPDATE_TITLE', title);
}
