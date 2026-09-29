(function exposeValiScheduler(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ValiScheduler = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function makeValiScheduler() {
  'use strict';

  function parseTime(value) {
    const match = /^(\d{1,2}):(\d{2})$/.exec(String(value || ''));
    if (!match) return { hours: 19, minutes: 0 };
    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return { hours: 19, minutes: 0 };
    return { hours, minutes };
  }

  function normalizeDays(days) {
    if (!Array.isArray(days)) return [0, 1, 2, 3, 4, 5, 6];
    return [...new Set(days.map(Number).filter(day => Number.isInteger(day) && day >= 0 && day <= 6))].sort();
  }

  function localDateKey(value = new Date()) {
    const date = value instanceof Date ? value : new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function nextOccurrence(fromValue, time, selectedDays) {
    const from = fromValue instanceof Date ? new Date(fromValue) : new Date(fromValue);
    const days = normalizeDays(selectedDays);
    if (!days.length || Number.isNaN(from.getTime())) return null;
    const parsed = parseTime(time);
    for (let offset = 0; offset <= 7; offset += 1) {
      const candidate = new Date(from);
      candidate.setDate(from.getDate() + offset);
      candidate.setHours(parsed.hours, parsed.minutes, 0, 0);
      if (days.includes(candidate.getDay()) && candidate.getTime() > from.getTime()) return candidate;
    }
    return null;
  }

  function isCatchUpDue(nowValue, time, selectedDays, windowMinutes = 180) {
    const now = nowValue instanceof Date ? new Date(nowValue) : new Date(nowValue);
    const days = normalizeDays(selectedDays);
    if (!days.includes(now.getDay()) || Number.isNaN(now.getTime())) return false;
    const parsed = parseTime(time);
    const scheduled = new Date(now);
    scheduled.setHours(parsed.hours, parsed.minutes, 0, 0);
    const elapsed = now.getTime() - scheduled.getTime();
    return elapsed >= 0 && elapsed <= Math.max(0, Number(windowMinutes) || 0) * 60000;
  }

  return { parseTime, normalizeDays, localDateKey, nextOccurrence, isCatchUpDue };
});
