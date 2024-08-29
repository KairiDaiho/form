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
        const phone = document.getElementById('phoneInput').value;
        if (!/^\d{2,4}-\d{2,4}-\d{4}$/.test(phone)) {
            if (!confirm("電話番号の形式が正しくないようです。それでも続けますか？")) return;
        }
        formData.phone = phone;
        document.getElementById('phoneSummary').innerHTML = `電話番号：<b>${formData.phone}</b>`;
    }
    
    // メールアドレスの保存と表示
    if (stepNumber === 4) {
        const email = document.getElementById('emailInput').value;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            if (!confirm("メールアドレスの形式が正しくないようです。それでも続けますか？")) return;
        }
        formData.email = email;
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
        return;
    }

    goToStep(stepNumber - 1);

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

    fetch(document.getElementById('dataForm').action, {
        method: 'POST',
        body: new FormData(document.getElementById('dataForm'))
    })
    .then(response => response.text())
    .then(responseText => {
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

function inviteFriends() {
    const text = "当日友達と一緒に参加した方には『国内留学空間』で学んだ、学校では教えてくれなかった英会話表現50選！をプレゼント！さらに、友達も含め全員入会費が無料になります！";
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: "友達を誘う",
            text: text,
            url: url
        }).catch(console.error);
    } else {
        alert('この機能は現在のブラウザではサポートされていません。');
    }
}

function updateCountdown() {
    const countDownDate = new Date("Sep 30, 2024 23:59:59").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdownTimer").innerHTML = `${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdownTimer").innerHTML = "終了しました";
    }
}

setInterval(updateCountdown, 1000);


function updateProgressBar(stepNumber) {
    const totalSteps = 6;  // ステップの総数（最後のstep6も含む）
    const progressPercentage = ((stepNumber - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progressBar').style.width = progressPercentage + '%';
}

// 各ステップに進む際に進捗バーを更新するように修正
function goToStep(stepNumber) {
    // 名前の保存と表示
    if (stepNumber === 2) {
        formData.name = document.getElementById('nameInput').value;
        document.getElementById('nameSummary').innerHTML = `名前：<b>${formData.name}</b>`;
    }
    
    // 電話番号の保存と表示
    if (stepNumber === 3) {
        const phone = document.getElementById('phoneInput').value;
        if (!/^\d{2,4}-\d{2,4}-\d{4}$/.test(phone)) {
            if (!confirm("電話番号の形式が正しくないようです。それでも続けますか？")) return;
        }
        formData.phone = phone;
        document.getElementById('phoneSummary').innerHTML = `電話番号：<b>${formData.phone}</b>`;
    }
    
    // メールアドレスの保存と表示
    if (stepNumber === 4) {
        const email = document.getElementById('emailInput').value;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            if (!confirm("メールアドレスの形式が正しくないようです。それでも続けますか？")) return;
        }
        formData.email = email;
        document.getElementById('emailSummary').innerHTML = `メールアドレス：<b>${formData.email}</b>`;
    }

    // 各ステップの表示を切り替え
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`step${i}`).style.display = 'none';
    }
    document.getElementById(`step${stepNumber}`).style.display = 'block';

    // 進捗バーを更新
    updateProgressBar(stepNumber);
}
