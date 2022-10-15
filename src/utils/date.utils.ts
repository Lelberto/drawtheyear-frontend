export function toLocaleString(date: Date) {
  const day = date.toLocaleDateString('default', { day: 'numeric' });
  const month = date.toLocaleDateString('default', { month: 'long' });
  const year = date.toLocaleDateString('default', { year: 'numeric' });
  return `${day} ${month} ${year}`;
}
