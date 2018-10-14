# Celestials

### Market Service

###### Sample Error Payload
```javascript
{
  "status": "error",
  "message": "/api/market/error does not exist",
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

###### GET /api/market/status
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

###### GET /api/market
###### Returns the status of the market
```javascript
{
  "status": "success",
  "data": {
    "food": {
      "stock": 4250,
      "value": 1
    },
    "gold": {
      "stock": 250,
      "value": 20
    },
    "wood": {
      "stock": 125,
      "value": 40
    },
    "brick": {
      "stock": 85,
      "value": 50
    },
    "ore": {
      "stock": 50,
      "value": 100
    },
    "glass": {
      "stock": 25,
      "value": 200
    }
  }
}
```

###### POST /api/market
###### Trade using required fields `of_amount`, `of_type` and `for_type`
```javascript
{
  "status": "success",
  "data": {
    "of_amount": req.body.of_amount,
    "of_type":  req.body.of_type,
    "for_type": req.body.for_type,
    "for_amount": 100,
  }
}
```
