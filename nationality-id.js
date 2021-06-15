const data = require('./data.json')

const nameMap = {}
const idMap = {}
const mapIdAndName = country => {
  nameMap[country.name.toLowerCase()] = country.id
  idMap[country.id.toLowerCase()] = country.name
}
data.forEach(mapIdAndName)

exports.overwrite = function overwrite(countries) {
  if (!countries || !countries.length) return
  countries.forEach(function (country) {
    const foundIndex = data.findIndex(function (item) {
      return item.id === country.id
    })
    data[foundIndex] = country
    mapCodeAndName(country)
  })
}

exports.getId = function getId(name) {
  return nameMap[name.toLowerCase()]
}

exports.getName = function getName(id) {
  return idMap[id.toLowerCase()]
}

exports.getNames = function getNames() {
  return data.map(function (country) {
    return country.name
  })
}

exports.getIds = function getIds() {
  return data.map(function (country) {
    return country.id
  })
}

exports.getIdList = function getIdList() {
  return idMap
}

exports.getNameList = function getNameList() {
  return nameMap
}

exports.getData = function getData() {
  return data
}
