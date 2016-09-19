# format-number-french
A node module that formats numbers according to french rules and add a suffix if needed.

```
var formattedNumber = formatNumber(value, options);
```

## Value
must be string of numbers and may contain one coma 

## Options
### suffix
add a suffix to the formatted number
```
var formattedNumber = formatNumber("27341123,54", {suffix: "€"});
returned value : 27 341 123,54 €
```
### reduce
reduce number by adding a suffix of kilo (k), million (M) or billion (Mrd) depending of the value
```
var formattedNumber = formatNumber("27341123,54", {suffix: "€", reduce: true});
returned value :  27 M€
```

