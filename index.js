/*!
 * number-display-fr
 * Copyright(c) 2016 IDfr
 * MIT Licensed
 */

'use strict';

/**
 * Module exports.
 * @public
 */

module.exports = formatNumber;

/**
 * Return a well formatted number according to french rules
 * @param value
 * @param options
 */
function formatNumber(value, options) {
    options = options || {};
    value += ''; // must be String Type

    // not a number !!
    if (!__isNumber(value)) {
        return false;
    }

    var valueArr = __splitValue(value),
        integer = valueArr[0],
        formattedValue;

    if (options.reduce) {
        if (integer >= 100000 && integer <= 999999) {
            options.suffix = 'k' + options.suffix;
            integer = integer.slice(0, -3);
        } else if (integer > 999999 && integer <= 9999999) {
            options.suffix = 'Mio ' + options.suffix;
            integer = integer.slice(0, -5);
            integer = integer[0] + ',' + integer[1];
        } else if (integer > 9999999 && integer <= 999999999) {
            options.suffix = 'Mio ' + options.suffix;
            integer = integer.slice(0, -6);
        } else if (integer > 999999999 && integer <= 9999999999) {
            options.suffix = 'Mrd ' + options.suffix;
            integer = integer.slice(0, -8);
            integer = integer[0] + ',' + integer[1];
        } else if (integer > 9999999999) {
            options.suffix = 'Mrd ' + options.suffix;
            integer = integer.slice(0, -9);
        }

        // add spaces
        formattedValue = __addSpacesSeparator(integer);
    } else {
        // add spaces
        valueArr[0] = __addSpacesSeparator(integer);
        formattedValue = valueArr.join(',');
    }

    if (options.suffix) {
        formattedValue += ' ' + options.suffix;
    }

    return formattedValue;
}

/**
 * Check if value contains only number and one/zero coma
 * @param value
 * @returns {boolean}
 * @private
 */
function __isNumber(value) {
    return !!value.match(/^[0-9]*,?[0-9]*$/);
}

/**
 * Split number in [integer | decimal] if number is a number
 * else return null
 * @param value
 * @returns {Array|{index: number, input: string}}
 * @private
 */
function __splitValue(value) {
    return value.split(',');
}

/**
 * Add a space every three characters
 * @param val
 * @returns {string}
 * @private
 */
function __addSpacesSeparator(val) {
    var reg = /(\d+)(\d{3})/,
        sep = ' ';
    // val must be a type String
    val += '';

    while (reg.test(val)) {
        val = val.replace(reg, '$1' + sep + '$2');
    }
    return val;
}