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

## BUGS

- Deleting resources returns {success: true} even if resource doesn't exist

- Getting batch of resources by a parent ID (e.g. getting events by plant ID) returns blank array if parent doesn't exist

# API Endpoints

## Plants

### Get Plant

Gets the plant name, mode, manual light/water status

```
GET https://leafme.jj.ai/plant/{{plantID}}
```

### Update Plant Name

```
POST https://leafme.jj.ai/plant/{{plantID}}

example payload: 

    {"name":"SOME PLANT NAME"}
```

### Update Plant Manual Mode

```
POST https://leafme.jj.ai/plant/{{plantID}}/manual/mode

example payload: 

    {"manual":true}
```

#### Toggle Plant Manual Light Status

```
POST https://leafme.jj.ai/plant/{{plantID}}/manual/light

(no payload needed)
```

#### Update Plant Manual Water Amount

```
POST https://leafme.jj.ai/plant/{{plantID}}/manual/water

example payload: 

    {"amount":100}
```

## Schedules

### Get All Schedules

```
GET https://leafme.jj.ai/plant/{{plantID}}/schedules
```

- plantID: int

### Get Individual Light / Water Schedule

```
LIGHT

GET https://leafme.jj.ai/plant/{{plantID}}/schedules/light/{{scheduleID}}
- plantID: int
- scheduleID: int

WATER

GET https://leafme.jj.ai/plant/{{plantID}}/schedules/water/{{scheduleID}}
- plantID: int
- scheduleID: int
```

### Create Light / Water Schedule

```
LIGHT
POST https://leafme.jj.ai/plant/{{plantID}}/schedules/light/create
- plantID: int

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
POST https://leafme.jj.ai/plant/{{plantID}}/schedules/water/create
- plantID: int

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
DELETE https://leafme.jj.ai/plant/{{plantID}}/schedules/light/delete/{{scheduleID}}
- plantID: int
- scheduleID: int

WATER
DELETE https://leafme.jj.ai/plant/{{plantID}}/schedules/water/delete/{{scheduleID}}
- plantID: int
- scheduleID: int
```

### Getting events

#### GET ALL EVENTS

```
GET https://leafme.jj.ai/plant/1/events
```

#### GET LIGHT EVENTS

```
GET https://leafme.jj.ai/plant/1/events/light

GET https://leafme.jj.ai/plant/1/events/light/{{eventID}}

GET https://leafme.jj.ai/plant/1/schedules/light/{{scheduleID}}/events
```

#### GET WATER EVENTS

```
GET https://leafme.jj.ai/plant/1/events/water

GET https://leafme.jj.ai/plant/1/events/water/{{eventID}}

GET https://leafme.jj.ai/plant/1/schedules/water/{{scheduleID}}/events
```

#### SET EVENT TO FINISHED

NOTE: No payload needed when sending POST requests

```
POST https://leafme.jj.ai/plant/1/events/light/{{eventID}}

POST https://leafme.jj.ai/plant/1/events/water/{{eventID}}
```

## Monitoring / Sensors

### Get stats for dashboard

```
GET https://leafme.jj.ai/plant/{{plantID}}/sensors
- plantID: int
```

### Get history for a type of sensor

```
GET https://leafme.jj.ai/plant/1/sensors/history/SOIL_MOISTURE
GET https://leafme.jj.ai/plant/1/sensors/history/BRIGHTNESS
GET https://leafme.jj.ai/plant/1/sensors/history/AMBIENT_TEMPERATURE
GET https://leafme.jj.ai/plant/1/sensors/history/AMBIENT_HUMIDITY
GET https://leafme.jj.ai/plant/1/sensors/history/PUMP_STATUS
GET https://leafme.jj.ai/plant/1/sensors/history/LIGHT_STATUS
GET https://leafme.jj.ai/plant/1/sensors/history/TANK_LEVEL
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
        {"type": "PUMP_STATUS","value": 1}
        {"type": "LIGHT_STATUS","value": 1}
        {"type": "TANK_LEVEL","value": 1}
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
GET https://leafme.jj.ai/presets/{{presetID}}
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
POST https://leafme.jj.ai/notification/plant/{{plantID}}

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
