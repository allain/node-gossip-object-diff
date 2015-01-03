# gossip-object-diff

Given two JSON docs computes the set of changes needed to transform the first into the second in the format used internally by gossip-object.

## Installation

npm install gossip-object-diff

## Usage
```js

var diff = require('gossip-object-diff');
var Model = require('gossip-object');

var model = new Model();

var changes = diff({}, {a: {b: true}});

console.log(changes);

model.localChanges(changes);
```
