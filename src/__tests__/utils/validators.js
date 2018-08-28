import {
  combineValidators,
  isEmpty,
  isEmail,
  makeMin,
  oneNum,
  oneLow,
  oneUpp
} from "util/validators";

describe("combineValidators", () => {
  const validator = combineValidators(
    value => (!value.includes('tesla') ? "error1" : undefined),
    value => (value.length < 6 ? "error2" : undefined)
  );

  test('returns first error', () => {
    expect(validator('spacex')).toBe('error1')
  })
  
  test('returns second error', () => {
    expect(validator('tesla')).toBe('error2')
  })

  test('returns no error', () => {
    expect(validator('teslaaa')).toBeUndefined()
  })
});

describe("isEmpty", () => {
  test("returns an error for empty string", () => {
    expect(isEmpty("")).toBeTruthy();
  });

  test("does not return error for non empty string", () => {
    expect(isEmpty("random string")).toBeUndefined();
  });
});

describe("isEmail", () => {
  test("returns an error for non email string", () => {
    expect(isEmail("foobarbaz")).toBeTruthy();
  });

  test("does not return an error for email string", () => {
    expect(isEmail("foo@bar.baz")).toBeUndefined();
  });
});

describe("makeMin", () => {
  const len = 6;

  test("returns a function", () => {
    expect(typeof makeMin(len)).toBe("function");
  });

  const min = makeMin(6);

  test("returns an error for short string", () => {
    expect(min("asd d")).toBeTruthy();
  });

  test("does not return an error for long string", () => {
    expect(min("asd dsa dsad as")).toBeUndefined();
  });
});

describe("oneNum", () => {
  test("returns an error if a string does not have a number", () => {
    expect(oneNum("sdlajdlkj")).toBeTruthy();
  });

  test("does not return an error if a string has a number", () => {
    expect(oneNum("1sdlajdlkj")).toBeUndefined();
  });
});

describe("oneLow", () => {
  test("returns an error if a string does not have a lowercase letter", () => {
    expect(oneLow("123KJH432")).toBeTruthy();
  });

  test("does not return an error if a string has a lowercase letter", () => {
    expect(oneLow("123HG123a")).toBeUndefined();
  });
});

describe("oneUpp", () => {
  test("returns an error if a string does not have a uppercase letter", () => {
    expect(oneUpp("321hkh3j21")).toBeTruthy();
  });

  test("does not return an error if a string has a uppercase letter", () => {
    expect(oneUpp("h213k2j3hX")).toBeUndefined();
  });
});
