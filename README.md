# nationalities-list

## Example

``` js
const { getId, getNationality } = require('nationalities-list')

console.log(getNationality(777, 'en')) // Taiwan
console.log(getId('Taiwan')) // 777
console.log(getId('Nowhere-to-be-found-land')) // undefined
```

And how to change the data 
``` js
const { overwrite, getNationality } = require('nationalities-list')
overwrite([{
  id: 777,
  nationalityEN: 'Taiwan',
  nationalityDE: 'Taiwan'
}])

console.log(getNationality(777, 'de')) // Taiwan
```

## Methods

Usage:

``` js
const nationalitiesList = require('nationalities-list')
```
All input is case-insensitive.

### overwrite(countries)

Expects an array of nationalities objects containing `id` and `nationalityEN/nationalityDE` properties.
``` js
[{
  id: 777,
  nationalityEN: 'Taiwan',
  nationalityDE: 'Taiwan'
}]
```

### getnationality(code, lang)

Expects a nationality Id and lang('en'/'de').  
Returns the nationality for that country.  
If not found, it returns `undefined`.  

### getId(nationality)

Expects the English nationality nationality.  
Returns the Id for that nationality.  
If not found, it returns `undefined`.  

### getNationalities(lang)

Returns an array of all nationality Nationalities.

### getIds()

Returns an array of all nationalities ids.

### getNationalityList(lang)

Returns a key-value object of all nationalities using the nationality as key.

### getIdList(lang)

Returns a key-value object of all nationalities using the Id as key.

### getData()

Returns an array of all nationalities information, in the same format as it gets imported.
