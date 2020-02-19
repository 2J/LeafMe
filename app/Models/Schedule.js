export default class Schedule {
  constructor() {

  };  

  static async getSchedule() {
    let url = 'https://leafme.jj.ai/plant/1/schedules';
    return fetch(url).then( response => {
      return response.json();
    });
  }

  static async createWaterSchedule(schedule) {
    let url = 'https://leafme.jj.ai/plant/1/schedules/water/create';
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(schedule)
    }).then( response => {
      return response.json();
    });
  }

  static async deleteWaterSchedule(scheduleId) {
    let url = 'https://leafme.jj.ai/plant/1/schedules/water/delete/' + scheduleId;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(scheduleId)
    }).then(  response => {      
      return response.json();
    });
  }

  static async createLightingSchedule(schedule) {
    let url = 'https://leafme.jj.ai/plant/1/schedules/light/create';
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(schedule)
    }).then( response => 
      response.json());
  }

  static async deleteLightingSchedule(scheduleId) {
    let url = 'https://leafme.jj.ai/plant/1/schedules/light/delete/' + scheduleId;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(scheduleId)
    }).then( response => 
      response.json());
  }

}
