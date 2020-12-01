// Variables
const newTodoInput = document.querySelector('.new-to-do-input');
const btnAdd = document.querySelector('.btnAdd');
const listDiv = document.querySelector('.list-add');
const listSortable = document.querySelector('.list-sortable');
const themeBtn = document.querySelector('.icon-header');
const listInfo = document.querySelector('.list-info');
const counterList = document.querySelector('.counter-list');
listArray = [];

// Events
document.addEventListener('DOMContentLoaded', () => {
    themeBtn.addEventListener('click', changeTheme);
    newTodoInput.addEventListener('keypress', validateInput);

    // Create drag and drop
    Sortable.create(listSortable, {
        animation: 150,
    });
});

// Funciones
function changeTheme(e){
    if (document.body.classList.contains('is-dark-theme')) {
        document.body.classList.remove('is-dark-theme');
        e.target.classList.remove('theme-animation');
    } else {
        document.body.classList.add('is-dark-theme');
        e.target.classList.add('theme-animation');
    };
};

function validateInput(e){
    if(e.key === 'Enter'){
        let dataInput = {
            msg : newTodoInput.value,
            id : Date.now()
        };
        if(dataInput.msg !== ''){
            listArray = [...listArray, dataInput];
            addList(listArray);
        };
    };
};

function addList(arrList){
    clearHTML();
    arrList.forEach(message => {
        const spanTodoDiv = document.createElement('span');
        spanTodoDiv.classList.add('to-do');
        spanTodoDiv.dataset.id = message.id;
        spanTodoDiv.innerHTML += `
            <div class="radio-list">
                <span class="radio-list-img">
                     <img class="hidden" src="/images/icon-check.svg" alt="checked">
                </span>
            </div>
            <p>${message.msg}</p>
            <img class="deleteBtn" data-id=${message.id} src="/images/icon-cross.svg" alt="delete">
        `;

        listSortable.appendChild(spanTodoDiv);
    });

    // Counter
    updateCounter();

    // Radio checked and delete list
    if(listArray.length){
        checkRadio();
        deleteList();
    }
}

function checkRadio() {
    const radioChecked = document.querySelectorAll('.radio-list');
    radioChecked.forEach(elementList => {
        elementList.addEventListener('click', e => {
            let focusElement = e.target;
            if(focusElement.classList.contains('radio-list')){
                if(focusElement.classList.contains('gradient-background')){
                    focusElement.classList.remove('gradient-background');
                    focusElement.nextElementSibling.classList.remove('strike-paraph');
                    focusElement.children[0].classList.add('visible');
                    focusElement.children[0].classList.remove('hidden');
                } else {
                    focusElement.classList.add('gradient-background');
                    focusElement.nextElementSibling.classList.add('strike-paraph');
                    focusElement.children[0].classList.remove('visible');
                    focusElement.children[1].children[0].classList.add('hidden');
                }
            } else {
                console.log();
                focusElement.parentNode.classList.add('gradient-background');
                focusElement.parentNode.nextElementSibling.classList.add('strike-paraph');
                focusElement.classList.remove('visible');
                focusElement.classList.add('hidden');
            }
        })
    });
}

function deleteList(){
    const btnDelete = document.querySelectorAll('.deleteBtn');
    btnDelete.forEach(button => {
        button.addEventListener('click', e => {
            elementId = Number(e.target.getAttribute('data-id'));
            listArray = listArray.filter(list => list.id !== elementId);
            if (Number(e.target.parentNode.getAttribute('data-id')) === elementId) {
                e.target.parentNode.remove()
            }
            updateCounter();
        });
    })
}

function updateCounter(){
    counterList.textContent = listArray.length;
}

function clearHTML() {
    while (listSortable.firstChild) {
        listSortable.removeChild(listSortable.firstChild);
    };
};