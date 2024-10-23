export function currencify (amount) {
  // eslint-disable-next-line prefer-const
  let currencySymbol = '$',
    posNegSymbol = '',
    // eslint-disable-next-line prefer-const
    amountPositive = Math.abs(amount),
    // eslint-disable-next-line prefer-const
    formattedAmount = amountPositive.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  if (amount > 0) { posNegSymbol = '+' } else if (amount < 0) { posNegSymbol = '-' }
  return `${posNegSymbol} ${currencySymbol} ${formattedAmount}`
}
export function amountColorClass (amount) {
  if (amount > 0) { return 'text-positive' } else if (amount < 0) { return 'text-negative' } else { return 'text-grey-9' }
}
