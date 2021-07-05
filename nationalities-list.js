const data = require('./data.json')

const nationalityMapEN = {}
const nationalityMapDE = {}
const idMapEN = {}
const idMapDE = {}
const mapData = object => {
  nationalityMapEN[object.nationalityEN.toLowerCase()] = object.id
  nationalityMapDE[object.nationalityDE.toLowerCase()] = object.id
  idMapEN[object.id] = object.nationalityEN
  idMapDE[object.id] = object.nationalityDE
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
  return nationalityMapEN[nationality.toLowerCase()] || nationalityMapDE[nationality.toLowerCase()]
}

exports.getNationality = function getNationality(id, lang) {
  switch (lang) {
    case 'en':
      return idMapEN[id]
    case 'de':
      return idMapDE[id]
  }
}

exports.getNationalities = function getNationalities(lang) {
  return data
    .map(function (object) {
      switch (lang) {
        case 'en':
          return object.nationalityEN
        case 'de':
          return object.nationalityDE
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
  }
}

exports.getNationalityList = function getNationalityList(lang) {
  switch (lang) {
    case 'en':
      return nationalityMapEN
    case 'de':
      return nationalityMapDE
  }
}

exports.getData = function getData() {
  return data
}
