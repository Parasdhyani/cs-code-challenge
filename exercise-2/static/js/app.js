// using IIFE to avoid polluting the global object, and encapsulate the data.

let actionComponents = (function() {
  return  {
    taskInput : document.getElementById("new-task"),
    incompleteTasksHolder  : document.getElementById("incomplete-tasks"),
    addButton : document.getElementsByTagName("button")[0],
    completedTasksHolder : document.getElementById("completed-tasks"),
    localStorageComponentList : document.getElementsByClassName("localStorageComponent"),
  }
})();

let commonUtilities = {

  getInnerHtml: function(documentComponent) {
    return documentComponent.innerHTML;
  },

//The below object will define all related activities regarding the local storage. 
//This also consist of loading the data from local storage and display on the UI.
//We have tried to make this generic, and create in such as way that if something new comes up
// the below code wil run with minimum changes.

  localStorage: {
   keys: {
    toDoItem: "toDoItem",
    completedItem: "completedItem"
   },
   //the data will be fetch from local storage
   loadDataFromLocalStorage: function() {

    for (let i = 0; i < actionComponents.localStorageComponentList.length; i++) {
      let component = actionComponents.localStorageComponentList[i];
      //fetching key from DOM only.
      let localStorageKey = component.getAttribute("local-storage-key");
      if(localStorageKey) {
       // let componentId = component.getAttribute("id");
       component.innerHTML = commonUtilities.localStorage.getItem(localStorageKey)
      }
    }
   }, 

   setItem: function(key, value) {
     localStorage.setItem(key, value);
   },
   getItem: function(key) {
     return localStorage.getItem(key)
   },

   updateLocalStorage: function() {
    commonUtilities.localStorage
    .setItem(commonUtilities.localStorage.keys.toDoItem,
     commonUtilities.getInnerHtml(actionComponents.incompleteTasksHolder));

    commonUtilities.localStorage
    .setItem(commonUtilities.localStorage.keys.completedItem,
     commonUtilities.getInnerHtml(actionComponents.completedTasksHolder));

   },
  },

isFieldEmpty: function(componentValue) {
  return !componentValue.trim();
   },

    performAllInitialProcessing: function() {

    actionComponents.addButton.addEventListener("click", commonUtilities.addTask);

    commonUtilities.localStorage.loadDataFromLocalStorage();


    for (let i = 0; i < actionComponents.incompleteTasksHolder.children.length; i++) {
      commonUtilities.bindTaskEvents(actionComponents.incompleteTasksHolder.children[i],
                                 commonUtilities.taskCompleted);
    }
    
    for (let i = 0; i < actionComponents.completedTasksHolder.children.length; i++) {
      commonUtilities.bindTaskEvents(actionComponents.completedTasksHolder.children[i],
                   commonUtilities.taskIncomplete);
    }
    

   },

   addTask : function () {

    let listItemName = actionComponents.taskInput.value;
  
    if (commonUtilities.isFieldEmpty(actionComponents.taskInput.value)) {
      alert("Field can't be empty");
      return;
    }
  
    listItem = commonUtilities.createNewTaskElement(listItemName);
    actionComponents.incompleteTasksHolder.appendChild(listItem);
    commonUtilities.bindTaskEvents(listItem, commonUtilities.taskCompleted);
    actionComponents.taskInput.value = "";
    commonUtilities.localStorage.updateLocalStorage();

  },

   createNewTaskElement : function(taskString, arr) {
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
  
    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;
  
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

  
    return listItem;
  },

  

  taskIncomplete : function() {
    var listItem = this.parentNode;
    actionComponents.incompleteTasksHolder.appendChild(listItem);
    commonUtilities.bindTaskEvents(listItem, taskCompleted);
    commonUtilities.localStorage.updateLocalStorage();
  
  },

   editTask : function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelectorAll("input[type=text")[0];
    var label = listItem.querySelector("label");
    var button = listItem.getElementsByTagName("button")[0];
  
    var containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        label.innerText = editInput.value
        button.innerText = "Edit";
    } else {
       editInput.value = label.innerText
       button.innerText = "Save";
    }
    
    listItem.classList.toggle("editMode");

    commonUtilities.localStorage.updateLocalStorage();
  },
  
   deleteTask : function (el) {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
    commonUtilities.localStorage.updateLocalStorage();
  },
  
    taskCompleted : function (el) {
    var listItem = this.parentNode;
    actionComponents.completedTasksHolder.appendChild(listItem);
    commonUtilities.bindTaskEvents(listItem, commonUtilities.taskIncomplete);
    //saving in the local storage
    commonUtilities.localStorage
    .setItem(commonUtilities.localStorage.keys.completedItem,
     commonUtilities.getInnerHtml(actionComponents.completedTasksHolder))
     commonUtilities.localStorage.updateLocalStorage();
  
  },
  
   taskIncomplete : function() {
    var listItem = this.parentNode;
    actionComponents.incompleteTasksHolder.appendChild(listItem);
    commonUtilities.bindTaskEvents(listItem, commonUtilities.taskCompleted);
    commonUtilities.localStorage.updateLocalStorage();
  },
  
    bindTaskEvents : function(taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    var editButton = taskListItem.querySelectorAll("button.edit")[0];
    var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = commonUtilities.editTask;
    deleteButton.onclick = commonUtilities.deleteTask;
    checkBox.onchange = checkBoxEventHandler;
    commonUtilities.localStorage.updateLocalStorage();
  }
}

commonUtilities.performAllInitialProcessing();

// var createNewTaskElement = function(taskString, arr) {
//   let listItem = document.createElement("li");
//   let checkBox = document.createElement("input");
//   let label = document.createElement("label");
//   let editInput = document.createElement("input");
//   let editButton = document.createElement("button");
//   let deleteButton = document.createElement("button");

//   checkBox.type = "checkbox";
//   editInput.type = "text";
//   editButton.innerText = "Edit";
//   editButton.className = "edit";
//   deleteButton.innerText = "Delete";
//   deleteButton.className = "delete";
//   label.innerText = taskString;

//   listItem.appendChild(checkBox);
//   listItem.appendChild(label);
//   listItem.appendChild(editInput);
//   listItem.appendChild(editButton);
//   listItem.appendChild(deleteButton);

//   return listItem;
// };

// var addTask = function () {

//   let listItemName = actionComponents.taskInput.value;

//   if (commonUtilities.isFieldEmpty(actionComponents.taskInput.value)) {
//     alert("Field can't be empty");
//     return;
//   }

//   listItem = createNewTaskElement(listItemName);
//   actionComponents.incompleteTasksHolder.appendChild(listItem);
//   bindTaskEvents(listItem, taskCompleted);
//   actionComponents.taskInput.value = "";
// };

// var editTask = function () {
//   var listItem = this.parentNode;
//   var editInput = listItem.querySelectorAll("input[type=text")[0];
//   var label = listItem.querySelector("label");
//   var button = listItem.getElementsByTagName("button")[0];

//   var containsClass = listItem.classList.contains("editMode");
//   if (containsClass) {
//       label.innerText = editInput.value
//       button.innerText = "Edit";
//   } else {
//      editInput.value = label.innerText
//      button.innerText = "Save";
//   }
  
//   listItem.classList.toggle("editMode");
// };

// var deleteTask = function (el) {
//   var listItem = this.parentNode;
//   var ul = listItem.parentNode;
//   ul.removeChild(listItem);
// };

// var taskCompleted = function (el) {
//   var listItem = this.parentNode;
//   actionComponents.completedTasksHolder.appendChild(listItem);
//   bindTaskEvents(listItem, taskIncomplete);
//   //saving in the local storage
//   commonUtilities.localStorage
//   .setItem(commonUtilities.localStorage.keys.completedItem,
//    commonUtilities.getInnerHtml(completedTasksHolder))

// };

// var taskIncomplete = function() {
//   var listItem = this.parentNode;
//   actionComponents.incompleteTasksHolder.appendChild(listItem);
//   `bindTas`kEvents(listItem, taskCompleted);
//   commonUtilities.localStorage
//   .setItem(commonUtilities.localStorage.keys.toDoItem,
//    commonUtilities.getInnerHtml(incompleteTasksHolder))

// };

// var bindTaskEvents = function(taskListItem, checkBoxEventHandler, cb) {
//   var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
//   var editButton = taskListItem.querySelectorAll("button.edit")[0];
//   var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
//   editButton.onclick = editTask;
//   deleteButton.onclick = deleteTask;
//   checkBox.onchange = checkBoxEventHandler;
// };

