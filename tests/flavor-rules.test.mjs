import test from 'node:test';
import assert from 'node:assert/strict';
import { filterFlavors, recommendFlavor } from '../src/utilities/flavor-rules.mjs';
const sample = [
  { id: 'p', categories: ['Cremosos', 'Intensos'], mood: 'dulce' },
  { id: 'm', categories: ['Frutales'], mood: 'refrescante' },
  { id: 'c', categories: ['Cremosos', 'Intensos'], mood: 'intenso' },
  { id: 'f', categories: ['Frutales', 'Especiales', 'Temporada'], mood: 'atrevido' },
];
test('filters match membership, all preserves catalog and unknown is empty', () => {
  assert.deepEqual(filterFlavors(sample, 'Todos'), sample);
  assert.deepEqual(
    filterFlavors(sample, 'Cremosos').map((f) => f.id),
    ['p', 'c'],
  );
  assert.deepEqual(
    filterFlavors(sample, 'Frutales').map((f) => f.id),
    ['m', 'f'],
  );
  assert.deepEqual(
    filterFlavors(sample, 'Intensos').map((f) => f.id),
    ['p', 'c'],
  );
  assert.deepEqual(
    filterFlavors(sample, 'Especiales').map((f) => f.id),
    ['f'],
  );
  assert.deepEqual(
    filterFlavors(sample, 'Temporada').map((f) => f.id),
    ['f'],
  );
  assert.deepEqual(filterFlavors(sample, 'Unknown'), []);
});
test('quiz covers every mood and rejects unavailable matches', () => {
  assert.equal(recommendFlavor(sample, 'intenso').id, 'c');
  assert.equal(recommendFlavor(sample, 'refrescante').id, 'm');
  assert.equal(recommendFlavor(sample, 'dulce').id, 'p');
  assert.equal(recommendFlavor(sample, 'atrevido').id, 'f');
  assert.equal(recommendFlavor([], 'dulce'), null);
  assert.equal(recommendFlavor(sample, 'invalid'), null);
});
