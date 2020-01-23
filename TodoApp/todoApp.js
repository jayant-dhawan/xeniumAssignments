var taskList = [];
var show = document.getElementById("showTask");

function addTask() {
     var task = document.getElementById("task").value;
    // var newDiv = document.createElement("div");
    // var newTask = document.createElement("li");
    // var buttonDone = document.createElement("buttonDone");
    // var buttonDelete = document.createElement("buttonDelete");
    // taskList.unshift(task);
    // newDiv.setAttribute("id", taskList.length);
    // buttonDone.setAttribute("onclick", "doneTask(" + taskList.length + ");");
    // buttonDone.innerText = "Done";
    // buttonDelete.setAttribute("onclick", "deleteTask(" + taskList.length + ");");
    // buttonDelete.innerText = "Done";
    // newTask.innerHTML = task;
    // newDiv.append(newTask);
    // newDiv.append(buttonDone);
    // newDiv.append(buttonDelete)
    // show.prepend(newDiv);
    // console.log(newTask);
    if(window.localStorage.getItem('task'))
        taskList = window.localStorage.getItem('task').split(',');
    taskList.unshift(task);
    window.localStorage.setItem('task',taskList);
    reload();

}

function deleteTask(par) {
    console.log(par);
    var parent = document.getElementById(par).parentNode;
    parent.removeChild(document.getElementById(par));
    taskList.splice(par, 1);
    window.localStorage.setItem('task', taskList);
    addItem();
}

function doneTask(par) {
    console.log(par);
    var node = document.getElementById(par).firstChild;
    node.setAttribute("style", "text-decoration: line-through");

}

function addItem() {
    if (window.localStorage.getItem("task")) {
        taskList = window.localStorage.getItem("task").split(',');
        console.log(taskList);
    }
    show.innerHTML = "";
    taskList.forEach(function (d) {
        var newDiv = document.createElement("div");
        var newTask = document.createElement("li");
        var buttonDone = document.createElement("button");
        var buttonDelete = document.createElement("button");
        newDiv.setAttribute("id", taskList.indexOf(d));
        buttonDone.setAttribute("onclick", "doneTask(" + taskList.indexOf(d) + ");");
        buttonDone.innerText = "Done";
        buttonDelete.setAttribute("onclick", "deleteTask(" + taskList.indexOf(d) + ");");
        buttonDelete.innerText = "Delete";
        newTask.innerHTML = d;
        newTask.setAttribute("class","tab")
        newTask.setAttribute("style","display:inline-block;float : center");
        newDiv.setAttribute("class","tabs")
        buttonDone.setAttribute("class","btn waves-effect green")
        buttonDelete.setAttribute("class","btn waves-effect red darken-2")
        newDiv.append(newTask);
        newDiv.append(buttonDone);
        newDiv.append(buttonDelete);

        show.append(newDiv);
    });
}
window.onload = function () {
    addItem();
}