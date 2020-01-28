# LeafMe API

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

## Schedules

### Get All Schedules

```
GET https://leafme.jj.ai/plant/{plantId}/schedules
```

- plantId: int

### Get Individual Light / Water Schedule

```
LIGHT

GET https://leafme.jj.ai/plant/{plantId}/schedules/light/{scheduleId}
- plantId: int
- scheduleId: int

WATER

GET https://leafme.jj.ai/plant/{plantId}/schedules/water/{scheduleId}
- plantId: int
- scheduleId: int
```

### Create Light / Water Schedule

```
LIGHT
POST https://leafme.jj.ai/plant/{plantId}/schedules/light/create
- plantId: int

example load data: 

        {
            "schedule": {
                "time": "2020-01-13T12:00:00Z",
                "repeat_days": 6,
                "repeat_end_date": "2020-05-12T12:00:00Z"
            },
            "length": 180
        }

WATER
POST https://leafme.jj.ai/plant/{plantId}/schedules/water/create
- plantId: int

example load data: 

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
DELETE https://leafme.jj.ai/plant/{plantId}/schedules/light/delete/{scheduleId}
- plantId: int
- scheduleId: int

WATER
DELETE https://leafme.jj.ai/plant/{plantId}/schedules/water/delete/{scheduleId}
- plantId: int
- scheduleId: int
```

## Monitoring / Sensors

### Get stats for dashboard

```
GET localhost:8000/plant/{plantId}/sensors
- plantId: int
```

### Get history for a type of sensor

```
GET localhost:8000/plant/1/sensors/history/SOIL_MOISTURE
GET localhost:8000/plant/1/sensors/history/BRIGHTNESS
GET localhost:8000/plant/1/sensors/history/AMBIENT_TEMPERATURE
GET localhost:8000/plant/1/sensors/history/AMBIENT_HUMIDITY
```

NOTE: In progress, currently retrieves all data for type. Will be changed to only show requested history using start and end times. 
