const sum = (a: number, b: number) => {
  return a + b;
};

it("adds two numbers", () => {
  expect(sum(6, 4)).toEqual(10);
});
