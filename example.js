var diff = require('./index.js');
var Model = require('gossip-object');

var model = new Model();

var changes = diff({}, {a: {b: true}});
console.log(changes);
// outputs:
// [
//   [ [ 'a' ] ],
//   [ [ 'a', 'b' ], true ]
// ]

changes.forEach(function(change) {
  model.localChange(change);
});

console.log(model.toJSON());

// outputs:
// { a: { b: true } }
