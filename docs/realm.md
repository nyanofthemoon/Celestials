# Celestials

### Realm Service

###### Sample Error Payload
```javascript
{
  "status": "error",
  "message": "/api/realm/error does not exist",
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

###### GET /api/realm/status
###### Returns the status of the service
```javascript
{
  "status": "success",
  "data": "OK"
}
```
