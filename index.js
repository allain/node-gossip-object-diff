var jiff = require('jiff');

module.exports = function(oldDoc, newDoc) {
  checkNoArrays(newDoc);

  var changes = [];

  jiff.diff(oldDoc, newDoc)
  .map(transformToGossipOperation)
  .filter(Boolean)
  .map(expandObjectOperation)
  .forEach(function(ops) {
    ops.forEach(function(op) {
      changes.push(op);
    });
  });

  return changes;
};

function checkNoArrays(doc) {
  if (Array.isArray(doc)) throw new Error('arrays not supported');
  if (typeof doc !== 'object') return;

  Object.keys(doc).forEach(function(prop) {
    checkNoArrays(doc[prop]);
  });
}

function transformToGossipOperation(patch) {
  path = patch.path.split('/');
  path.shift();

  if (patch.op === 'add' || patch.op === 'replace') {
    return [path, patch.value];
  } else if (patch.op === 'remove') {
    return [path];
  } else {
    return null;
  }
}

function expandObjectOperation(op) {
  if (typeof op[1] !== 'object') {
    return [op];
  }

  var path = op[0];
  var doc = op[1];

  var result = [[path]]; // Remove previous object value

  Object.keys(doc).forEach(function(key) {
    var newPath = path.concat(key);
    expandObjectOperation([newPath, doc[key]]).forEach(function(newOp) {
      result.push(newOp);
    });
  });

  return result;
}
