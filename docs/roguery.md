# Celestials

### Roguery Service

###### Sample Error Payload
```javascript
{
  "status": "error",
  "message": "/api/roguery/error does not exist",
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

###### GET /api/roguery/status
###### Returns the status of the service
```javascript
{
  "status": "success",
  "data": {
    "status": "OK",
    "mock": false,
    "version": "1.0.0"
  }
}
```
