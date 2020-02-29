# LeafMe API

[**Up to date Postman Collection URL**](https://www.postman.com/collections/c6f4d4b5c1d5295434ad?fbclid=IwAR0_vRAADSIVirLYfEeMXPF9TxGjILXYZVoc5-x1W9779TXLgMhPpSttrks)

## Build image

```
$ make build
```

## Run

```
$ make tag
$ make run
```

## Push image
```
$ make push
```


## TODO

- [Add endpoint for creating/deleting a single event](https://trello.com/c/IABBfqke/41-add-endpoint-for-creating-deleting-a-single-event-used-for-manual-lighting-watering)

- [Add endpoint for setting plant light status](https://trello.com/c/9tiAddYd/42-add-endpoint-for-setting-plant-light-status)

- [Sending push notifications when needed](https://trello.com/c/zvirVeCR/45-send-push-notifications-from-api-when-needed)

## BUGS

- Deleting resources returns {success: true} even if resource doesn't exist

- Getting batch of resources by a parent ID (e.g. getting events by plant ID) returns blank array if parent doesn't exist

# API Endpoints

## Plants

### Get Plant

Gets the plant name, mode, manual light/water status

```
<<<<<<< HEAD
GET https://leafme.jj.ai/plant/{{plantID}}
=======
GET https://leafme.jj.ai/plant/{{plantId}}
>>>>>>> c15b79351baf947021895c44236c273f6891297a
```

### Update Plant Name

```
<<<<<<< HEAD
POST https://leafme.jj.ai/plant/{{plantID}}
=======
POST https://leafme.jj.ai/plant/{{plantId}}
>>>>>>> c15b79351baf947021895c44236c273f6891297a

example payload: 

    {"name":"SOME PLANT NAME"}
```

### Update Plant Manual Mode

```
<<<<<<< HEAD
POST https://leafme.jj.ai/plant/{{plantID}}/manual/mode
=======
POST https://leafme.jj.ai/plant/{{plantId}}/manual/mode
>>>>>>> c15b79351baf947021895c44236c273f6891297a

example payload: 

    {"manual":true}
```

#### Toggle Plant Manual Light Status

```
<<<<<<< HEAD
POST https://leafme.jj.ai/plant/{{plantID}}/manual/light
=======
POST https://leafme.jj.ai/plant/{{plantId}}/manual/light
>>>>>>> c15b79351baf947021895c44236c273f6891297a

(no payload needed)
```

#### Update Plant Manual Water Amount

```
<<<<<<< HEAD
POST https://leafme.jj.ai/plant/{{plantID}}/manual/water
=======
POST https://leafme.jj.ai/plant/{{plantId}}/manual/water
>>>>>>> c15b79351baf947021895c44236c273f6891297a

example payload: 

    {"amount":100}
```

## Schedules

### Get All Schedules

```
<<<<<<< HEAD
GET https://leafme.jj.ai/plant/{{plantID}}/schedules
```

- plantID: int
=======
GET https://leafme.jj.ai/plant/{{plantId}}/schedules
```

- plantId: int
>>>>>>> c15b79351baf947021895c44236c273f6891297a

### Get Individual Light / Water Schedule

```
LIGHT

<<<<<<< HEAD
GET https://leafme.jj.ai/plant/{{plantID}}/schedules/light/{{scheduleID}}
- plantID: int
- scheduleID: int

WATER

GET https://leafme.jj.ai/plant/{{plantID}}/schedules/water/{{scheduleID}}
- plantID: int
- scheduleID: int
=======
GET https://leafme.jj.ai/plant/{{plantId}}/schedules/light/{{scheduleId}}
- plantId: int
- scheduleId: int

WATER

GET https://leafme.jj.ai/plant/{{plantId}}/schedules/water/{{scheduleId}}
- plantId: int
- scheduleId: int
>>>>>>> c15b79351baf947021895c44236c273f6891297a
```

### Create Light / Water Schedule

```
LIGHT
<<<<<<< HEAD
POST https://leafme.jj.ai/plant/{{plantID}}/schedules/light/create
- plantID: int
=======
POST https://leafme.jj.ai/plant/{{plantId}}/schedules/light/create
- plantId: int
>>>>>>> c15b79351baf947021895c44236c273f6891297a

example payload: 

        {
            "schedule": {
                "time": "2020-01-13T12:00:00Z",
                "repeat_days": 6,
                "repeat_end_date": "2020-05-12T12:00:00Z"
            },
            "length": 180
        }

WATER
<<<<<<< HEAD
POST https://leafme.jj.ai/plant/{{plantID}}/schedules/water/create
- plantID: int
=======
POST https://leafme.jj.ai/plant/{{plantId}}/schedules/water/create
- plantId: int
>>>>>>> c15b79351baf947021895c44236c273f6891297a

example payload: 

        {
            "schedule": {
                "time": "2020-01-13T12:00:00Z",
                "repeat_days": 6,
                "repeat_end_date": "2020-05-12T12:00:00Z"
            },
            "amount": 50
        }

NOTE: repeat_end_date is optional
```

It will return whether it is successful, and the ID of the inserted light schedule

### Delete Light / Water Schedule

```
LIGHT
<<<<<<< HEAD
DELETE https://leafme.jj.ai/plant/{{plantID}}/schedules/light/delete/{{scheduleID}}
- plantID: int
- scheduleID: int

WATER
DELETE https://leafme.jj.ai/plant/{{plantID}}/schedules/water/delete/{{scheduleID}}
- plantID: int
- scheduleID: int
=======
DELETE https://leafme.jj.ai/plant/{{plantId}}/schedules/light/delete/{{scheduleId}}
- plantId: int
- scheduleId: int

WATER
DELETE https://leafme.jj.ai/plant/{{plantId}}/schedules/water/delete/{{scheduleId}}
- plantId: int
- scheduleId: int
>>>>>>> c15b79351baf947021895c44236c273f6891297a
```

### Getting events

#### GET ALL EVENTS

```
GET https://leafme.jj.ai/plant/1/events
```

#### GET LIGHT EVENTS

```
GET https://leafme.jj.ai/plant/1/events/light

<<<<<<< HEAD
GET https://leafme.jj.ai/plant/1/events/light/{{eventID}}

GET https://leafme.jj.ai/plant/1/schedules/light/{{scheduleID}}/events
=======
GET https://leafme.jj.ai/plant/1/events/light/{{eventId}}

GET https://leafme.jj.ai/plant/1/schedules/light/{{scheduleId}}/events
>>>>>>> c15b79351baf947021895c44236c273f6891297a
```

#### GET WATER EVENTS

```
GET https://leafme.jj.ai/plant/1/events/water

<<<<<<< HEAD
GET https://leafme.jj.ai/plant/1/events/water/{{eventID}}

GET https://leafme.jj.ai/plant/1/schedules/water/{{scheduleID}}/events
=======
GET https://leafme.jj.ai/plant/1/events/water/{{eventId}}

GET https://leafme.jj.ai/plant/1/schedules/water/{{scheduleId}}/events
>>>>>>> c15b79351baf947021895c44236c273f6891297a
```

#### SET EVENT TO FINISHED

NOTE: No payload needed when sending POST requests

```
<<<<<<< HEAD
POST https://leafme.jj.ai/plant/1/events/light/{{eventID}}

POST https://leafme.jj.ai/plant/1/events/water/{{eventID}}
=======
POST https://leafme.jj.ai/plant/1/events/light/{{eventId}}

POST https://leafme.jj.ai/plant/1/events/water/{{eventId}}
>>>>>>> c15b79351baf947021895c44236c273f6891297a
```

## Monitoring / Sensors

### Get stats for dashboard

```
<<<<<<< HEAD
GET https://leafme.jj.ai/plant/{{plantID}}/sensors
- plantID: int
=======
GET https://leafme.jj.ai/plant/{{plantId}}/sensors
- plantId: int
>>>>>>> c15b79351baf947021895c44236c273f6891297a
```

### Get history for a type of sensor

```
GET https://leafme.jj.ai/plant/1/sensors/history/SOIL_MOISTURE
GET https://leafme.jj.ai/plant/1/sensors/history/BRIGHTNESS
GET https://leafme.jj.ai/plant/1/sensors/history/AMBIENT_TEMPERATURE
GET https://leafme.jj.ai/plant/1/sensors/history/AMBIENT_HUMIDITY
```

NOTE: In progress, currently retrieves all data for type. Will be changed to only show requested history using start and end times. 

### Create sensor readings

```
POST https://leafme.jj.ai/plant/1/sensors

example payload: 

    [
        {"type": "SOIL_MOISTURE","value": 16.02},
        {"type": "BRIGHTNESS","value": 17.44},
        {"type": "AMBIENT_TEMPERATURE","value": 18.2},
        {"type": "AMBIENT_HUMIDITY","value": 19}
    ]
```

## Presets

### Get preset by type

```
GET https://leafme.jj.ai/presets/types/PEPPER
GET https://leafme.jj.ai/presets/types/FRUIT_VEG
GET https://leafme.jj.ai/presets/types/ROOT_VEG
GET https://leafme.jj.ai/presets/types/HERB
GET https://leafme.jj.ai/presets/types/LEGUME
```

### Get preset details

```
<<<<<<< HEAD
GET https://leafme.jj.ai/presets/{{presetID}}
=======
GET https://leafme.jj.ai/presets/{{presetId}}
>>>>>>> c15b79351baf947021895c44236c273f6891297a
```

## Push Notifications

Uses [Expo](https://docs.expo.io/versions/latest/guides/push-notifications/) library for push tokens

### Set push token

```
POST https://leafme.jj.ai/notification/pushtoken

example payload:

    {
        "plant_id": 1,
        "push_token": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"
    }
```

### Send Notification (for testing purposes)

Sends push notification to plant

```
<<<<<<< HEAD
POST https://leafme.jj.ai/notification/plant/{{plantID}}
=======
POST https://leafme.jj.ai/notification/plant/{{plantId}}
>>>>>>> c15b79351baf947021895c44236c273f6891297a

example payload:

    {
        "title": "Notification Title",
        "body": "Notification Body",
        "data": {
            "data1": "value1",
            "data2": "value2"
        }
    }
```
