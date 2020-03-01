export default class Account {
  constructor() {

  };  

  static async toggleMode(mode) {
    const url = 'https://leafme.jj.ai/plant/1/manual/mode';
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({manual: mode})
    }).then( response => {
      return response.json();
    });
  }
}
