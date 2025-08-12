const data = require('./data.json')

// Supported languages
const LANGS = ['en', 'de', 'sv', 'nl']

/**
 * Maps from nationality name (lowercased) to ID, per language.
 * @type {Record<string, Record<string, number>>}
 */
const nationalityMaps = Object.fromEntries(LANGS.map(lang => [lang, {}]))

/**
 * Maps from ID to nationality name, per language.
 * @type {Record<string, Record<number, string>>}
 */
const idMaps = Object.fromEntries(LANGS.map(lang => [lang, {}]))

/**
 * Maps from ID to code.
 * @type {Record<number, string>}
 */
const codeMap = {}

/**
 * Maps from code to ID.
 * @type {Record<string, number>}
 */
const codeToIdMap = {}

/**
 * Populates all lookup maps for a given nationality object.
 * @param {{ id: number, nationality: Record<string, string>, code: string }} object - The nationality object.
 */
function mapData(object) {
  LANGS.forEach(lang => {
    const name = object.nationality[lang]
    nationalityMaps[lang][name.toLowerCase()] = object.id
    idMaps[lang][object.id] = name
  })
  codeMap[object.id] = object.code
  codeToIdMap[object.code] = object.id
}

// Initial population of maps
data.forEach(mapData)

/**
 * Overwrites or adds nationality objects in the data array and updates all maps.
 * @param {Array<{ id: number, nationality: Record<string, string>, code: string }>} objects - Objects to overwrite.
 */
exports.overwrite = function overwrite(objects) {
  if (!Array.isArray(objects) || !objects.length) return

  const idIndexMap = Object.fromEntries(data.map((obj, idx) => [obj.id, idx]))

  objects.forEach(object => {
    const idx = idIndexMap[object.id]
    if (idx !== undefined) {
      data[idx] = object
    } else {
      data.push(object)
    }
    mapData(object)
  })
}

/**
 * Gets the ID for a given nationality name in any supported language.
 * @param {string} nationality - The nationality name (case-insensitive).
 * @returns {number|undefined} The matching ID, or undefined if not found.
 */
exports.getId = nationality => {
  if (!nationality) return
  const lower = nationality.toLowerCase()
  for (const lang of LANGS) {
    if (nationalityMaps[lang][lower]) return nationalityMaps[lang][lower]
  }
}

/**
 * Gets the nationality name for a given ID and language.
 * @param {number} id - The nationality ID.
 * @param {string} lang - The language code ('en', 'de', 'sv', 'nl').
 * @returns {string|undefined} The nationality name, or undefined if not found.
 */
exports.getNationality = (id, lang) => idMaps[lang]?.[id]

/**
 * Gets the code for a given nationality ID.
 * @param {number} id - The nationality ID.
 * @returns {string|undefined} The code, or undefined if not found.
 */
exports.getCode = id => codeMap[id]

/**
 * Gets the nationality name for a given code and language.
 * @param {string} code - The nationality code.
 * @param {string} lang - The language code ('en', 'de', 'sv', 'nl').
 * @returns {string|undefined} The nationality name, or undefined if not found.
 */
exports.getNationalityByCode = (code, lang) => {
  const id = codeToIdMap[code]
  return id !== undefined ? idMaps[lang]?.[id] : undefined
}

/**
 * Gets a sorted list of nationality names for a given language.
 * @param {string} lang - The language code ('en', 'de', 'sv', 'nl').
 * @returns {string[]} Sorted list of nationality names.
 */
exports.getNationalities = lang => data.map(obj => obj.nationality[lang]).sort((a, b) => a.localeCompare(b))

/**
 * Gets an array of all nationality IDs.
 * @returns {number[]} Array of IDs.
 */
exports.getIds = () => data.map(obj => obj.id)

/**
 * Gets a map from ID to nationality name for a given language.
 * @param {string} lang - The language code ('en', 'de', 'sv', 'nl').
 * @returns {Record<number, string>} Map from ID to nationality name.
 */
exports.getIdList = lang => idMaps[lang]

/**
 * Gets a map from nationality name (lowercased) to ID for a given language.
 * @param {string} lang - The language code ('en', 'de', 'sv', 'nl').
 * @returns {Record<string, number>} Map from nationality name to ID.
 */
exports.getNationalityList = lang => nationalityMaps[lang]

/**
 * Gets the full nationality data array.
 * @returns {Array<{ id: number, nationality: Record<string, string>, code: string }>} The data array.
 */
exports.getData = () => data
