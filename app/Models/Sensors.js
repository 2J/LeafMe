export default class Sensors {
  constructor() {

  };  

  static async getSensors() { //For overview
    let url = 'https://leafme.jj.ai/plant/1/sensors';
    return fetch(url).then( response => response.json());
  }

  //Below here is metrics data
  static async getSoilMoistureHistory() { 
    let url = 'https://leafme.jj.ai/plant/1/sensors/history/SOIL_MOISTURE';
    return fetch(url).then( response => response.json());
  }

  static async getBrightnessHistory() { 
    let url = 'https://leafme.jj.ai/plant/1/sensors/history/BRIGHTNESS';
    return fetch(url).then( response => response.json());
  }

  static async getTemperatureHistory() { 
    let url = 'https://leafme.jj.ai/plant/1/sensors/history/AMBIENT_TEMPERATURE';
    return fetch(url).then( response => response.json());
  }

  static async getHumidityHistory() { 
    let url = 'https://leafme.jj.ai/plant/1/sensors/history/AMBIENT_HUMIDITY';
    return fetch(url).then( response => response.json());
  }
}
