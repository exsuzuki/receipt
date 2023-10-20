const Adjustment_RATE: number = 0.0196;
const TAX_RATE: number = 0.1;
const WithHoldingTAX_RATE = 0.1021;
const OverWithHoldingTAX_RATE = 0.2042;
const Reverse_RATE: number = (1 - WithHoldingTAX_RATE + TAX_RATE);
const OverReverse_RATE: number = (1 - OverWithHoldingTAX_RATE + TAX_RATE);
const LimitPrice: number = 1000000;
const Limit: number = Math.floor(LimitPrice * Reverse_RATE);
export const __local__ = {
  Adjustment_RATE,
  TAX_RATE,
  WithHoldingTAX_RATE,
  OverWithHoldingTAX_RATE,
  Reverse_RATE,
  OverReverse_RATE,
}
export class Calculation {
  private _BasePrice: number = 0;
  private _Adjustment: number = 0;
  private _ExcludingTAX: number = 0;
  private _TAX: number = 0;
  private _IncludingTAX: number = 0;
  private _WithHoldingTAX: number = 0;
  private _TransferAmount: number = 0;
  public constructor(inputPrice: number, isRegistration: boolean, isTakeHomePayment: boolean) {
    this.BasePrice_Caller(inputPrice, isTakeHomePayment);
    if (isRegistration) {
      this._Adjustment = 0;
    } else {
      this._Adjustment = Math.floor(this.BasePrice * Adjustment_RATE);
    }
    this._ExcludingTAX = this.BasePrice - this.Adjustment;
    this._TAX = Math.floor(this.ExcludingTAX * TAX_RATE);
    this._IncludingTAX = this.ExcludingTAX + this.TAX;
    this.WithHoldingTAX_Calculation(this.ExcludingTAX);
    this._TransferAmount = this.IncludingTAX - this.WithHoldingTAX;
    if (isTakeHomePayment == true && isRegistration == true) {
      let Fraction = inputPrice - this.TransferAmount;
      this._BasePrice += Fraction;
      this._IncludingTAX += Fraction;
      this._ExcludingTAX += Fraction;
      this._TransferAmount += Fraction;
    }
  };
  private BasePrice_Caller(inputPrice: number, isTakeHomePayment: boolean): void {
    if (isTakeHomePayment) this.TakeHomePayment_Calculation(inputPrice);
    else this._BasePrice = inputPrice;
  }
  private TakeHomePayment_Calculation(inputPrice: number): void {
    if (inputPrice <= Limit) {
      this._BasePrice = Math.floor(inputPrice / Reverse_RATE);
    } else {
      let OverPrice: number = Math.floor((inputPrice - Limit) / OverReverse_RATE);
      this._BasePrice = LimitPrice + OverPrice;
    }
  }
  private WithHoldingTAX_Calculation(ExcludingTAX: number): void {
    if (ExcludingTAX <= LimitPrice) {
      this._WithHoldingTAX = Math.floor(ExcludingTAX * WithHoldingTAX_RATE);
    } else {
      let NormalPrice: number = Math.floor(LimitPrice * WithHoldingTAX_RATE);
      let OverPrice: number = Math.floor((ExcludingTAX - LimitPrice) * OverWithHoldingTAX_RATE);
      this._WithHoldingTAX = NormalPrice + OverPrice;
    }
  }
  get BasePrice(): number { return this._BasePrice; }
  get Adjustment(): number { return this._Adjustment; }
  get ExcludingTAX(): number { return this._ExcludingTAX; }
  get TAX(): number { return this._TAX; }
  get IncludingTAX(): number { return this._IncludingTAX; }
  get WithHoldingTAX(): number { return this._WithHoldingTAX; }
  get TransferAmount(): number { return this._TransferAmount; }
}