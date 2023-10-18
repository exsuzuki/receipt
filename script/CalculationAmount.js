const Adjustment_RATE = 0.0196;
const TAX_RATE = 0.1;
const WithHoldingTAX_RATE = 0.1021;
const OverWithHoldingTAX_RATE = 0.2042;
const Reverse_RATE = (1 - WithHoldingTAX_RATE + TAX_RATE);
const OverReverse_RATE = (1 - OverWithHoldingTAX_RATE + TAX_RATE);
export class Calculation {
    constructor(inputPrice, isRegistration, isTakeHomePayment) {
        this._BasePrice = 0;
        this._Adjustment = 0;
        this._ExcludingTAX = 0;
        this._TAX = 0;
        this._IncludingTAX = 0;
        this._WithHoldingTAX = 0;
        this._TransferAmount = 0;
        this.BasePrice_Caller(inputPrice, isTakeHomePayment);
        if (isRegistration) {
            this._Adjustment = 0;
        }
        else {
            this._Adjustment = Math.floor(this.BasePrice * Adjustment_RATE);
        }
        this._ExcludingTAX = this.BasePrice - this.Adjustment;
        this._TAX = Math.floor(this.ExcludingTAX * TAX_RATE);
        this._IncludingTAX = this.ExcludingTAX + this.TAX;
        this._WithHoldingTAX = Math.floor(this.ExcludingTAX * WithHoldingTAX_RATE);
        this._TransferAmount = this.IncludingTAX - this.WithHoldingTAX;
        /** 一時退避
        if (isTakeHomePayment == true && isRegistration == true) {
          let Fraction = inputPrice - this.TransferAmount;
          this._BasePrice += Fraction;
          this._IncludingTAX += Fraction;
          this._ExcludingTAX += Fraction;
          this._TransferAmount += Fraction;
        }
         */
    }
    ;
    BasePrice_Caller(inputPrice, isTakeHomePayment) {
        if (isTakeHomePayment)
            this.TakeHomePayment_Calculation(inputPrice);
        else
            this.ExcludingTAX_Calculation(inputPrice);
    }
    TakeHomePayment_Calculation(inputPrice) {
        const Limit = Math.floor(1000000 / Reverse_RATE);
        if (inputPrice <= Limit) {
            this._BasePrice = Math.floor(inputPrice / Reverse_RATE);
        }
    }
    ExcludingTAX_Calculation(inputPrice) { }
    get BasePrice() { return this._BasePrice; }
    get Adjustment() { return this._Adjustment; }
    get ExcludingTAX() { return this._ExcludingTAX; }
    get TAX() { return this._TAX; }
    get IncludingTAX() { return this._IncludingTAX; }
    get WithHoldingTAX() { return this._WithHoldingTAX; }
    get TransferAmount() { return this._TransferAmount; }
}
