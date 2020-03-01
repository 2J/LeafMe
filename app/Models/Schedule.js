export default class Schedule {
  constructor() {

  };  

  static async getSchedule() {
    const url = 'https://leafme.jj.ai/plant/1/schedules';
    return fetch(url).then( response => {
      return response.json();
    });
  }

  static async createWaterSchedule(schedule) {
    const url = 'https://leafme.jj.ai/plant/1/schedules/water/create';
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
    const url = 'https://leafme.jj.ai/plant/1/schedules/water/delete/' + scheduleId;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(scheduleId)
    }).then(  response => {    
      return response;
    });
  }

  static async createLightingSchedule(schedule) {
    const url = 'https://leafme.jj.ai/plant/1/schedules/light/create';
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
    const url = 'https://leafme.jj.ai/plant/1/schedules/light/delete/' + scheduleId;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then( response => {
      return response.json();
    });
  }

  static async waterNow(amount) {
    const url ='https://leafme.jj.ai/plant/1/manual/water'
    return fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({amount: amount})
    }).then( response => 
      response.json());
  }

  static async toggleLight() {
    const url ='https://leafme.jj.ai/plant/1/manual/light'
    return fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }
    }).then( response => 
      response.json());
  }

}
