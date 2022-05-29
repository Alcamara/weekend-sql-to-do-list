console.log('JS');

$(document).ready(()=>{
    getToDoList()
    $('#to-do_form').on('click','#submit-btn',onSubmit)
    $('#to-do_tbody').on('click','.delete-btn',confirmDelete)
    $('#to-do_tbody').on('change','.to-do_checkbox',onChange)
    
})

/*
function that takes in value and
sent a post request to server
*/
function onSubmit(e) {
    e.preventDefault()
    addAlert()

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
            <td data-task='${item.task}'>
                <p class='to-do_text'>${item.task}</p>
            </td>
            <td>
                <button type="button" class='delete-btn btn btn-danger'>Delete</button>
            </td>
        </tr>
        `)
        } else if(item.isDone === true){
            tRow.append(`
        <tr data-id='${item.id}'>
            <td data-istaskdone='${item.isDone}'>
                <input  type="checkbox" name="" class='to-do_checkbox' checked>
            </td>
            <td data-task='${item.task}'>
                <p class='to-do_text done'>${item.task}</p>
            </td>
            <td>
                <button type="button" class='delete-btn btn btn-danger'>Delete</button>
            </td>
        </tr>
        `)
        }
    }
}



function confirmDelete() {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            
          swal("Poof! Your task deleted!", {
            icon: "success",
          });
          onDelete(this)
        } else {
          swal("Your task is safe!");
        }
      });
}

/*
on click sends a delete
request to server and
display new list
*/
function onDelete (thisArg){
    //deleteAlert()
    
    const id = $(thisArg).parents('tr').data('id')
    const task = $(thisArg).parents('tr')
    console.log(id);

    $.ajax({
        url:`toDo/${id}`,
        method: 'DELETE'
    }).then(()=>{
        console.log('sent delete request');
        getToDoList()
    }).catch((err)=>{
        console.log('delete request failed');
    })
}

function onChange(){
    completeAlert()
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

function addAlert() {
    $('#taskAlert').append(`
    <div class="alert alert-success alert-dismissible" role="alert">
        <div>Task was created</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `)
}

function deleteAlert() {
    $('#taskAlert').append(`
    <div class="alert alert-danger alert-dismissible" role="alert">
        <div>New task was deleted</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `)
}

function completeAlert() {
    $('#taskAlert').append(`
    <div class="alert alert-primary alert-dismissible" role="alert">
        <div>Task was completed!</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `)
}