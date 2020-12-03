import { themeBtn, newTodoInput, allInputMobile, activeInputMobile, completedInputMobile, allInput, activeInput, completedInput, listSortable } from './variables.js';
import { clearCompleted, changeTheme, validateInput, filterActive, filterAll, filterCompleted } from './functions.js'

// Events
document.addEventListener('DOMContentLoaded', () => {
    themeBtn.addEventListener('click', changeTheme);
    newTodoInput.addEventListener('keypress', validateInput);

    // Event for filters
    allInputMobile.addEventListener('click', filterAll);
    activeInputMobile.addEventListener('click', filterActive);
    completedInputMobile.addEventListener('click', filterCompleted);
    allInput.addEventListener('click', filterAll);
    activeInput.addEventListener('click', filterActive);
    completedInput.addEventListener('click', filterCompleted);

    // Create drag and drop
    Sortable.create(listSortable, {
        animation: 150,
    });
    clearCompleted();
});
