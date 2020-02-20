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

- Trying to get a schedule that doesn't exist doesn't give errors

# API Endpoints

## Plants

### Get Plant

```
GET https://leafme.jj.ai/plant/{{plantId}}
```

### Update Plant

```
POST https://leafme.jj.ai/plant/{{plantId}}

example payload: 

    {"name":"SOME PLANT NAME"}
```

## Schedules

### Get All Schedules

```
GET https://leafme.jj.ai/plant/{{plantId}}/schedules
```

- plantId: int

### Get Individual Light / Water Schedule

```
LIGHT

GET https://leafme.jj.ai/plant/{{plantId}}/schedules/light/{{scheduleId}}
- plantId: int
- scheduleId: int

WATER

GET https://leafme.jj.ai/plant/{{plantId}}/schedules/water/{{scheduleId}}
- plantId: int
- scheduleId: int
```

### Create Light / Water Schedule

```
LIGHT
POST https://leafme.jj.ai/plant/{{plantId}}/schedules/light/create
- plantId: int

example payload: 

        {
            "schedule": {
                "time": "2020-01-13T12:00:00Z",
                "repeat_days": 6,
                "repeat_end_date": "2020-05-12T12:00:00Z"
            }},
            "length": 180
        }}

WATER
POST https://leafme.jj.ai/plant/{{plantId}}/schedules/water/create
- plantId: int

example payload: 

        {
            "schedule": {
                "time": "2020-01-13T12:00:00Z",
                "repeat_days": 6,
                "repeat_end_date": "2020-05-12T12:00:00Z"
            }},
            "amount": 50
        }}

NOTE: repeat_end_date is optional
```

It will return whether it is successful, and the ID of the inserted light schedule

### Delete Light / Water Schedule

```
LIGHT
DELETE https://leafme.jj.ai/plant/{{plantId}}/schedules/light/delete/{{scheduleId}}
- plantId: int
- scheduleId: int

WATER
DELETE https://leafme.jj.ai/plant/{{plantId}}/schedules/water/delete/{{scheduleId}}
- plantId: int
- scheduleId: int
```

### Getting events

#### GET ALL EVENTS

```
GET https://leafme.jj.ai/plant/1/events
```

#### GET LIGHT EVENTS

```
GET https://leafme.jj.ai/plant/1/events/light

GET https://leafme.jj.ai/plant/1/events/light/{{eventId}}

GET https://leafme.jj.ai/plant/1/schedules/light/{{scheduleId}}/events
```

#### GET WATER EVENTS

```
GET https://leafme.jj.ai/plant/1/events/water

GET https://leafme.jj.ai/plant/1/events/water/{{eventId}}

GET https://leafme.jj.ai/plant/1/schedules/water/{{scheduleId}}/events
```

#### SET EVENT TO FINISHED

NOTE: No payload needed when sending POST requests

```
POST https://leafme.jj.ai/plant/1/events/light/{{eventId}}

POST https://leafme.jj.ai/plant/1/events/water/{{eventId}}
```

## Monitoring / Sensors

### Get stats for dashboard

```
GET https://leafme.jj.ai/plant/{{plantId}}/sensors
- plantId: int
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
        {"type": "SOIL_MOISTURE","value": 16.02}},
        {"type": "BRIGHTNESS","value": 17.44}},
        {"type": "AMBIENT_TEMPERATURE","value": 18.2}},
        {"type": "AMBIENT_HUMIDITY","value": 19}}
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
GET https://leafme.jj.ai/presets/{{presetId}}
```
