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
    const newTask = $('#to-do_newTask').val()
    
    if(newTask != ''){

            addAlert(newTask)

            $.ajax({
                url:'/toDo',
                method:'POST',
                data: {
                    task: newTask,
                    isDone: false
                }
            }).then(((result)=>{
                $('#to-do_newTask').val('')
                getToDoList()
                
            })).catch((err)=>{
                console.log('error sending new task to server', err);
            })
    } else{
        swal("Please enter Task");
    }

   
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
            <td data-istaskdone='${item.isDone}'>
                <input id='checkbox-${item.id}'  type="checkbox" name="" class='to-do_checkbox'>
            </td>
            <td data-task='${item.task}'>
                <p id='td-${item.id}' class='to-do_text'>${item.task}</p>
            </td>
            <td>
                <button type="button" class='delete-btn btn btn-danger'>Delete</button>
            </td>
        </tr>`)
        
        if(item.isDone === true){
           $(`#td-${item.id}`).addClass('done');
           $(`#checkbox-${item.id}`).attr('checked','checked')
        } 
    }
}


//display sweet alert to user 
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
    const id = $(this).parents('tr').data('id')
    let isTaskDone = $(this).parent().data('istaskdone');
    
    console.log(isTaskDone, id);
    
   const newTaskStatus = changeTaskStatus(isTaskDone,this)

   const text = newTaskStatus.msg;

   console.log(text);


    $.ajax({
        url:'/todo/'+id,
        method:'PUT',
        data: {
            isDone: newTaskStatus.isTaskDone
        }
    }).then(()=>{
        console.log('Put require was sent');
        getToDoList()
        completeAlert(newTaskStatus)
    }).catch((err)=>{
console.log('Put request failed',err);
    })
}

function changeTaskStatus(isTaskDone, thisCheckEvent) {
    const newTaskStatus = !isTaskDone;
    let text = $(thisCheckEvent).parent().next().children('.to-do_text').text()

    console.log(newTaskStatus, text);

    return {
        isTaskDone: newTaskStatus,
        msg: text
    };
    
}

function addAlert(newTask) {
    $('#taskAlert').append(`
    <div class="alert alert-success alert-dismissible" role="alert">
        <div>${newTask} task was created</div>
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

function completeAlert(taskText) {
    $('#taskAlert').append(`
    <div class="alert alert-primary alert-dismissible" role="alert">
        <div>${taskText.msg} task was completed!</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `)
}