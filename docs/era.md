# Celestials

### Era Service

###### Sample Error Payload
```javascript
{
  "status": "error",
  "message": "/api/era/error does not exist",
  "code": "Error"
}
```

###### Sample Success Payload
```javascript
{
  "status": "success",
  "data": {}
}
```

###### GET /api/era/status
###### Returns the status of the service
```javascript
{
  "status": "success",
  "data": "OK"
}
```

###### GET /api/era
###### Returns the current era information.
- start: timestamp representing the starting time of the era
- end: timestamp representing the ending time of the era
- generations: amount of generations of the era
```javascript
{
  "status": "success",
  "data": {
    "era": 1,
    "name": "Era of Debugging",
    "generations": 30,
    "start": 1539272065585,
    "end": 1539272151585
  }
}
```

###### GET /api/era/generation
###### Returns the era's current generation information
- start: timestamp representing the starting time of the generation
- end: timestamp representing the ending time of the generation
```javascript
{
  "status": "success",
  "data": {
    "generation": 1,
    "name": "Generation Bugs",
    "start": 1539272065585,
    "end": 1539274645585
  }
}
```
