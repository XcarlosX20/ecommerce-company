export const formatearDinero = (amount) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}
