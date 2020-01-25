/*****
 * This file holds the dropdown labels for the Add Schedule form
 * This allows the Add schedule Form to be used for both watering
 * and lighting schedules without wrapping all the labels in if statements
 * based on where ithe modal is being rendered
 * 
 * Data for the select dropdowns also go here, to avoid cluttering the form file
 ****/

export const LIGHTINGLABELS = {
  unitLabel: "Duration",
  units: "hrs",
  unitsSelect: 'Duration to keep lights on',
  unitsPlaceholder: "Number of hours",
  unitsData: [{
    value: 1,
  }, {
    value: 2,
  }, {
    value: 3,
  }, {
    value: 4,
  }, {
    value: 5,
  }, {
    value: 6,
  }, {
    value: 7,
  }, {
    value: 8,
  }, {
    value: 9,
  }, {
    value: 10,
  }, {
    value: 11,
  }, {
    value: 12,
  }, {
    value: 13,
  }, {
    value: 14,
  }, {
    value: 15,
  }, {
    value: 16,
  }, {
    value: 17,
  }, {
    value: 18,
  }, {
    value: 19,
  }, {
    value: 20,
  }, {
    value: 21,
  }, {
    value: 22,
  }, {
    value: 23,
  }, {
    value: 24,
  }], //TODO: does it make sense to leave the light on for 24 hours a day 
  repeatSelect: "Turn light on every ____ days",
  repeatPlaceholder: "Number of days",
  repeatData: [{
    value: 1,
  }, {
    value: 2,
  }, {
    value: 3,
  }, {
    value: 4,
  }, {
    value: 5,
  }, {
    value: 6,
  }, {
    value: 7,
  }], //TODO: what should the limit for this be? are there plants that need this little light
  startSelect: "Select a date to start lighting",
  endSelect: "Select a date to end lighting",
}

export const WATERINGLABELS = {
  unitLabel: "Amount",
  units: "ml",
  unitsSelect: "Amount to water",
  unitsPlaceholder: "Amount (ml)",
  unitsData: [{
    value: 10,
  }, {
    value: 20,
  }, {
    value: 30,
  }, {
    value: 40,
  }, {
    value: 50,
  }, {
    value: 60,
  }, {
    value: 70,
  }, {
    value: 80,
  }, {
    value: 90,
  }, {
    value: 100,
  }, {
    value: 110,
  }, {
    value: 120,
  }, {
    value: 130,
  }, {
    value: 140,
  }, {
    value: 150,
  }, {
    value: 160,
  }, {
    value: 170,
  }, {
    value: 180,
  }, {
    value: 190,
  }, {
    value: 200,
  }], //TODO: what should the limit for this be? will plants ever need this much water? 
  repeatSelect: "Water every",
  repeatPlaceholder: "Number of days",
  repeatData: [{
    value: 1,
  }, {
    value: 2,
  }, {
    value: 3,
  }, {
    value: 4,
  }, {
    value: 5,
  }, {
    value: 6,
  }, {
    value: 7,
  }], //TODO: what should the limit for this be? are there plants that need this little water
  startSelect: "Select a date to start watering",
  endSelect: "Select a date to end watering" 
}