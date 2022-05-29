console.log('JS');

$(document).ready(()=>{
    getToDoList()
    $('#to-do_form').on('click','#submit-btn',onSubmit)
    $('#to-do_tbody').on('click','.delete-btn',onDelete)
    $('#to-do_tbody').on('change','.to-do_checkbox',onChange)
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
        if(item.isDone === false){
            tRow.append(`
        <tr data-id='${item.id}'>
            <td data-istaskdone='${item.isDone}'>
                <input  type="checkbox" name="" class='to-do_checkbox'>
            </td>
            <td data-task='${item.task}'><input type="text" id='${item.id}' class='to-do_text' value="${item.task}" disabled></td>
            <td>
                <button class='delete-btn'>Delete</button>
            </td>
        </tr>
        `)
        } else if(item.isDone === true){
            tRow.append(`
        <tr data-id='${item.id}'>
            <td data-istaskdone='${item.isDone}'>
                <input  type="checkbox" name="" class='to-do_checkbox' checked>
            </td>
            <td data-task='${item.task}'><input type="text" id='${item.id}' class='to-do_text done' value="${item.task}" disabled></td>
            <td>
                <button class='delete-btn'>Delete</button>
            </td>
        </tr>
        `)
        }
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

function onChange(){
    console.log(`I am checked`);
    const id = $(this).parents('tr').data('id')
    let isTaskDone = $(this).parent().data('istaskdone');
    
    console.log(isTaskDone, id);
    
   const newTaskStatus = changeTaskStatus(isTaskDone,this)


    $.ajax({
        url:'/todo/'+id,
        method:'PUT',
        data: {
            isDone: newTaskStatus
        }
    }).then(()=>{
        console.log('Put require was sent');
        getToDoList()
    }).catch((err)=>{
console.log('Put request failed',err);
    })
}

function changeTaskStatus(boolean, thisCheckEvent) {
    const newTaskStatus = !boolean;
    let task = $(thisCheckEvent).parent().next().children('.to-do_text')

    console.log(newTaskStatus, task);

    if(newTaskStatus === true){
        task.addClass('done')
    }else if (newTaskStatus === false){
        task.removeClass('done')
    }

    return newTaskStatus;
    
}