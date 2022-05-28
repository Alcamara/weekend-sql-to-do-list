console.log('JS');

$(document).ready(()=>{
    getToDoList()
    $('#to-do_form').on('click','#submit-btn',onSubmit)
    $('#to-do_tbody').on('click','.delete-btn',onDelete)
})

function onSubmit() {
    console.log('JQ');
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
            <td><input type="text" value="${item.task}" disabled></td>
            <td>${item.isDone}</td>
            <td>
                <input type="checkbox" name="" id="">
            </td>
            <td>
                <button class='delete-btn'>Delete</button>
            </td>
        </tr>
        `)
    }
}

function onDelete (){
    
    const id = $(this).parents('tr').data('id')
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