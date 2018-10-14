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
  "data": {
    "status": "OK",
    "mock": false,
    "version": "1.0.0"
  }
}
```

###### POST /api/realm/shuffle
###### Returns the sum of all county resources for a realm shuffle
```javascript
{
  "status": "success",
  "data": {
    "desert": 2,
    "field": 3,
    "forest": 3,
    "lake": 0,
    "mountain": 2
  }
}
```

###### GET /api/realm
###### Returns realm for the associated JWT
```javascript
{
  "status": "success",
  "data": {
    "id": "17BA0791499DB908433B80F37C5FBC89B870084B",
    "created_on": 1539174235,
    "modified_on": 1539174235,
    "name": "Land of Chiwawas",
    "x": 0,
    "y": 0,
    "counties": [
      {
        "id": "28C27031FE7162D732A1C2E209A40BBFCB5FEF90",
        "x": 0,
        "y": 0,
        "capital": true,
        "colonized": true,
        "tax": 10,
        "housing": 1,
        "population": {
          "worker": 1000,
          "military": 100,
          "rogue": 0,
          "sorcerer": 0
        },
        "resources": {
          "forest": 0,
          "field": 0,
          "lake": 0,
          "mountain": 0,
          "desert": 0
        },
        "last": {
          "happiness": 50
        }
      },
      {
        "id": "CB7D29F43F4A81FF1F3A1202C80293337FAA7A0A",
        "x": 1,
        "y": 1,
        "capital": false,
        "colonized": false,
        "tax": 0,
        "housing": 0,
        "population": {
          "worker": 0,
          "military": 0,
          "rogue": 0,
          "sorcerer": 0
        },
        "resources": {
          "forest": 0,
          "field": 0,
          "lake": 0,
          "mountain": 0,
          "desert": 0
        },
        "last": {
          "happiness": 0
        }
      },
      {
        "id": "0371438F82B01EFB31E37CD12A4A6B6C819B0E71",
        "x": 2,
        "y": 2,
        "capital": false,
        "colonized": false,
        "tax": 0,
        "housing": 0,
        "population": {
          "worker": 0,
          "military": 0,
          "rogue": 0,
          "sorcerer": 0
        },
        "resources": {
          "forest": 0,
          "field": 0,
          "lake": 0,
          "mountain": 0,
          "desert": 0
        },
        "last": {
          "happiness": 0
        }
      },
      {
        "id": "AAA025B3826509827B773A79DDE61238B7846C09",
        "x": 3,
        "y": 3,
        "capital": false,
        "colonized": false,
        "tax": 0,
        "housing": 0,
        "population": {
          "worker": 0,
          "military": 0,
          "rogue": 0,
          "sorcerer": 0
        },
        "resources": {
          "forest": 0,
          "field": 0,
          "lake": 0,
          "mountain": 0,
          "desert": 0
        },
        "last": {
          "happiness": 0
        }
      }
    ],
    "god": {
      "name": "HotChiwawa",
      "experience": 0,
      "reputation": 0,
      "last_reputation": 0,
      "hand": [],
      "deck": []
    },
    "ruler": {
      "gender": "male",
      "race": "human",
      "name": "King Nacho the Great",
      "generations": 0,
      "fame": 0,
      "last_fame": 0
    },
    "resources": {
      "gold": 0,
      "food": 0,
      "ore": 0,
      "wood": 0,
      "brick": 0,
      "glass": 0
    }
  }
}
```
