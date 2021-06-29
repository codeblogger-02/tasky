const taskContainer = document.querySelector(".task_container");

let globalStore = [];
const generateNewCard=(taskData) => `<div class="col-md-6 col-lg-4 mt-3" >
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
   <button type="button" class="btn btn-outline-success" id=${taskData.id} onclick="editCard.apply(this, arguments)">
   <i class="fas fa-pencil-alt" id=${taskData.id} onclick="editCard.apply(this, arguments)"></i>
   </button>
   <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
   <i class="fas fa-dumpster-fire" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i>
   </button>
  </div>
  <img class="rounded border  border-5" src=${taskData.imageUrl} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text">${taskData.taskDiscription}</p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  <div class="card-footer">
   <button type="button" id=${taskData.id} class="btn btn-primary float-end">Open Task</button>
  </div>
</div>
</div>`;

const loadInitialCardData = () =>{
  //localstorage to get tasky card data
   const getCardData = localStorage.getItem("tasky");

  // convert to normal object
    const {cards} = JSON.parse(getCardData);

  //loop over those array of task object to create HTML card, inject it to DOM
    cards.map((cardObject) => {
      taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

 // update our globalStore
      globalStore.push(cardObject);
    })

};

const updateLocalStorage = () => {
  localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));
}

const saveChanges = () => {
const taskData ={
    id: `${Date.now()}`,
    imageUrl: document.getElementById("imageurl").value,
    taskTitle:document.getElementById("tasktitle").value ,
    taskType: document.getElementById("tasktype").value ,
    taskDiscription: document.getElementById("taskdiscription").value,
   };

  
  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStore.push(taskData);
   
  localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));
};


const deleteCard = (event) => {

  event = window.event;

  const targetID = event.target.id;
  const tagname = event.target.tagName;
  // if match found remove

 globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
 localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

// contact parent
 if(tagname === "BUTTON"){
    return  taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
 }else{
   return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
 }

};

// content-edit-able

const editCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if(tagname === "BUTTON"){
    parentElement = event.target.parentNode.parentNode;
  }else{
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDiscription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1]; 

  taskTitle.setAttribute("contenteditable", "true");
  taskDiscription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick","saveEditChanges.apply(this, arguments)");
  submitButton.innerHTML = "Save changes"
};

const saveEditChanges = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if(tagname === "BUTTON"){
    parentElement = event.target.parentNode.parentNode;
  }else{
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDiscription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submitButton = parentElement.childNodes[7].childNodes[1]; 

  const updatedData = {
    taskTitle: taskTitle.innerHTML,
    taskDiscription: taskDiscription.innerHTML,
    taskType: taskType.innerHTML,
  };

  globalStore = globalStore.map((task) =>{
    if(task.id === targetID){
      return{
    id: task.id,
    imageUrl: task.imageUrl,
    taskTitle:updatedData.taskTitle ,
    taskType: updatedData.taskType ,
    taskDiscription: updatedData.taskDiscription,
      };
    }

      return task; //important
  });
  
   updateLocalStorage();
   taskTitle.setAttribute("contenteditable", "false");
   taskDiscription.setAttribute("contenteditable", "false");
   taskType.setAttribute("contenteditable", "false");
   submitButton.removeAttribute("onclick");
   submitButton.innerHTML = "Open Task";
};