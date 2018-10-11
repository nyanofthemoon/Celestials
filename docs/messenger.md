# Celestials

### Messenger Service

###### Sample Error Payload
```javascript
{
  "status": "error",
  "message": "/api/messenger/error does not exist",
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

###### GET /api/messenger/status
###### Returns the status of the service
```javascript
{
  "status": "success",
  "data": "OK"
}
```
