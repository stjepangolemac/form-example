export function combineValidators(...validators) {
  return (...params) =>
    validators.reduce(
      (error, validator) => error || validator(...params),
      undefined
    );
}

export function isEmpty(value) {
  return value ? undefined : "This cannot be empty";
}

export function isEmail(value) {
  const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  return regex.test(value) ? undefined : "This should be an email.";
}

export function makeMin(len) {
  return value =>
    value.length < len
      ? `This should be at least ${len} characters long`
      : undefined;
}

export function oneNum(value) {
  return /\.*[0-9].*/.test(value)
    ? undefined
    : "This should contain at least one number";
}

export function oneLow(value) {
  return /\.*[a-z].*/.test(value)
    ? undefined
    : "This should contain at least one lowercase letter";
}

export function oneUpp(value) {
  return /\.*[A-Z].*/.test(value)
    ? undefined
    : "This should contain at least one uppercase letter";
}
