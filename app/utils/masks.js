export const maskCep = (value) => {
  let cep = (value || '').replace(/[^0-9_]+/g, '');
  if (cep.length > 5) cep = `${cep.substring(0, 5)}-${cep.substring(5, 8)}`;

  return cep;
};

export const maskCardNumber = (value) => {
  let cardNumber = (value || '').replace(/[^0-9]+/g, '');

  if (cardNumber.length > 4) cardNumber = `${cardNumber.substring(0, 4)} ${cardNumber.substring(4)}`;
  if (cardNumber.length > 9) cardNumber = `${cardNumber.substring(0, 9)} ${cardNumber.substring(9)}`;
  if (cardNumber.length > 14) cardNumber = `${cardNumber.substring(0, 14)} ${cardNumber.substring(14, 19)}`;

  return cardNumber;
};

export const maskNumber = (value) => {
  const number = (value || '').replace(/[^0-9]+/g, '');

  return number;
}

export const maskPrice = (value, times) => {
  const price = `${times}x R$ ${Math.ceil(value / times)},00`;

  return price;
}
