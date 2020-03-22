const list = document.querySelector('.list');
const result = document.querySelector('.result');
const data = JSON.parse(localStorage.getItem('listData')) || [];
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const hide = document.querySelector('.hide');
const bmiIcon = document.querySelector('.bmiIcon');
const answer = document.querySelector('.answer');
updateList(data);
//新增資料

result.addEventListener('click', function (e) {
    e.preventDefault();
    let heightValue = parseFloat(height.value);
    let weightValue = parseFloat(weight.value);
    let bmi = (weightValue / ((heightValue / 100) * (heightValue / 100))).toFixed(2);
    let today = new Date();
    let dateRecord = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //沒輸入身高就提醒
    if (!heightValue || !weightValue) {
        alert('請輸入身高體重');
        return
    }
    //bmi計算
   let bmiState= {};
    switch (true) {
        case bmi < 18.5:
            bmiState.userState = '過輕';
            bmiState.leftBorder = 'light';
            result.setAttribute('class', 'light');
            break
        case bmi >= 18.5 && bmi < 24:
            bmiState.userState = '理想';
            bmiState.leftBorder = 'ideal';
            result.setAttribute('class', 'ideal');
            break
        case bmi >= 24 && bmi < 27:
            bmiState.userState = '過重';
            bmiState.leftBorder = 'heavy';
            result.setAttribute('class', 'heavy');
            break
        case bmi >= 27 && bmi < 30:
            bmiState.userState = '輕度肥胖';
            bmiState.leftBorder = 'lowObesity';
            result.setAttribute('class', 'lowObesity');
            break
        case bmi >= 30 && bmi < 35:
            bmiState.userState = '中度肥胖';
            bmiState.leftBorder = 'middleObesity';
            result.setAttribute('class', 'middleObesity');
            break
        case bmi >= 35:
            bmiState.userState = '重度肥胖';
            bmiState.leftBorder = 'heightObesity';
            result.setAttribute('class', 'heightObesity');
            break
        default:
            return {}

    }

    //按鈕內容
    answer.textContent = bmi;
    bmiIcon.textContent = 'BMI';
    hide.textContent = '';
    //新增物件內容
    let todo = {
        border: bmiState.leftBorder,
        bmiCount: bmi,
        height: heightValue,
        weight: weightValue,
        state: bmiState.userState,
        date: dateRecord
    }

    data.push(todo);//把代辦事項存入資料庫裡
    //身高體重轉為空值
    height.value = '';
    weight.value = '';
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));

})
//切回原本按鈕
let icon = document.querySelector('.icon');
icon.addEventListener('click', iconReply, false)
function iconReply() {
    bmiIcon.textContent = '';
    answer.textContent = '';
    hide.textContent = '看結果';
    result.setAttribute('class', 'result');

}
//更新網頁
function updateList(data) {
    let str = '';
    for (let i = 0; i < data.length; i++) {
        str += `<li class="${data[i].border}">${data[i].state}<span><small>BMI</small>
    ${data[i].bmiCount}</span><span><small>體重</small>${data[i].weight}
    </span><span><small>身高</small>${data[i].height}</span><span>${data[i].date}</span>
    <a href="#" data-index="${i}">刪除</a></li>`;
    }
    list.innerHTML = str;

}

//刪除內容
list.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.nodeName != 'A') { return }
    var index = e.target.dataset.index;
    data.splice(index, 1);
    
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
})


