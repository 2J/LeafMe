export default class Plant {
  constructor() {

  };  

  static async getPlant() {
    let url = 'https://leafme.jj.ai/plant/1';
    return fetch(url).then( response => {
      return response.json();
    });
  }

  static async updatePlant(name) {
    let url = 'https://leafme.jj.ai/plant/1';
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(name)
    }).then( response => {
      return response.json();
    });
  }

}
