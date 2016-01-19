var fs = require('fs');
var xml2js = require('xml2js');
var _ = require('lodash');

var parser = new xml2js.Parser();
console.log('Reading XML data file...');
fs.readFile(__dirname + '/gemplzstr.xml', function(err, data) {
  console.log('Parsing XML data...');
  parser.parseString(data, function(err, parsed) {
    console.log('Mapping data to target JSON...');
    var streets = map(parsed);

    fs.writeFileSync(__dirname + '/cities.json', JSON.stringify(streets, null, '  '), { encoding: 'utf-8' });

    console.log('Generated cities.json');
  });
});

function map(raw) {
  var currentCity = null;
  var cities = [];

  raw['tns:strukturdaten'].daten[0].datensatz
    .map(function(e) {
      return e.element;
    })
    .forEach(function(e) {
      // Structure of e array:
      // 1. Gemeindekennziffer (city code)
      // 2. Politische Gemeinde (city name)
      // 3. Ortschaftskennziffer (not used)
      // 4. Ortschaftsname (not used)
      // 5. Straßenkennziffer (street code)
      // 6. Straßenname (street name)
      // 7.Postleitzahl (street zip)
      // 8. Gemeindecode (not used)
      if (currentCity == null || currentCity.code != e[0]) {
        currentCity = {
          code: e[0],
          name: e[1],
          streets: []
        };

        if (!cities.some(c => c.code == currentCity.code)) {
          cities.push(currentCity);
        }
      }

      if (currentCity.code == e[0] && currentCity.name != e[1]) {
        console.log('City with same code but different name discovered', e[0], e[1]);
      }

      currentCity.streets = currentCity.streets || [];
      var street = {
        code: e[4],
        name:e[5],
        zipCode: e[6]
      };
    });

    return cities;
}