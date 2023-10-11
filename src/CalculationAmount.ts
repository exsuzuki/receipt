const Adjustment_RATE: number = 0.0196;
const TAX_RATE: number = 0.1;
const WithHoldingTAX_RATE = 0.1021;
export class Calculation {
  private _BasePrice: number = 0;
  private _Adjustment: number = 0;
  private _ExcludingTAX: number = 0;
  private _TAX: number = 0;
  private _IncludingTAX: number = 0;
  private _WithHoldingTAX: number = 0;
  private _TransferAmount: number = 0;
  public constructor(inputPrice: number, isRegistration: boolean, isTakeHomePayment: boolean) {
    if (isTakeHomePayment) {
      this._BasePrice = Math.floor(inputPrice / (1 - WithHoldingTAX_RATE + TAX_RATE));
    } else {
      this._BasePrice = inputPrice;
    }
    if (isRegistration) {
      this._Adjustment = 0;
    } else {
      this._Adjustment = Math.floor(this.BasePrice * Adjustment_RATE);
    }
    this._ExcludingTAX = this.BasePrice - this.Adjustment;
    this._TAX = Math.floor(this.ExcludingTAX * TAX_RATE);
    this._IncludingTAX = this.ExcludingTAX + this.TAX;
    this._WithHoldingTAX = Math.floor(this.ExcludingTAX * WithHoldingTAX_RATE);
    this._TransferAmount = this.IncludingTAX - this.WithHoldingTAX;
    if (isTakeHomePayment == true && isRegistration == true) {
      let Fraction = inputPrice - this.TransferAmount;
      this._BasePrice += Fraction;
      this._IncludingTAX += Fraction;
      this._ExcludingTAX += Fraction;
      this._TransferAmount += Fraction;
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


