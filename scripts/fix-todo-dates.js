// fix-todo-dates.js
// Usage: node scripts/fix-todo-dates.js
// Replaces all dates in TODO.js with the current year (2025) and Saudi time if year < 2025.

const fs = require('fs');
const path = require('path');

const TODO_PATH = path.join(__dirname, '../TODO.js');

function toSaudiDate(dateStr) {
  // dateStr: 'YYYY-MM-DD HH:mm UTC' or 'YYYY-MM-DD HH:mm'
  const match = dateStr.match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);
  if (!match) return dateStr;
  const [, , month, day, hour, min] = match;
  // Use current year (2025)
  const year = '2025';
  // Create a Date in UTC, then add 3 hours for Saudi time
  const d = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(min)));
  d.setUTCHours(d.getUTCHours() + 3);
  // Format as '2025-MM-DD HH:mm'
  return `${year}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function fixDatesInLine(line) {
  // Replace all YYYY-MM-DD HH:mm (optionally with UTC) with 2025-MM-DD HH:mm (Saudi time)
  return line.replace(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})( UTC)?/g, (match, y, m, d, h, min) => {
    if (Number(y) < 2025) {
      return toSaudiDate(match);
    }
    return match;
  });
}

function main() {
  const todo = fs.readFileSync(TODO_PATH, 'utf8');
  const newTodo = todo.split('\n').map(fixDatesInLine).join('\n');
  fs.writeFileSync(TODO_PATH, newTodo, 'utf8');
  console.log('All old dates in TODO.js updated to 2025 and Saudi time.');
}

main(); 