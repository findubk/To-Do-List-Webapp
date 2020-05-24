// CODE EXPLAINED channel

//select the element
const clear=document.querySelector(".clear");
const dateElement=document.getElementById("date");
const list=document.getElementById('list');
const input=document.getElementById('input');

//classes names
const check="fa-check-circle";
const uncheck="fa-circle-thin";
const line_through="lineThrough";

//variables
let arr=[];
let id;

//get data fron local localStorage
let data=localStorage.getItem("todo")

//cheak if data is empty
if (data) {
  arr=JSON.parse(data);
  id=arr.length;
  loadList(arr);
  } else {
  arr=[];
  id=0;
}
//Load item to UI
function loadList(array) {
  array.forEach(function (item) {
    addtodo(item.name,item.id,item.done,item.trash)
  });
}

//clear the localStorage
clear.addEventListener("click",function () {
  localStorage.clear();
  location.reload();
})
//show today dateElement

const options={weekday:"long",month:"short",day:"numeric"};
const today=new Date();

dateElement.innerHTML=today.toLocaleDateString("en-US",options);

//add to do function
function addtodo(todo,id,done,trash) {
  if(trash){return;}
  const Done=done ? check:uncheck;
  const Line=done ? line_through:"";
  const item=`
    <li class="item">
      <i class="fa ${Done} co" job="complete" id="${id}"></i>
      <p class="text ${Line}">${todo}</p>
      <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
  `
  const position="beforeend";
  list.insertAdjacentHTML(position,item);
}

//add an item to the list using enter key

document.addEventListener("keyup",function (even) {
  if (event.keyCode == 13) {
    const todo=input.value;
    if (todo) {
      addtodo(todo,id,false,false);
      arr.push({
        name: todo,
        id: id,
        done: false,
        trash: false
      })
      localStorage.setItem("todo",JSON.stringify(arr));
      id++;
    }
    input.value="";
  }
});

//complete to do
function completeToDo(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);

    arr[element.id].done=arr[element.id].done?false:true;
};


function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  arr[element.id].trash=true;
}

list.addEventListener("click",function (event) {
  const element=event.target;
  const elementJob=element.attributes.job.value;
  if (elementJob=="complete") {
    completeToDo(element);
  } else if(elementJob=="delete") {
    removeToDo(element);
  }
  localStorage.setItem("todo",JSON.stringify(arr));
})
