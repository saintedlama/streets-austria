# Streets Austria

Streets Austria contains multiple JSON files containing valid street names in Austria and an API to lookup streets and cities.
Generated from "Straßenverzeichnis Statistik Austria" http://www.statistik.at/strasse/suchmaske.jsp.

## Usage
```
npm install streets-austria --save
```

```js
var streetsAustria = require('streets-austria');
```

## Structure
streets-austria exposes a JSON array containing all cities in Austria. Every city has a code (Gemeindekennziffer), a name and an array of
streets. Every street has a code, name and a zip code.

```
[
  {
    "code": "10101",
    "name": "Eisenstadt",
    "streets": [
      {
        "code": "000001",
        "name": "Josef Stanislaus Albach-Gasse",
        "zipCode": "7000"
      },
      {
        "code": "000003",
        "name": "Am Bahndamm",
        "zipCode": "7000"
      },
      {
        "code": "000008",
        "name": "Römerweg",
        "zipCode": "7000"
      },
      {
        "code": "000010",
        "name": "Sankt-Antoni-Straße",
        "zipCode": "7000"
      }
    ]
  }
]
```
