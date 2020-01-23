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
  repeatSelect: "Turn light on every ____ days",
  repeatPlaceholder: "Number of days",
  startSelect: "Select a date to start lighting",
  timeSelect: "Select a time to turn the light on",
  endSelect: "Select a date to end lighting",
}

export const WATERINGLABELS = {
  unitLabel: "Amount",
  units: "ml",
  unitsSelect: "Amount to water",
  unitsPlaceholder: "Amount (ml)",
  repeatSelect: "Water every",
  repeatPlaceholder: "Number of days",
  startSelect: "Select a date to start watering",
  timeSelect: "Select a time to water",
  endSelect: "Select a date to end watering" 
}