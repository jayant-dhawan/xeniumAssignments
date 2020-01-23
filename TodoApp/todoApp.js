var taskList = [];
function addTask(){
    var task = document.getElementById("task").value;
    taskList.unshift(task);
    var show = document.getElementById("showTask");
    var newTask = document.createElement("li");
    newTask.innerHTML = task;
    show.append(newTask);
    console.log(newTask);
}
