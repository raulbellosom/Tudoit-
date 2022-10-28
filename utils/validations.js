export function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateNumberPhone(number) {
  // const re = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
  const re = /^[0-9]{10}|(([0-9]{3}\s){2}[0-9]{4})$/;
  return re.test(number);
}
