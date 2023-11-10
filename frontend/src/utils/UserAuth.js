
export const BASE_URL = 'https://api.nevada.nomoredomainsrocks.ru'
function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
} 

export const register = (email, password) => {

  return fetch(`${BASE_URL}/signup` ,{
    method: 'POST',
      headers: {
    "Content-Type": "application/json",
  },
    body: JSON.stringify({email, password})
  })
  .then(getResponse) 
}  

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin` ,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
  })
  .then(getResponse)
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(getResponse)
} 
