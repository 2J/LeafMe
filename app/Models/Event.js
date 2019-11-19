export default class Event {
    constructor() {
  
    };  
  
    static async getEvent() {
      let url = 'https://leafme.jj.ai/test_events';
      return fetch(url).then( response => response.json());
    }
  }
  