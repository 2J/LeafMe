export default class Sensors {
  constructor() {

  };  

  static async getSensors() {
    let url = 'https://leafme.jj.ai/plant/1/sensors';
    return fetch(url).then( response => response.json());
  }
}
