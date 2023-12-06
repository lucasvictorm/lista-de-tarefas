const fetchTasks = async () => {
    await fetch("http://localhost:3333/tasks")
    .then( async (res) => {
        const tasks = await res.json();
        return tasks;
        
    })
    .catch((err) => console.log(err))
    
}

