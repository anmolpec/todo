import {add, compareAsc} from "date-fns";

let listElementDOM= function(listElement){
    let listElementContainer= document.createElement("li");
    listElementContainer.classList.add("listElementContainer");
    listElementContainer.classList.add("listElement");

    let text=document.createElement("textarea");
    let datetimeDiv=document.createElement("div");
    let projectDiv=document.createElement("div");

    let isCompleteDiv=document.createElement("input");
    isCompleteDiv.setAttribute("type", "checkbox");
    if(listElement.isComplete==true){
        listElementContainer.classList.add("completed");
        isCompleteDiv.checked=true;
    }
    
    let deleteElement=document.createElement("button");
    deleteElement.textContent="DELETE";

    text.value=listElement.textContent;
    text.addEventListener("change", ()=>listElement.textContent=text.value);

    datetimeDiv.style.whiteSpace="pre-line";
    datetimeDiv.textContent=listElement.datetime=="Invalid Date"? "---":"BY : "+add(listElement.datetime,{years:0,months:0,weeks:0,days:0,hours:5,minutes:30}).toISOString().replace("T", "\r\nTIME  :  ").replace(":00.000Z","");
    projectDiv.textContent=listElement.project;
    if(new Date()-listElement.datetime>0){
        listElementContainer.classList.add("late");
    }

    

    //remove this from here later when adding css into listDOM mp
    isCompleteDiv.addEventListener("click", (e)=>{
        console.log(e);
        if(e.target.checked){
            listElement.isComplete=true;
            listElementContainer.classList.add("completed");
        }
        else{
            listElement.isComplete=false;
            listElementContainer.classList.remove("completed");
        }
    });


    listElementContainer.appendChild(isCompleteDiv);
    listElementContainer.appendChild(text);
    listElementContainer.appendChild(datetimeDiv);
    listElementContainer.appendChild(projectDiv);
    listElementContainer.appendChild(deleteElement);

    return listElementContainer;

}


export {listElementDOM};