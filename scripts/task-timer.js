// task-timer.js
// Tracks task start/end times, calculates elapsed time, and estimates ETAs for TODO.js tasks.
// Usage:
//   node scripts/task-timer.js update   # Updates timing info and ETAs in TODO.js
//   node scripts/task-timer.js start "Task Name"   # Mark a task as started
//   node scripts/task-timer.js done "Task Name"    # Mark a task as done

const fs = require('fs');
const path = require('path');

const TODO_PATH = path.join(__dirname, '../TODO.js');
const TIMES_PATH = path.join(__dirname, '../scripts/task-times.json');

function loadTimes() {
  if (!fs.existsSync(TIMES_PATH)) return {};
  return JSON.parse(fs.readFileSync(TIMES_PATH, 'utf8'));
}

function saveTimes(times) {
  fs.writeFileSync(TIMES_PATH, JSON.stringify(times, null, 2), 'utf8');
}

function nowSaudiISO() {
  // Get current time in Asia/Riyadh (UTC+3)
  const date = new Date();
  // Convert to Saudi time by adding the offset
  const saOffset = 3 * 60; // minutes
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  const saDate = new Date(utc + (saOffset * 60000));
  // Format as ISO string without Z
  return saDate.toISOString().replace('T', ' ').slice(0, 16);
}

function updateTaskTimes(action, taskName) {
  const times = loadTimes();
  if (!times[taskName]) times[taskName] = {};
  if (action === 'start') {
    times[taskName].start = nowSaudiISO();
  } else if (action === 'done') {
    times[taskName].end = nowSaudiISO();
  }
  saveTimes(times);
}

function getElapsed(start, end) {
  if (!start || !end) return null;
  const ms = new Date(end) - new Date(start);
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h}h ${m}m`;
}

function printSummary(done, inProgress, avgMs, totalElapsedMs) {
  const completed = done.length;
  const remaining = inProgress.length;
  const avgMin = Math.round(avgMs / 60000);
  const totalMin = avgMin * remaining;
  const now = new Date();
  const finish = new Date(now.getTime() + totalMin * 60000);
  const elapsedH = Math.floor(totalElapsedMs / 3600000);
  const elapsedM = Math.floor((totalElapsedMs % 3600000) / 60000);
  console.log('\n--- Project Progress Summary ---');
  console.log(`Tasks completed: ${completed}`);
  console.log(`Tasks remaining: ${remaining}`);
  console.log(`Average time per task: ${avgMin} min`);
  console.log(`Total elapsed time: ${elapsedH}h ${elapsedM}m`);
  console.log(`Total time remaining: ${Math.floor(totalMin/60)}h ${totalMin%60}m`);
  console.log(`Estimated finish date: ${finish.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' })}`);
  console.log('--------------------------------\n');
}

function updateTodoWithTimes() {
  const todo = fs.readFileSync(TODO_PATH, 'utf8');
  const times = loadTimes();
  const lines = todo.split('\n');
  let completed = 0, total = 0, elapsedArr = [];
  const doneTasks = [], inProgressTasks = [];
  const newLines = lines.map(line => {
    const match = line.match(/\[DONE\]|\[IN PROGRESS\]|\[TODO.*?\]/);
    if (match) {
      total++;
      const task = line.replace(/\/\/ |\[.*?\]|:|🟢|🟠|🔴|🏁|\d+%|\[.*?\]/g, '').trim();
      const t = times[task] || {};
      if (line.includes('[DONE]') && t.start && t.end) {
        completed++;
        doneTasks.push(task);
        const elapsed = getElapsed(t.start, t.end);
        elapsedArr.push(new Date(t.end.replace(' ', 'T')) - new Date(t.start.replace(' ', 'T')));
        return line.replace(/(\- Completed: ).*/, `$1${t.end}`) + ` // Elapsed: ${elapsed}`;
      } else if (!line.includes('[DONE]') && t.start) {
        inProgressTasks.push(task);
        return line + ` // Started: ${t.start}`;
      } else if (!line.includes('[DONE]')) {
        inProgressTasks.push(task);
      }
    }
    return line;
  });
  // Estimate ETA for remaining tasks
  const avgMs = elapsedArr.length ? Math.round(elapsedArr.reduce((a, b) => a + b, 0) / elapsedArr.length) : 3600000;
  let eta = Date.now();
  for (let i = 0; i < newLines.length; i++) {
    if (newLines[i].match(/\[TODO|\[IN PROGRESS/)) {
      eta += avgMs;
      const etaDate = new Date(eta + 3 * 60 * 60000); // Add 3 hours for Saudi time
      const etaStr = etaDate.toISOString().replace('T', ' ').slice(0, 16);
      newLines[i] = newLines[i].replace(/(ETA: ).*?( |$)/, `ETA: ${etaStr} `);
    }
  }
  fs.writeFileSync(TODO_PATH, newLines.join('\n'), 'utf8');
  const totalElapsedMs = elapsedArr.reduce((a, b) => a + b, 0);
  printSummary(doneTasks, inProgressTasks, avgMs, totalElapsedMs);
}

const [,, cmd, ...args] = process.argv;
if (cmd === 'start') {
  updateTaskTimes('start', args.join(' '));
  console.log('Task started:', args.join(' '));
} else if (cmd === 'done') {
  updateTaskTimes('done', args.join(' '));
  console.log('Task marked as done:', args.join(' '));
} else if (cmd === 'update') {
  updateTodoWithTimes();
  console.log('TODO.js updated with real elapsed/ETA times.');
} else {
  console.log('Usage: node scripts/task-timer.js [start|done|update] "Task Name"');
} 