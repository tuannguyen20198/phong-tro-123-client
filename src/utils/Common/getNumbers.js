export const getNumbersPrice = (string) =>
    string
      .split(" ")
      .map((item) => +item)
      .filter((item) => !item === false);

export const getNumbersArea = (string) =>
    string
      .split(" ")
      .map((item) => +item.match(/\d+/))
      .filter((item) => item !== 0);
const a = getNumbersPrice("Trên 15 triệu")
console.log("Hello",a)