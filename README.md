# nationalities-id-and-codes

## Example

``` js
const { getId, getName } = require('nationalities-id-and-codes')

console.log(getName(777)) // Taiwan
console.log(getId('Taiwan')) // 777
console.log(getId('Nowhere-to-be-found-land')) // undefined
```

And how to change the name of a country 
``` js
const { overwrite, getName } = require('nationalities-id-and-codes')
overwrite([{
  id: 777,
  name: 'Taiwan'
}])

console.log(getName(777)) // Taiwan
```

## Methods

Usage:

``` js
const nationalitiesList = require('nationalities-ids')
```
All input is case-insensitive.

### overwrite(countries)

Expects an array of nationalities objects containing `id` and `name` properties.
``` js
[{
  id: 777,
  name: 'Taiwan'
}]
```

### getName(code)

Expects a nationality Id.  
Returns the name for that country.  
If not found, it returns `undefined`.  

### getId(name)

Expects the English nationality name.  
Returns the Id for that nationality.  
If not found, it returns `undefined`.  

### getNames()

Returns an array of all nationality names.

### getIds()

Returns an array of all nationalities ids.

### getNameList()

Returns a key-value object of all nationalities using the name as key.

### getIdList()

Returns a key-value object of all nationalities using the Id as key.

### getData()

Returns an array of all nationalities information, in the same format as it gets imported.
