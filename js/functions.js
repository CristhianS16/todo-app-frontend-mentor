import { newTodoInput, listSortable, counterList } from "./variables.js";

let listArray = [];
// Funciones
export function changeTheme(e){
    if (document.body.classList.contains('is-dark-theme')) {
        document.body.classList.remove('is-dark-theme');
        e.target.classList.remove('theme-animation');
    } else {
        document.body.classList.add('is-dark-theme');
        e.target.classList.add('theme-animation');
    };
};

export function validateInput(e){
    if(e.key === 'Enter'){
        let dataInput = {
            msg : newTodoInput.value,
            id : Date.now()
        };
        if(dataInput.msg !== ''){
            creatingHTML(dataInput);
            newTodoInput.value = '';
        };
    };
};

export function creatingHTML(dataInput){
    const spanTodoDiv = document.createElement('span');
    spanTodoDiv.classList.add('to-do');
    spanTodoDiv.dataset.id = dataInput.id;
    spanTodoDiv.innerHTML += `
        <div class="radio-list" data-id="${dataInput.id}">
            <span class="radio-list-img" data-id="${dataInput.id}">
            </span>
        </div>
        <p>${dataInput.msg}</p>
        <img class="deleteBtn" data-id="${dataInput.id}" src="/images/icon-cross.svg" alt="delete">
    `;

    listArray = [...listArray, spanTodoDiv];
    
    // Print to DOM
    printHTML(listArray);

    // Checked, delete and more..
    if(listArray.length){
        checkRadio(spanTodoDiv);
        deleteList();
    }
};

export function printHTML(arrList){
    arrList.forEach(list => listSortable.appendChild(list));
    updateCounter(listArray);
};

export function checkRadio(spanDiv) {
    let spanChildren = spanDiv.children[0];
    spanChildren.onclick = e => addingStyles(e);
};

export function addingStyles(list){
    list = list.target;
    if(list.classList.contains('radio-list')){
        if(list.classList.contains('gradient-background')){
            list.classList.remove('gradient-background');
            list.nextElementSibling.classList.remove('strike-paraph');
            list.children[0].classList.add('visible');
            list.children[0].classList.remove('hidden');
        } else {
            list.classList.add('gradient-background');
            list.nextElementSibling.classList.add('strike-paraph');
            list.children[0].classList.remove('visible');
            list.children[0].classList.add('hidden');
        }
    } else {
        if(list.parentNode.classList.contains('gradient-background')){
            list.parentNode.classList.remove('gradient-background');
            list.parentNode.nextElementSibling.classList.remove('strike-paraph');
            list.classList.add('visible');
            list.classList.remove('hidden');
        } else {
            list.parentNode.classList.add('gradient-background');
            list.parentNode.nextElementSibling.classList.add('strike-paraph');
            list.classList.remove('visible');
            list.classList.add('hidden');
        }
    }
    
}

export function deleteList(){
    const btnDelete = document.querySelectorAll('.deleteBtn');
    btnDelete.forEach(button => {
        button.addEventListener('click', e => {
            let elementId = e.target.getAttribute('data-id');
            listArray = listArray.filter(list => list.getAttribute('data-id') !== elementId);
            clearHTML();
            printHTML(listArray);
            updateCounter(listArray);
        });
    })
}

export function updateCounter(arrList){
    counterList.textContent = arrList.length;
}

export function clearCompleted(){
    const clearCompletedBtn = document.querySelector('.clear-completed');
    clearCompletedBtn.addEventListener('click', () => {
        const arrayCompletedList = document.querySelectorAll('.gradient-background');
        if(arrayCompletedList.length){
            let arrayDivCompleted = [];
            arrayCompletedList.forEach(completed => {
                arrayDivCompleted = [...arrayDivCompleted, completed.parentNode.getAttribute('data-id')];
            });
            arrayDivCompleted.forEach(completedId => {
                listArray = listArray.filter(list => list.getAttribute('data-id') !== completedId);
            });
            clearHTML();
            printHTML(listArray);
            updateCounter(listArray);
        }
    })
}

// Functions of filter
export function filterAll(e){
    let attributeInput = e.target.getAttribute('checked');
    if (attributeInput !== null){
        e.target.removeAttribute('checked');
    } else {
        e.target.setAttribute('checked', '');
        clearHTML();
        printHTML(listArray);
        updateCounter(listArray);
    }
}
export function filterActive(e){
    let attributeInput = e.target.getAttribute('checked');
    if (attributeInput !== null){
        e.target.removeAttribute('checked');
    } else {
        e.target.setAttribute('checked', '');
        let listArrayActive = [];
        listArrayActive = listArray.filter(list => !list.children[0].classList.contains('gradient-background'));
        clearHTML();
        printHTML(listArrayActive);
        updateCounter(listArrayActive);
    }
}
export function filterCompleted(e){
    let attributeInput = e.target.getAttribute('checked');
    if (attributeInput !== null){
        e.target.removeAttribute('checked');
    } else {
        e.target.setAttribute('checked', '');
        let listArrayCompleted = [];
        listArray.forEach(list => {
            if((list.children[0].classList.contains('gradient-background'))){
                listArrayCompleted = [...listArrayCompleted, list];
            }
        })
        clearHTML();
        printHTML(listArrayCompleted);
        updateCounter(listArrayCompleted);
    }
}


export function clearHTML() {
    while (listSortable.firstChild) {
        listSortable.removeChild(listSortable.firstChild);
    };
};