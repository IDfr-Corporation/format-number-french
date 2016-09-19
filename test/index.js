'use strict';

var rewire = require('rewire'),
    assert = require('assert'),
    formatNumber = rewire('../');

describe('Format-number-french Tests', function () {
    // Private methods to test
    var checkValue = formatNumber.__get__('__isNumber');
    var addSpacesSeparator = formatNumber.__get__('__addSpacesSeparator');

    it('Value is valid if it contains only numbers and a coma (or not)', function () {
        assert.ok(checkValue('123456789'), 'The value is not a number.');
        assert.notEqual(checkValue('1234aaaa56789'), 'The value is not a number.');
        assert.ok(checkValue('1234567,89'), 'The value is not a number.');
    });

    it('Integer part of the value is well formatted', function () {
        assert.equal(addSpacesSeparator(5365), '5 365', 'fails for thousands');
        assert.equal(addSpacesSeparator(14567890), '14 567 890', 'fails for millions');
        assert.equal(addSpacesSeparator(766333444555), '766 333 444 555', 'fails for billions');
    });

    it('Decimal number is well formatted', function () {
        assert.equal(formatNumber('1234567'), '1 234 567', 'fail to format a integer number');
        assert.equal(formatNumber('1234567,5678'), '1 234 567,5678', 'fail to format a decimal number');
    });

    it('It add a suffix €', function () {
        assert.equal(formatNumber('1234567,5678', {suffix: '€'}), '1 234 567,5678 €', 'fail to add a suffix');
    })
});