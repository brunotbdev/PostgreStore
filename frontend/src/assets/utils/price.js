export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2).replace(".", ",");
}

export function savePrice(price) {
  const brl = price.replace(",", ".");
  const floatPrice = parseFloat(brl);
  return Math.round(floatPrice * 100);
}
