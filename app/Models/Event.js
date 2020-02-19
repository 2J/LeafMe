export default class Event {
    constructor() {
  
    };  
  
    static async getEvent() {
      let url = 'https://leafme.jj.ai/plant/1/events';
      return fetch(url).then( response => response.json());
    }
  }
  