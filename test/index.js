'use strict';

var rewire = require('rewire'),
    assert = require('assert'),
    formatNumber = rewire('../');

describe('Format-number-french Tests', function () {
    // Private methods to test
    var checkValue = formatNumber.__get__('__isNumber');
    var addSpacesSeparator = formatNumber.__get__('__addSpacesSeparator');

    it('Value is valid if it contains only numbers, a coma and negative sign (or not)', function () {
        assert.ok(checkValue('123456789'), 'The value is not a number.');
        assert.notEqual(checkValue('1234aaaa56789'), 'The value is not a number.');
        assert.ok(checkValue('1234567,89'), 'The value is not a number.');
        assert.ok(checkValue('-1234567,89'), 'Negative sign throw an error');
    });

    it('Integer part of the value is well formatted', function () {
        assert.equal(addSpacesSeparator(5365), '5 365', 'fails for thousands');
        assert.equal(addSpacesSeparator(14567890), '14 567 890', 'fails for millions');
        assert.equal(addSpacesSeparator(766333444555), '766 333 444 555', 'fails for billions');
        assert.equal(addSpacesSeparator(-766333444555), '-766 333 444 555', 'fails for negative billions');
    });

    it('Decimal number is well formatted', function () {
        assert.equal(formatNumber('1234567'), '1 234 567', 'fail to format a integer number');
        assert.equal(formatNumber('1234567,5678'), '1 234 567,5678', 'fails to format a decimal number');
        assert.equal(formatNumber('-1234567,5678'), '-1 234 567,5678', 'fails to format a decimal number');
    });

    it('It add a prefix €', function () {
        assert.equal(formatNumber('1234567,5678', {prefix: '€'}), '1 234 567,5678 €', 'fails to add a prefix');
    });

    describe('if reduce option exits...', function () {
        it('it formats value with kilo prefix if 100 000 < abs(number) < 999 999', function () {
            assert.equal(formatNumber('234567,5678', {prefix: '€', reduce: true}), '234 k€');
            assert.equal(formatNumber('-234567,5678', {prefix: '€', reduce: true}), '-234 k€');
            assert.notEqual(formatNumber('99999,5678', {prefix: '€', reduce: true}), '99 k€');
        });
        it('it formats value with Mio prefix if 1 000 000 < abs(number) < 9 999 999', function () {
            assert.equal(formatNumber('7234567,5678', {prefix: '€', reduce: true}), '7,2 Mio €');
            assert.equal(formatNumber('-7234567,5678', {prefix: '€', reduce: true}), '-7,2 Mio €');
        });
        it('it formats value with Mio prefix if 10 000 000 < abs(number) < 9 999 999 999', function () {
            assert.equal(formatNumber('444234567,5678', {prefix: '€', reduce: true}), '444 Mio €');
            assert.equal(formatNumber('-444234567,5678', {prefix: '€', reduce: true}), '-444 Mio €');
        });
        it('it formats value with Mrd prefix if 1 000 000 000 < abs(number) < 9 999 999 999', function () {
            assert.equal(formatNumber('3444234567,5678', {prefix: '€', reduce: true}), '3,4 Mrd €');
            assert.equal(formatNumber('-3444234567,5678', {prefix: '€', reduce: true}), '-3,4 Mrd €');
        });
        it('it formats value with Mrd prefix if 9 999 999 999 < abs(number)', function () {
            assert.equal(formatNumber('33444234567,5678', {prefix: '€', reduce: true}), '33 Mrd €');
            assert.equal(formatNumber('-33444234567,5678', {prefix: '€', reduce: true}), '-33 Mrd €');
        });
    });
});