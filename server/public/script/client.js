console.log('JS');

$(document).ready(()=>{
    getToDoList()
    $('#to-do_form').on('click','#submit-btn',onSubmit)
})

function onSubmit() {
    console.log('JQ');
}

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

function displayTask(get) {
    let tRow = $('#to-do_tbody');
    console.log(tRow);
    for (let item of get) {
        tRow.append(`
        <tr id='${item.id}'>
            <td><input type="text" value="${item.task}" disabled></td>
            <td>${item.isDone}</td>
            <td>
                <input type="checkbox" name="" id="">
            </td>
            <td>
                <button>Delete</button>
            </td>
        </tr>
        `)
    }
}