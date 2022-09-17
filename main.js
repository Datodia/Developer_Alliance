const form = document.getElementById('my-form')
const nameInput = document.getElementById('name')
const surnameInput = document.getElementById('surname')
const addressInput = document.getElementById('address')
const dateInput = document.getElementById('date')
const sexInput = document.getElementById('sex')
const aboutInput = document.getElementById('about')
const error = document.getElementById('error')
const users = document.getElementById('users')
const btn = document.getElementById('my-btn')



let counter = 0;
btn.addEventListener("click", () => {
    counter++
});



function removeItem() {
    localStorage.clear()
    alert('Localstorage deleted')
    reload()
}



const inputs = [nameInput, surnameInput, addressInput];
for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.addEventListener('input', function () {
        if (!hasAppError === true) return
        error.textContent = "";
        hasAppError = false;
    })

}



form.addEventListener('submit', onSumbit);


let hasAppError = false;


function isValidInput(name, surname, address) {
    if (name === "" || surname === "" || address === "") {
        return false;
    }

    return true;
}

//form submit handler
function onSumbit(event) {
    event.preventDefault();

    const userName = nameInput.value;
    const userSurname = surnameInput.value;
    const userAddress = addressInput.value;
    const userDate = dateInput.value;
    const userSex = sexInput.value;
    const userAbout = aboutInput.value;
    let userNumber = counter;

    let userData = [];
    let showData = {
        name: userName,
        lname: userSurname,
        adress: userAddress,
        data: userDate,
        sex: userSex,
        about: userAbout,
        number: userNumber
    };
    userData.push(showData);

    const isValidValues = isValidInput(userName, userSurname, userAddress);

    if (!isValidValues) {
        error.textContent = 'Please fill all requaried inputs'
        hasAppError = true;
        return;
    } else {
        userData = userData.concat(JSON.parse(localStorage.getItem('userData') || '[]'))
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData);

        // როგორც returnLocalStorageItem-ში ანალოგიურად მასე ვიღებთ დატას და უბრალოდ საბმითზე user-ების
        // დივშიც ვსვამთ და პახოდუ localStorage-შიც ვინახავთ
        let html = `
            <div class="userContainer">
                <h1>ID:  ${showData.number}</h1>
                <h1>NAME:  ${showData.name}</h1>
                <h1>LAST NAME:  ${showData.lname}</h1>
                <h1>ADDRESS:  ${showData.adress}</h1>
                <h1>DATE OF BIRTH:  ${showData.data}</h1>
                <h1>SEX:  ${showData.sex}</h1>
                <h1>ABOUT: ${showData.about}</h1>
                <button onclick="myFunction()">DELETE</button>
            </div>
        `;
        users.innerHTML += html;
    }

    // console.log(isValidValues)
}


document.addEventListener("DOMContentLoaded", returnLocalStorageItems);

// ამ ფუნქციით ვაბრუნებთ localStorage-ში შენახულ დატას და ვსვამთ user-ების დივში
function returnLocalStorageItems() {
    let userFromLocalStorage = JSON.parse(localStorage.getItem('userData'))
    console.log('hihi', userFromLocalStorage)
    // IF ELSE - იმისთვის რომ თუ localStorage-ში არაფერი იქნება თავიდან ერორი არ ამოაგდოს
    if (userFromLocalStorage === null) {
        return
    } else {
        // აქ forEach ციკლით გადავუვლით user-ების მასივს localStorage-ში და ვაბრუნებთ 
        // user-ის მონაცემებს
        userFromLocalStorage.forEach(item => {
            const userInfo = {
                id: item.number,
                name: item.name,
                lname: item.lname,
                adress: item.adress,
                data: item.data,
                sex: item.sex,
                about: item.about
            }

            let html = `
                <div class="userContainer">
                    <h1>ID:  ${userInfo.id}</h1>
                    <h1>NAME:  ${userInfo.name}</h1>
                    <h1>LAST NAME:  ${userInfo.lname}</h1>
                    <h1>ADDRESS:  ${userInfo.adress}</h1>
                    <h1>DATE OF BIRTH:  ${userInfo.data}</h1>
                    <h1>SEX:  ${userInfo.sex}</h1>
                    <h1>ABOUT:  ${userInfo.about}</h1>
                    <button onclick="removeItem()">DELETE</button>
                </div>
            `;

            users.innerHTML += html;
        });
    }
}

function addListItem() {
    let userFromLocalStorage = JSON.parse(localStorage.getItem('userData'))
    console.log('hihi', userFromLocalStorage)
}
