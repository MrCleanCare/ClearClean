// update-progress.js
// Run: node scripts/update-progress.js
// This script parses TODO.js and updates README.md and public/progress.html with the latest progress, tasks, and dates.

const fs = require('fs');
const path = require('path');

const TODO_PATH = path.join(__dirname, '../TODO.js');
const README_PATH = path.join(__dirname, '../README.md');
const HTML_PATH = path.join(__dirname, '../public/progress.html');

function parseTasks(todoText) {
  const lines = todoText.split('\n');
  const progressBarLine = lines.find(l => l.includes('Progress Bar:'));
  const progressBar = progressBarLine ? progressBarLine.match(/\[([■□]+)\]/)?.[0] : '[□□□□□□]';
  const percent = progressBar ? Math.round((progressBar.split('■').length - 1) / progressBar.length * 100) : 0;
  const lastUpdatedLine = lines.find(l => l.includes('Last Updated:'));
  const lastUpdated = lastUpdatedLine ? lastUpdatedLine.split('Last Updated:')[1].trim() : '';

  const done = [], inProgress = [], future = [], notes = [];
  let currentTask = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('// [DONE]')) {
      currentTask = { text: line.replace('// [DONE] ', ''), completed: '', details: '' };
      // Look ahead for completed date and details
      if (lines[i+1] && lines[i+1].includes('- Completed:')) currentTask.completed = lines[i+1].split('- Completed:')[1].trim();
      if (lines[i+2] && lines[i+2].includes('- Details:')) currentTask.details = lines[i+2].split('- Details:')[1].trim();
      done.push(currentTask);
    } else if (line.startsWith('// TODO') || line.startsWith('// FIXME')) {
      currentTask = { text: line.replace('// ', ''), eta: '', details: '' };
      if (line.match(/ETA: ([0-9\- :]+)/)) currentTask.eta = line.match(/ETA: ([0-9\- :]+)/)[1];
      if (lines[i+1] && lines[i+1].includes('- Details:')) currentTask.details = lines[i+1].split('- Details:')[1].trim();
      inProgress.push(currentTask);
    } else if (line.startsWith('// NOTE')) notes.push(line.replace('// NOTE', ''));
  }
  // Find 0% tasks for future
  for (const line of lines) {
    if (line.includes('[□□□□□□□□□□]')) future.push(line.replace('// ', ''));
  }
  return { progressBar, percent, lastUpdated, done, inProgress, future, notes };
}

function updateReadme(parsed) {
  const md = `# 🚀 Project Progress: Master Clean Care Website\n\n## 📊 Overall Progress\n\n_Last updated: **${parsed.lastUpdated}**_\n\n\`${parsed.progressBar} ${parsed.percent}%\`\n\n---\n\n## 🏆 **Major Milestones Completed**\n${parsed.done.map(t => `- ${t.text}${t.completed ? ` (Completed: ${t.completed})` : ''}${t.details ? `\n    - ${t.details}` : ''}`).join('\n')}\n\n---\n\n## 🛠️ **In Progress / Next Up**\n${parsed.inProgress.map(t => `- ${t.text}${t.eta ? ` (ETA: ${t.eta})` : ''}${t.details ? `\n    - ${t.details}` : ''}`).join('\n')}\n\n---\n\n## 🟣 **Planned / Future**\n${parsed.future.map(t => `- ${t}`).join('\n')}\n\n---\n\n## 🌟 **How to Read the Progress Bar**\n- Each block = 10%\n- Filled blocks = completed work\n- Empty blocks = remaining work\n\n---\n\n### 💡 _Keep up the great work!_\n`;
  fs.writeFileSync(README_PATH, md, 'utf8');
}

function updateHtml(parsed) {
  const html = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Project Progress - Master Clean Care</title>\n  <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap\" rel=\"stylesheet\">\n  <style>\n    body { font-family: 'Inter', Arial, sans-serif; background: #f8fafc; color: #222; margin: 0; padding: 0; }\n    .container { max-width: 700px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px #0001; padding: 32px; }\n    h1 { color: #0ea5e9; margin-top: 0; }\n    .progress-bar-bg { background: #e5e7eb; border-radius: 8px; height: 32px; width: 100%; margin: 24px 0; }\n    .progress-bar-fill { background: linear-gradient(90deg, #0ea5e9 60%, #22d3ee 100%); height: 100%; border-radius: 8px; width: ${parsed.percent}%; display: flex; align-items: center; justify-content: flex-end; color: #fff; font-weight: bold; font-size: 1.1em; padding-right: 16px; transition: width 0.6s; }\n    section { margin-bottom: 32px; }\n    ul { padding-left: 20px; }\n    li { margin-bottom: 8px; }\n    .done { color: #16a34a; font-weight: 600; }\n    .in-progress { color: #f59e42; font-weight: 600; }\n    .future { color: #64748b; font-weight: 600; }\n    .date { color: #64748b; font-size: 0.95em; margin-left: 8px; }\n    @media (max-width: 600px) { .container { padding: 12px; } }\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    <h1>🚀 Project Progress</h1>\n    <h2>Master Clean Care Website</h2>\n    <div class=\"progress-bar-bg\">\n      <div class=\"progress-bar-fill\">${parsed.percent}%</div>\n    </div>\n    <div class=\"date\">Last updated: <b>${parsed.lastUpdated}</b></div>\n    <section>\n      <h3>🏆 Major Milestones Completed</h3>\n      <ul>\n        ${parsed.done.map(t => `<li class=\"done\">${t.text}${t.completed ? `<span class=\"date\">(Completed: ${t.completed})</span>` : ''}${t.details ? `<br><span class=\"date\">${t.details}</span>` : ''}</li>`).join('\n        ')}\n      </ul>\n    </section>\n    <section>\n      <h3>🛠️ In Progress / Next Up</h3>\n      <ul>\n        ${parsed.inProgress.map(t => `<li class=\"in-progress\">${t.text}${t.eta ? `<span class=\"date\">(ETA: ${t.eta})</span>` : ''}${t.details ? `<br><span class=\"date\">${t.details}</span>` : ''}</li>`).join('\n        ')}\n      </ul>\n    </section>\n    <section>\n      <h3>🟣 Planned / Future</h3>\n      <ul>\n        ${parsed.future.map(t => `<li class=\"future\">${t}</li>`).join('\n        ')}\n      </ul>\n    </section>\n    <footer style=\"margin-top:32px; color:#94a3b8; font-size:0.95em;\">Keep up the great work! 🚀</footer>\n  </div>\n</body>\n</html>\n`;
  fs.writeFileSync(HTML_PATH, html, 'utf8');
}

function main() {
  const todoText = fs.readFileSync(TODO_PATH, 'utf8');
  const parsed = parseTasks(todoText);
  updateReadme(parsed);
  updateHtml(parsed);
  console.log('Progress files updated from TODO.js!');
}

main(); 