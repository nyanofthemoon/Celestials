# Celestials

### Auth Service

###### Sample Error Payload
```javascript
{
  "status": "error",
  "message": "/api/auth/error does not exist",
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

###### GET /api/auth/status
###### Returns the status of the service
```javascript
{
  "status": "success",
  "data": "OK"
}
```

###### POST /api/auth
###### Returns the token to use with `Authorization` header as `Bearer {token}` value
```javascript
{
  "status": "success",
  "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50Ijp7ImVtYWlsIjoiZ3Vlc3RAbWFpbC5j"
  }
}
```

###### GET /api/auth
###### Returns the signed token values
```javascript
{
  "status": "success",
  "data": {
    "email": "guest@mail.com"
  }
}
```
