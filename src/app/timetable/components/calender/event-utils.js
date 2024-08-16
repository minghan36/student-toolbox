let eventIdCounter = 0;

export function createEventId() {
  return String(eventIdCounter++);
}
