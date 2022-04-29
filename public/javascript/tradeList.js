let tradeButton = document.getElementById('tradeButton');
let tradeList = document.getElementById('tradeList');
tradeList.style.display = 'none';

tradeButton.addEventListener('click', function () {
    if (tradeList.style.display == 'none') {
        tradeList.style.display = 'block';
    }
    else {
        tradeList.style.display = 'none';
    }
}
);

let tradeListCancel = document.getElementById('tradeListCancel');
tradeListCancel.addEventListener('click', function () {
    tradeList.style.display = 'none';
}
);
