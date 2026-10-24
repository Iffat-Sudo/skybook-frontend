const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
});

const priceFormatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

// "Fri 17 Apr"
export function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

// "09:28"
export function formatTime(value: string) {
  return timeFormatter.format(new Date(value));
}

// "€199.99"
export function formatPrice(value?: number) {
  return value === undefined ? "–" : priceFormatter.format(value);
}

// "2h 0m"
export function formatDuration(start: string, end: string) {
  const minutes = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}