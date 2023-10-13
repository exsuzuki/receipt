import { Calculation } from "./CalculationAmount"
describe("Base", () => {
  const inputPrice: number = 100000;
  describe("CalculationFF", () => {
    let amount: Calculation = new Calculation(inputPrice, false, false);
    test("BasePrice", () => { expect(amount.BasePrice).toEqual(100000); })
    test("Adjustment", () => { expect(amount.Adjustment).toEqual(1960); })
    test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(98040); })
    test("TAX", () => { expect(amount.TAX).toEqual(9804); })
    test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(107844); })
    test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(10009); })
    test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(97835); })
  })
  describe("CalculationTF", () => {
    let amount: Calculation = new Calculation(inputPrice, true, false);
    test("BasePrice", () => { expect(amount.BasePrice).toEqual(100000); })
    test("Adjustment", () => { expect(amount.Adjustment).toEqual(0); })
    test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(100000); })
    test("TAX", () => { expect(amount.TAX).toEqual(10000); })
    test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(110000); })
    test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(10210); })
    test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(99790); })
  })
  describe("CalculationFT", () => {
    let amount: Calculation = new Calculation(inputPrice, false, true);
    test("BasePrice", () => { expect(amount.BasePrice).toEqual(100210); })
    test("Adjustment", () => { expect(amount.Adjustment).toEqual(1964); })
    test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(98246); })
    test("TAX", () => { expect(amount.TAX).toEqual(9824); })
    test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(108070); })
    test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(10030); })
    test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(98040); })
  })
  describe("CalculationTT", () => {
    let amount: Calculation = new Calculation(inputPrice, true, true);
    test("BasePrice", () => { expect(amount.BasePrice).toEqual(100210); })
    test("Adjustment", () => { expect(amount.Adjustment).toEqual(0); })
    test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(100210); })
    test("TAX", () => { expect(amount.TAX).toEqual(10021); })
    test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(110231); })
    test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(10231); })
    test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(100000); })
  })
})
describe("Threshold100", () => {
  const inputPrice = 1000000;
  describe("CalculationFF", () => {
    let amount: Calculation = new Calculation(inputPrice, false, false);
    test("BasePrice", () => { expect(amount.BasePrice).toEqual(1000000); })
    test("Adjustment", () => { expect(amount.Adjustment).toEqual(19600); })
    test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(980400); })
    test("TAX", () => { expect(amount.TAX).toEqual(98040); })
    test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(1078440); })
    test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(100098); })
    test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(978342); })
  })
  describe("CalculationTF", () => {
    let amount: Calculation = new Calculation(inputPrice, true, false);
    test("BasePrice", () => { expect(amount.BasePrice).toEqual(1000000); })
    test("Adjustment", () => { expect(amount.Adjustment).toEqual(0); })
    test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(1000000); })
    test("TAX", () => { expect(amount.TAX).toEqual(100000); })
    test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(1100000); })
    test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(102100); })
    test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(997900); })
  })
  describe("CalculationFT", () => {
    let amount: Calculation = new Calculation(inputPrice, false, true);
    test("BasePrice", () => { expect(amount.BasePrice).toEqual(1002344); })
    test("Adjustment", () => { expect(amount.Adjustment).toEqual(19645); })
    test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(982699); })
    test("TAX", () => { expect(amount.TAX).toEqual(98269); })
    test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(1080968); })
    test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(100333); })
    test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(980635); })
  })
  describe("CalculationTT", () => {
    let amount: Calculation = new Calculation(inputPrice, true, true);
    test("BasePrice", () => { expect(amount.BasePrice).toEqual(1002344); })
    test("Adjustment", () => { expect(amount.Adjustment).toEqual(0); })
    test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(1002344); })
    test("TAX", () => { expect(amount.TAX).toEqual(100234); })
    test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(1102578); })
    test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(102578); })
    test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(1000000); })
  })
})
describe("Exception", () => {
  describe("80000", () => {
    let amount: Calculation = new Calculation(80000, true, true);
    test("BasePrice", () => { expect(amount.BasePrice).toEqual(80169); })
    test("Adjustment", () => { expect(amount.Adjustment).toEqual(0); })
    test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(80169); })
    test("TAX", () => { expect(amount.TAX).toEqual(8016); })
    test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(88185); })
    test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(8185); })
    test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(80000); })
  })
  describe("90000", () => {
    let amount: Calculation = new Calculation(90000, true, true);
    test("BasePrice", () => { expect(amount.BasePrice).toEqual(90190); })
    test("Adjustment", () => { expect(amount.Adjustment).toEqual(0); })
    test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(90190); })
    test("TAX", () => { expect(amount.TAX).toEqual(9018); })
    test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(99208); })
    test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(9208); })
    test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(90000); })
  })
  // describe("Threshold", () => {
  //   test("1000001", () => {
  //     expect(() => {
  //       new Calculation(1000001, true, false);
  //     }).toThrow(UnimplementedException);
  //   })
  //   test("1000000", () => {
  //     expect(() => {
  //       new Calculation(1000000, true, false);
  //     }).not.toThrow(UnimplementedException);
  //   })
  //   test("999999", () => {
  //     expect(() => {
  //       new Calculation(999999, true, false);
  //     }).not.toThrow(UnimplementedException);
  //   })
  // })
})