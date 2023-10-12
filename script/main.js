import { Calculation } from './CalculationAmount.js';
let inputPrice;
let isRegistration;
let isTakeHomePayment;
let amount;
function invoiceChange() {
    let Registration = document.getElementById('isRegistration');
    if (Registration.value == 'true') {
        isRegistration = true;
    }
    else {
        isRegistration = false;
    }
    console.log('Reg:' + isRegistration);
    btn_click();
}
function selectChange() {
    let TakeHomePayment = document.getElementById('isTakeHomePayment');
    if (TakeHomePayment.value == 'true') {
        isTakeHomePayment = true;
    }
    else {
        isTakeHomePayment = false;
    }
    console.log('Cal:' + isTakeHomePayment);
    btn_click();
}
function btn_click() {
    inputPrice = Number(document.getElementById('inputPrice').value);
    try {
        amount = new Calculation(inputPrice, isRegistration, isTakeHomePayment);
    }
    catch (error) {
        console.error(error.message);
        alert(error.message);
        amount = new Calculation(0, true, true);
    }
    finally {
        console.log(amount);
        document.getElementById('BasePrice').innerHTML = amount.BasePrice.toLocaleString();
        document.getElementById('Adjustment').innerHTML = amount.Adjustment.toLocaleString();
        document.getElementById('ExcludingTAX').innerHTML = amount.ExcludingTAX.toLocaleString();
        document.getElementById('TAX').innerHTML = amount.TAX.toLocaleString();
        document.getElementById('IncludingTAX').innerHTML = amount.IncludingTAX.toLocaleString();
        document.getElementById('WithHoldingTAX').innerHTML = amount.WithHoldingTAX.toLocaleString();
        document.getElementById('TransferAmount').innerHTML = amount.TransferAmount.toLocaleString();
        drawReceipt();
    }
}
function drawReceipt() {
    const cvs = document.getElementById('receipt');
    const ctx = cvs.getContext('2d');
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
    ctx.textAlign = 'left';
    ctx.fillText('消費税(10%):' + amount.TAX.toLocaleString(), 10, 100);
    // 但し書き
    let AdjustmentText = '';
    if (!isRegistration)
        AdjustmentText = ' 経過措置控除:' + amount.Adjustment.toLocaleString();
    ctx.font = '9px san-serif';
    ctx.textAlign = 'center';
    ctx.fillText('但 〇〇料として 源泉徴収税額:' + amount.WithHoldingTAX.toLocaleString() + AdjustmentText, cvs.width / 2, 82.5);
    // 印紙
    ctx.font = '8px san-serif';
    ctx.textAlign = 'center';
    ctx.fillText('印紙', 30, 140);
    ctx.strokeRect(10, 120, 40, 50);
    if (amount.ExcludingTAX < 50000) {
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
    if (isRegistration)
        ctx.fillText('登録番号: T〇〇〇〇〇〇〇〇〇〇〇〇', 100, 160);
}
window.main = {
    invoiceChange,
    selectChange,
    btn_click
};
