'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const scheduler = require('../scheduler.js');

test('keeps a same-day reminder when its time is still ahead', () => {
  const monday = new Date(2026, 8, 28, 18, 0, 0);
  const next = scheduler.nextOccurrence(monday, '19:00', [1]);
  assert.equal(next.getFullYear(), 2026);
  assert.equal(next.getMonth(), 8);
  assert.equal(next.getDate(), 28);
  assert.equal(next.getHours(), 19);
});

test('moves a passed single-day reminder to the following week', () => {
  const monday = new Date(2026, 8, 28, 20, 0, 0);
  const next = scheduler.nextOccurrence(monday, '19:00', [1]);
  assert.equal(next.getDate(), 5);
  assert.equal(next.getMonth(), 9);
});

test('skips unselected days', () => {
  const monday = new Date(2026, 8, 28, 20, 0, 0);
  const next = scheduler.nextOccurrence(monday, '07:30', [3]);
  assert.equal(next.getDay(), 3);
  assert.equal(next.getDate(), 30);
  assert.equal(next.getHours(), 7);
  assert.equal(next.getMinutes(), 30);
});

test('only catches up inside the configured three-hour window', () => {
  assert.equal(scheduler.isCatchUpDue(new Date(2026, 8, 28, 20, 15), '19:00', [1], 180), true);
  assert.equal(scheduler.isCatchUpDue(new Date(2026, 8, 28, 23, 30), '19:00', [1], 180), false);
  assert.equal(scheduler.isCatchUpDue(new Date(2026, 8, 29, 20, 15), '19:00', [1], 180), false);
});

test('falls back to 19:00 for malformed time values', () => {
  assert.deepEqual(scheduler.parseTime('99:99'), { hours: 19, minutes: 0 });
  assert.deepEqual(scheduler.parseTime('07:05'), { hours: 7, minutes: 5 });
});
