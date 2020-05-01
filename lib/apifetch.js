async function getAllTodos(){
    console.log('getAllTodos');
    return await fetch('https://localhost:5001/api/todo', {metod: 'GET'});
}

async function getTodobyId() {
    console.log('getTodobyId');
}

async function insertTodo(todoItem) {
    console.log('insertTodo' + todoItem);
}

async function updateTodo(todoItem) {
    console.log('updateTodo' + todoItem);
}

async function deleteTodo(todoItemId) {
    console.log('deleteTodo' + todoItemId);
}

module.exports = {
    getAllTodos,
    getTodobyId,
    insertTodo,
    updateTodo,
    deleteTodo
};