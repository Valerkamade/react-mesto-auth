export const BASE_URL = 'https://auth.nomoreparties.co';

function isOk(res) {
  if (res.ok) {
    return res.json();
  }
  // return Promise.reject(`Что-то где-то пошло не так... Код ошибки ${res.status}`);
  
  return Promise.reject(res.json().then(res => {return res}));
  // return res.json().then(res => res.error)
  // return res.text().then(text => {throw JSON.parse(text).message})
}

export function register({ password, email }) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(isOk)
    .then((res) => {
      return res;
    })
    // .catch((err) => console.log(err));
};
export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response => response.json()))
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      return data;
    })
    .catch(err => console.log(err))
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then(data => data)
}