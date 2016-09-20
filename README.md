# format-number-french
A node module that formats numbers according to french rules and add a prefix if needed.

```
var formattedNumber = formatNumber(value, options);
```

## Value
must be string of numbers and may contain one coma 

## Options
### prefix
add a prefix to the formatted number
```
var formattedNumber = formatNumber("27341123,54", {prefix: "€"});
returned value : 27 341 123,54 €
```
### reduce
reduce number by adding a prefix of kilo (k), million (M) or billion (Mrd) depending of the value
```
var formattedNumber = formatNumber("27341123,54", {prefix: "€", reduce: true});
returned value :  27 Mio €
```

