import { Calculation } from "./CalculationAmount";
describe("Base", () => {
    const inputPrice = 100000;
    describe("CalculationFF", () => {
        let amount = new Calculation(inputPrice, false, false);
        test("BasePrice", () => { expect(amount.BasePrice).toEqual(100000); });
        test("Adjustment", () => { expect(amount.Adjustment).toEqual(1960); });
        test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(98040); });
        test("TAX", () => { expect(amount.TAX).toEqual(9804); });
        test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(107844); });
        test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(10009); });
        test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(97835); });
    });
    describe("CalculationTF", () => {
        let amount = new Calculation(inputPrice, true, false);
        test("BasePrice", () => { expect(amount.BasePrice).toEqual(100000); });
        test("Adjustment", () => { expect(amount.Adjustment).toEqual(0); });
        test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(100000); });
        test("TAX", () => { expect(amount.TAX).toEqual(10000); });
        test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(110000); });
        test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(10210); });
        test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(99790); });
    });
    describe("CalculationFT", () => {
        let amount = new Calculation(inputPrice, false, true);
        test("BasePrice", () => { expect(amount.BasePrice).toEqual(100210); });
        test("Adjustment", () => { expect(amount.Adjustment).toEqual(1964); });
        test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(98246); });
        test("TAX", () => { expect(amount.TAX).toEqual(9824); });
        test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(108070); });
        test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(10030); });
        test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(98040); });
    });
    describe("CalculationTT", () => {
        let amount = new Calculation(inputPrice, true, true);
        test("BasePrice", () => { expect(amount.BasePrice).toEqual(100210); });
        test("Adjustment", () => { expect(amount.Adjustment).toEqual(0); });
        test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(100210); });
        test("TAX", () => { expect(amount.TAX).toEqual(10021); });
        test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(110231); });
        test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(10231); });
        test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(100000); });
    });
});
describe("Exception", () => {
    describe("80000", () => {
        let amount = new Calculation(80000, true, true);
        test("BasePrice", () => { expect(amount.BasePrice).toEqual(80169); });
        test("Adjustment", () => { expect(amount.Adjustment).toEqual(0); });
        test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(80169); });
        test("TAX", () => { expect(amount.TAX).toEqual(8016); });
        test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(88185); });
        test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(8185); });
        test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(80000); });
    });
    describe("90000", () => {
        let amount = new Calculation(90000, true, true);
        test("BasePrice", () => { expect(amount.BasePrice).toEqual(90190); });
        test("Adjustment", () => { expect(amount.Adjustment).toEqual(0); });
        test("ExcludingTAX", () => { expect(amount.ExcludingTAX).toEqual(90190); });
        test("TAX", () => { expect(amount.TAX).toEqual(9018); });
        test("IncludingTAX", () => { expect(amount.IncludingTAX).toEqual(99208); });
        test("WithHoldingTAX", () => { expect(amount.WithHoldingTAX).toEqual(9208); });
        test("TransferAmount", () => { expect(amount.TransferAmount).toEqual(90000); });
    });
});
