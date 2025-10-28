// example.test.js
import test from 'node:test';
import assert from 'node:assert';

test('adds numbers correctly', () => {
  assert.strictEqual(1 + 2, 3);
});

test('throws on invalid input', () => {
  assert.throws(() => {
    throw new Error('Invalid!');
  }, /Invalid!/);
});
