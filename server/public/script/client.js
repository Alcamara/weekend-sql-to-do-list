console.log('JS');

$(document).ready(()=>{
    getToDoList()
    $('#to-do_form').on('click','#submit-btn',onSubmit)
    $('#to-do_tbody').on('click','.delete-btn',onDelete)
})

/*
function that takes in value and
sent a post request to server
*/
function onSubmit(e) {
    e.preventDefault()

    $.ajax({
        url:'/toDo',
        method:'POST',
        data: {
            task: $('#to-do_newTask').val(),
            isDone: false
        }
    }).then(((result)=>{
        $('#to-do_newTask').val('')
        getToDoList()
        alert('New Task Was Added')
    })).catch((err)=>{
        console.log('error sending new task to server', err);
    })

   
}

// get todo list from database
function getToDoList() {
    
    $.ajax({
        url:'toDo',
        method:'GET'
    }).then((tasks)=>{
        console.log(tasks);
        displayTask(tasks)
    }).catch((err)=>{
        console.log('error getting getting task',err);
    })
}

//display tasks table
function displayTask(get) {
    let tRow = $('#to-do_tbody');

    tRow.empty()

    for (let item of get) {
        tRow.append(`
        <tr data-id='${item.id}'>
            <td data-isDone='${item.isDone}'>
                <input  type="checkbox" name="" id="">
            </td>
            <td><input type="text" value="${item.task}" disabled></td>
            <td>
                <button class='delete-btn'>Delete</button>
            </td>
        </tr>
        `)
    }
}

/*
on click sends a delete
request to server and
display new list
*/
function onDelete (){
    
    const id = $(this).parents('tr').data('id')
    const task = $(this).parents('tr')
    console.log(id);

    $.ajax({
        url:`toDo/${id}`,
        method: 'DELETE'
    }).then(()=>{
        console.log('sent delete request');
        alert(`Task has been remove!`)
        getToDoList()
    }).catch((err)=>{
        console.log('delete request failed');
    })
}