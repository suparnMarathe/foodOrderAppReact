export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR", // Indian Rupees
  maximumFractionDigits: 2,
});
