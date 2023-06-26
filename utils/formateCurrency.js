const formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

export default function formateCurrency(amount) {
  return formatter.format(amount);
}
