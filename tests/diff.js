var assert = require('chai').assert;
var diff = require('../index.js');

describe('diff', function() {
  it('supports simple prop set', function() {
    assert.deepEqual(diff({}, {a:10}), [
      [['a'], 10]
    ]);
  });

  it('supports simple prop delete', function() {
    assert.deepEqual(diff({a:10}, {}), [
      [['a']]
    ]);
  });

  it('supports simple prop change', function() {
    assert.deepEqual(diff({a: false}, {a:10}), [
      [['a'], 10]
    ]);
  });

  it('supports full docs additions', function() {
    assert.deepEqual(diff({}, {a: {b: true}}), [
      [['a']],
      [['a', 'b'], true]
    ]);
  });

  it('supports smart object updates', function() {
    assert.deepEqual(diff({a: {b: true}}, {a: {b: true, c: false}}), [
      [['a', 'c'], false]
    ]);
  });
});
