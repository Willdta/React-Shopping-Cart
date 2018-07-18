const allCapsPostal = item =>
  item.toUpperCase() 

const capitalizer = word =>
  word
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  module.exports = { allCapsPostal, capitalizer }