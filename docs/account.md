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
  "data": {
    "status": "OK",
    "mock": false,
    "version": "1.0.0"
  }
}
```

###### GET /api/account
###### Returns account for the associated JWT
```javascript
{
  "status": "success",
  "data": {
    "id": "356A192B7913B04C54574D18C28D46E6395428AB",
    "email": "guest@mail.com",
    "god_name": "HotChiwawa",
    "gems": 100,
    "cards": [
      {}
    ],
    "decks": [
      {}
    ],
    "created_on": 1539174235,
    "modified_on": 1539174235
  }
}
```
