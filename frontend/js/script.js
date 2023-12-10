const tbody = document.querySelector('tbody');
const form = document.querySelector('.task-form');
const newTaskInput = document.querySelector('.task-input')

const fetchTasks = async () => {
    let tasks = {};
    await fetch("http://localhost:3333/tasks")
    .then( async (res) => {
        const tasksRes = await res.json();
        return tasksRes
    }).then((data) => {
        tasks = data
        
    })
    .catch((err) => console.log(err))
    
    return(tasks)
}

const createTask = async (event) => {
    event.preventDefault();

    const task = {title: newTaskInput.value}
    await fetch("http://localhost:3333/tasks", {
        method: 'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
    })

    loadTasks()
    newTaskInput.value = ''

}

const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete',
    })
    loadTasks();

}

const editTask = async ({id, title, status}) =>{
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, status}),
    });

    loadTasks();

}



function createElement(tag, innerText = '', innerHTML = ''){
    const element = document.createElement(tag);
    if(innerText){
        element.innerText = innerText;
    }
    if(innerHTML){
        element.innerHTML = innerHTML;
    }
    
    return element;
}

function createSelect(value){
    const options = `
        <option value="pendente">Pendente</option>
        <option value="andamento">Em andamento</option>
        <option value="andamento">Concluído</option>
    `
    const select = createElement('select', '', options);
    select.value = value;
    return select;
}

const formatDate = (dateUTC) =>{
    const options = {
        dateStyle: 'long',
        timeStyle: 'short',
    }
    const date = new Date(dateUTC).toLocaleString('pt-br', options)

    return date
}


function createRow(task){
    const { id, title, status, created_at} = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreated_at = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const editForm = createElement('form');
    const editInput = createElement('input');
    editForm.appendChild(editInput);


    const select = createSelect(status);

    select.addEventListener('change', (event)=>{editTask({...task, status: event.target.value})})

    const tdActions= createElement('td');

    const editButton = createElement('btn', '', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('btn', '', '<span class="material-symbols-outlined">delete</span>');


    editButton.classList.add('btn-action')
    deleteButton.classList.add('btn-action')

    deleteButton.addEventListener('click', () => {deleteTask(id)})
    editButton.addEventListener('click', ()=> {
        editInput.value = title;
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm)
    })

    editForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        editTask({id, status, title: editInput.value});

    })

    tdStatus.appendChild(select)
    tdActions.appendChild(editButton)
    tdActions.appendChild(deleteButton)
    tr.appendChild(tdTitle);
    tr.appendChild(tdCreated_at);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;
}

const loadTasks = async () => {
    tbody.innerHTML = '';
    const tasks = await fetchTasks();
    tasks.map((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    })
}

form.addEventListener('submit', createTask)

loadTasks()




