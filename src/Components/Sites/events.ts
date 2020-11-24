
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const toCompliantDate = (date: Date): string => {
  let dateStr = date.toISOString();
  return dateStr;
}

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  },
  {
    id: createEventId(),
    title: "Hello from Yesterday",
    start: "2020-11-20T12:00:00",
    color: '#690420'
  }
]

export function createEventId() {
  return String(eventGuid++)
}
