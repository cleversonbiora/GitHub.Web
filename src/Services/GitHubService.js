export const API_URL = "http://localhost:52950/api";

export function ListTop(language, qtd){
    return fetch(`${API_URL}/Repository/ListTop?language=${encodeURIComponent(language)}&qtd=${qtd}`, { 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then(response => response.json());
}

export function GetById(id){
  return fetch(`${API_URL}/Repository/${id}`, { 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
  .then(response => response.json());
}