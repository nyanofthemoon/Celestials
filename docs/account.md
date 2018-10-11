# Celestials

### Account Service

###### Sample Error Payload
```javascript
{
  "status": "error",
  "message": "/api/account/error does not exist",
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

###### GET /api/account/status
###### Returns the status of the service
```javascript
{
  "status": "success",
  "data": "OK"
}
```