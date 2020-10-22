import FormatModel from "../../src/models/FormatModel.js"

describe("splitlines", () => {
  const formatModel = new FormatModel();

  it("splits a long string containing no spaces.", () => {
    const actual = formatModel.splitlines("helloworldwow", 5);
    expect(actual).toEqual(["hello", "world", "wow"]);
  });

  it("splits a string into words, and re-constructs them into lines.", () => {
    const actual = formatModel.splitlines("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 15);
    expect(actual).toEqual(["Lorem ipsum", "dolor sit amet,", "consectetur", "adipiscing", "elit."]);
  });

  it("splits a long word in a space-sparated string.", () => {
    const actual = formatModel.splitlines("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 10);
    expect(actual).toEqual(["Lorem", "ipsum", "dolor sit", "amet, cons", "ectetur", "adipiscing", "elit."]);
  });
});
