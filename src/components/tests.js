// src/lib/tests.js

// GAD-7: over the last 2 weeks...
export const GAD7_ITEMS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it’s hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
]

// PHQ-9: over the last 2 weeks...
export const PHQ9_ITEMS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself",
]

// Quick screen (5 items sample) — non-diagnostic quick triage
export const QUICK_ITEMS = [
  "Experiencing stress that feels hard to manage",
  "Feeling anxious in daily situations",
  "Having low mood most days",
  "Trouble sleeping or unrestful sleep",
  "Finding it hard to focus on tasks",
]

// Likert scoring is 0–3 as in GAD-7/PHQ-9
export const LIKERT = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2 },
  { label: 'Nearly every day', value: 3 },
]

// Helpers
export function sum(arr = []) {
  return arr.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0)
}

export function interpretGAD7(score) {
  if (score <= 4) return { level: 'Minimal anxiety', color: 'green' }
  if (score <= 9) return { level: 'Mild anxiety', color: 'yellow' }
  if (score <= 14) return { level: 'Moderate anxiety', color: 'orange' }
  return { level: 'Severe anxiety', color: 'red' }
}

export function interpretPHQ9(score) {
  if (score <= 4) return { level: 'Minimal depression', color: 'green' }
  if (score <= 9) return { level: 'Mild depression', color: 'yellow' }
  if (score <= 14) return { level: 'Moderate depression', color: 'orange' }
  if (score <= 19) return { level: 'Moderately severe depression', color: 'rose' }
  return { level: 'Severe depression', color: 'red' }
}
