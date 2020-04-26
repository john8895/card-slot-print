const table = document.getElementById('table');
const changeBtn = document.getElementById('changeBtn');
const printBtn = document.getElementById('print');
let numCount;

changeBtn.addEventListener('click', changeFormatHandle);

function changeFormatHandle() {
    "use strict"
    let text = document.getElementById('text');
    const list = document.createElement('ul');
    const formatTypeObj = document.getElementById('formatType');
    let formatType;


    // 選擇格式
    let typeChild = formatTypeObj.getElementsByTagName('input');

    // console.log(typeChild);
    for (let key in typeChild) {
        if (typeChild[key].checked) {
            formatType = typeChild[key].value;
        }
    }

    // 處理字串
    let arr = text.value.split('\n'); // 以斷行切成array

    for (var i = 0; i < arr.length; i++) {
        arr[i] += '<br/>'; // 每行加br
        arr[i] = arr[i].replace(/^\s? | \s$/g, ''); // 去除前後空白
        arr[i] = arr[i].replace(/<br\/>$/g, ''); // 如果最後有br
    }

    //內板序號
    if (table.children.length > 0) {
        numCount++;
    } else {
        numCount = 1;
    }
    list.setAttribute('data-num', numCount);

    // 去掉空數組，以免輸出時計數錯誤導致樣式套不到
    for (let key in arr) {
        if (arr[key] === '') {
            arr.splice(key, 1)
        }
    }
    // 輸出格式
    for (var i = 0; i < arr.length; i++) {
        list.classList.add('list');
        let liObj = document.createElement('li');
        switch (formatType) {
            //one , singleAdd , twoAdd , thirdAdd
            case 'singleAdd':
                liObj.classList.add(i === arr.length - 1 ? 'singleAdd' : 'item');
                liObj.classList.add(i === arr.length - 2 ? 'last' : 'item');
                break;
            case 'twoAdd':
                list.classList.add(i === arr.length - 1 ? 'twoAddUl' : 'listObj');
                liObj.classList.add(i === arr.length - 1 ? 'twoAdd' : 'item');
                liObj.classList.add(i === arr.length - 2 ? 'last' : 'item');
                break;
            case 'third':
                list.classList.add(i === arr.length - 1 ? 'thirdUl' : 'listObj');
                liObj.classList.add(i === arr.length - 1 ? 'last' : 'item');
                break;
            case 'thirdAdd':
                list.classList.add(i === arr.length - 1 ? 'thirdAddUl' : 'listObj');
                liObj.classList.add(i === arr.length - 1 ? 'thirdAdd' : 'item');
                liObj.classList.add(i === arr.length - 2 ? 'last' : 'item');
                break;
            default:
                break;
        }

        liObj.innerHTML = arr[i];
        list.appendChild(liObj);
        table.appendChild(list);
    }
    text.value = '';
}

//預覽列印
printBtn.addEventListener('click', printHandle);

function printHandle() {
    if (!table.children.length) {
        alert('還沒有內容可以印喔！')
        return;
    }
    let printTitle = '預覽列印',
        printContent = table.innerHTML,
        printWindow = window.open('', '_blank', '', false);

    printWindow.document.write(
        '<html>' +
        '<head>' +
        '<meta name="charset" content="utf-8" />' +
        '<title>' + printTitle + '</title>' +
        '<link rel="stylesheet" href="style.css"/>' +
        '</head>' +
        '<body>' + printContent + '</body>' +
        '</html>'
    );
    // printWindow.print();
    // printWindow.close();
}