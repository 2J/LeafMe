export default class Presets {
  constructor() {

  };  

  static async getSpecies(type) {
    let url = 'https://leafme.jj.ai/presets/type/' + type;
    return fetch(url).then( response => {
      return response.json();
    });
  }

}
