export default class Schedule {
  constructor() {

  };  

  static async getSchedule() {
    let url = 'https://leafme.jj.ai/test_schedules';
    return fetch(url).then( response => 
      response.json());
  }
}
