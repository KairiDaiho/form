let formData = {
    name: '',
    phone: '',
    email: '',
    date: ''
};

function goToStep(stepNumber) {
    // 名前の保存と表示
    if (stepNumber === 2) {
        formData.name = document.getElementById('nameInput').value;
        document.getElementById('nameSummary').innerHTML = `名前：<b>${formData.name}</b>`;
    }
    
    // 電話番号の保存と表示
    if (stepNumber === 3) {
        formData.phone = document.getElementById('phoneInput').value;
        document.getElementById('phoneSummary').innerHTML = `電話番号：<b>${formData.phone}</b>`;
    }
    
    // メールアドレスの保存と表示
    if (stepNumber === 4) {
        formData.email = document.getElementById('emailInput').value;
        document.getElementById('emailSummary').innerHTML = `メールアドレス：<b>${formData.email}</b>`;
    }

    // 各ステップの表示を切り替え
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`step${i}`).style.display = 'none';
    }
    document.getElementById(`step${stepNumber}`).style.display = 'block';
}

function selectDate(date) {
    formData.date = date;
    document.getElementById('dateSummary').innerHTML = `体験会参加日：<b>${formData.date}</b>`;
    document.getElementById('confirmDate').innerHTML = `体験会参加日：<b>${formData.date}</b>`;
    goToStep(5);
}

function goBack(stepNumber) {
    if (stepNumber === 1) {
        // 初めのステップは「戻る」ボタンを無効にするか、ページリロードの処理にする
        return;
    }

    goToStep(stepNumber - 1);

    // 「戻る」ボタンを押すと以前の入力をそのまま表示
    if (stepNumber === 2) {
        document.getElementById('nameInput').value = formData.name;
    } else if (stepNumber === 3) {
        document.getElementById('phoneInput').value = formData.phone;
    } else if (stepNumber === 4) {
        document.getElementById('emailInput').value = formData.email;
    }
}

function complete() {
    document.getElementById('formName').value = formData.name;
    document.getElementById('formPhone').value = formData.phone;
    document.getElementById('formEmail').value = formData.email;
    document.getElementById('formDate').value = formData.date;

    // フォームを送信してGoogle Apps Scriptにデータを送信
    fetch(document.getElementById('dataForm').action, {
        method: 'POST',
        body: new FormData(document.getElementById('dataForm'))
    })
    .then(response => response.text())
    .then(responseText => {
        // 送信が成功した場合、step6に進む
        if (responseText.trim() === 'OK') {
            goToStep(6);
        } else {
            alert('エラーが発生しました: ' + responseText);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('送信中にエラーが発生しました。');
    });
}


document.querySelector('.line-button').addEventListener('click', function() {
    window.location.href = 'https://line.me/R/ti/p/%40609swigi';
});







