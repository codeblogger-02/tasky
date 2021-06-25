
const taskContainer = document.querySelector(".task_container") 
 
const globalStore = [];

const generateNewCard=(taskData) => `<div class="col-md-6 col-lg-4 mt-3" id=${taskData}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
   <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
   <button type="button" class="btn btn-outline-danger"><i class="fas fa-dumpster-fire"></i></button>
  </div>
  <img class="rounded border  border-5" src=${taskData.imageUrl} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text">${taskData.taskDiscription}</p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  <div class="card-footer">
   <button type="button" class="btn btn-primary float-end">Open Task</button>
  </div>
</div>
</div>`;

const loadInitialCardData = () =>{
  //localstorage to get tasky card data
   const getCardData = localStorage.getItem("tasky")
  // convert to normal object
    const {cards} = JSON.parse(getCardData);
  //loop over those array of task object to create HTML card, inject it to DOM
    cards.map((cardObject) => {
      taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));
 // update our globalStore
      globalStore.push(taskData);
    })

};

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