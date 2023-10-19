import { Calculation } from './CalculationAmount.js'
const Registration: HTMLSelectElement = document.getElementById('isRegistration') as HTMLSelectElement;
const TakeHomePayment: HTMLSelectElement = document.getElementById('isTakeHomePayment') as HTMLSelectElement;
let inputPrice: number;
let isRegistration: boolean;
let isTakeHomePayment: boolean;
let amount: Calculation;
document.addEventListener('DOMContentLoaded', function () {
  if (Registration) Registration.addEventListener('change', invoiceChange);
  if (TakeHomePayment) TakeHomePayment.addEventListener('change', selectChange);
  const CalculationBtn: HTMLButtonElement = document.getElementById('btn') as HTMLButtonElement;
  if (CalculationBtn) CalculationBtn.addEventListener('click', btn_click);
});
function invoiceChange() {
  if (Registration.value == 'true') {
    isRegistration = true;
  } else {
    isRegistration = false;
  }
  console.log('Reg:' + isRegistration);
  btn_click();
}
function selectChange() {
  if (TakeHomePayment.value == 'true') {
    isTakeHomePayment = true;
  } else {
    isTakeHomePayment = false;
  }
  console.log('Cal:' + isTakeHomePayment);
  btn_click();
}
function btn_click() {
  inputPrice = Number((document.getElementById('inputPrice') as HTMLInputElement).value);
  amount = new Calculation(inputPrice, isRegistration, isTakeHomePayment);
  console.log(amount);
  (document.getElementById('BasePrice') as HTMLTableCellElement).innerHTML = amount.BasePrice.toLocaleString();
  (document.getElementById('Adjustment') as HTMLTableCellElement).innerHTML = amount.Adjustment.toLocaleString();
  (document.getElementById('ExcludingTAX') as HTMLTableCellElement).innerHTML = amount.ExcludingTAX.toLocaleString();
  (document.getElementById('TAX') as HTMLTableCellElement).innerHTML = amount.TAX.toLocaleString();
  (document.getElementById('IncludingTAX') as HTMLTableCellElement).innerHTML = amount.IncludingTAX.toLocaleString();
  (document.getElementById('WithHoldingTAX') as HTMLTableCellElement).innerHTML = amount.WithHoldingTAX.toLocaleString();
  (document.getElementById('TransferAmount') as HTMLTableCellElement).innerHTML = amount.TransferAmount.toLocaleString();
  drawReceipt();
}
function drawReceipt() {
  const cvs: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('receipt');
  const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>cvs.getContext('2d');
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  // 領収書
  ctx.font = '20px san-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('領収書', cvs.width / 2, 5);
  // 宛名
  ctx.font = '10px san-serif';
  ctx.textAlign = 'left';
  ctx.fillText('㈱〇〇 様', 10, 30);
  // 日付
  ctx.fillText(new Date().toLocaleString('ja-JP-u-ca-japanese', {
    era: 'narrow', year: 'numeric', month: 'long', day: 'numeric'
  }), 210, 30);
  // 金額
  ctx.font = 'bold 30px san-serif';
  ctx.textAlign = 'center';
  ctx.fillText('￥' + amount.IncludingTAX.toLocaleString() + '-', cvs.width / 2, 45);
  // 消費税
  ctx.font = '8px san-serif';
  ctx.textAlign = 'left'
  ctx.fillText('消費税(10%):' + amount.TAX.toLocaleString(), 10, 100);
  // 但し書き
  let AdjustmentText: string = '';
  if (!isRegistration) AdjustmentText = ' 経過措置控除:' + amount.Adjustment.toLocaleString();
  ctx.font = '9px san-serif';
  ctx.textAlign = 'center';
  ctx.fillText('但 〇〇料として 源泉徴収税額:' + amount.WithHoldingTAX.toLocaleString() + AdjustmentText,
    cvs.width / 2, 82.5);
  // 印紙
  ctx.font = '8px san-serif';
  ctx.textAlign = 'center';
  ctx.fillText('印紙', 30, 140);
  ctx.strokeRect(10, 120, 40, 50);
  if (amount.ExcludingTAX >= 2000000) {
    ctx.fillText('600', 30, 150);
  } else if (amount.ExcludingTAX >= 1000000) {
    ctx.fillText('400', 30, 150);
  } else if (amount.ExcludingTAX >= 50000) {
    ctx.fillText('200', 30, 150);
  } else {
    ctx.beginPath();
    ctx.moveTo(50, 120);
    ctx.lineTo(10, 170);
    ctx.stroke();
  }
  // 個人情報
  ctx.font = "8px san-serif";
  ctx.textAlign = 'left';
  ctx.fillText('住所: 〇〇〇〇〇〇〇〇〇〇〇', 100, 120);
  ctx.fillText('名前: 〇〇〇〇〇〇', 100, 140);
  if (isRegistration) ctx.fillText('登録番号: T〇〇〇〇〇〇〇〇〇〇〇〇', 100, 160);
}