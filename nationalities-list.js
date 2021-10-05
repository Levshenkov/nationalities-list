const data = require('./data.json')

const nationalityMapEN = {}
const nationalityMapDE = {}
const nationalityMapSV = {}
const nationalityMapNL = {}
const idMapEN = {}
const idMapDE = {}
const idMapSV = {}
const idMapNL = {}
const mapData = object => {
  nationalityMapEN[object.nationality.en.toLowerCase()] = object.id
  nationalityMapDE[object.nationality.de.toLowerCase()] = object.id
  nationalityMapSV[object.nationality.sv.toLowerCase()] = object.id
  nationalityMapNL[object.nationality.nl.toLowerCase()] = object.id
  idMapEN[object.id] = object.nationality.en
  idMapDE[object.id] = object.nationality.de
  idMapSV[object.id] = object.nationality.sv
  idMapNL[object.id] = object.nationality.nl
}
data.forEach(mapData)

exports.overwrite = function overwrite(objects) {
  if (!objects || !objects.length) return
  objects.forEach(function (object) {
    const foundIndex = data.findIndex(function (item) {
      return item.id === object.id
    })
    data[foundIndex] = object
    mapData(object)
  })
}

exports.getId = function getId(nationality) {
  return (
    nationalityMapEN[nationality.toLowerCase()] ||
    nationalityMapDE[nationality.toLowerCase()] ||
    nationalityMapSV[nationality.toLowerCase()] ||
    nationalityMapNL[nationality.toLowerCase()]
  )
}

exports.getNationality = function getNationality(id, lang) {
  switch (lang) {
    case 'en':
      return idMapEN[id]
    case 'de':
      return idMapDE[id]
    case 'sv':
      return idMapSV[id]
    case 'nl':
      return idMapNL[id]
  }
}

exports.getNationalities = function getNationalities(lang) {
  return data
    .map(function (object) {
      switch (lang) {
        case 'en':
          return object.nationality.en
        case 'de':
          return object.nationality.de
        case 'sv':
          return object.nationality.sv
        case 'nl':
          return object.nationality.nl
      }
    })
    .sort(function (a, b) {
      return a.localeCompare(b)
    })
}

exports.getIds = function getIds() {
  return data.map(function (object) {
    return object.id
  })
}

exports.getIdList = function getIdList(lang) {
  switch (lang) {
    case 'en':
      return idMapEN
    case 'de':
      return idMapDE
    case 'sv':
      return idMapSV
    case 'nl':
      return idMapNL
  }
}

exports.getNationalityList = function getNationalityList(lang) {
  switch (lang) {
    case 'en':
      return nationalityMapEN
    case 'de':
      return nationalityMapDE
    case 'sv':
      return nationalityMapSV
    case 'nl':
      return nationalityMapNL
  }
}

exports.getData = function getData() {
  return data
}
