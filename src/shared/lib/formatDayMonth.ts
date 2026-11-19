export function formatDayMonth(dateNumber: number): string {
  const date = new Date(dateNumber);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // +1, т.к. январь = 0
  return `${day}.${month}`;
}
