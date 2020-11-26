import {listDOM} from "./listDOM"
import {addButton} from "./addListElement"
import {sidebar} from "./sidebar"
import {globalList} from "./infoHandler"

let container=document.querySelector("#content");

let listContainer=document.createElement("div");

let temp=window.localStorage;

//handle date using date.toJSON and date(jsondate)
//temp.clear();

for(let i=0;i<temp.length;i++){
    if(JSON.parse(temp.getItem(`${i}`))!=null){
        let t=JSON.parse(temp.getItem(`${i}`));
        if(temp.getItem(`${i}date`)=="Invalid Date")
        t.datetime="Invalid Date";
        else
        t.datetime=new Date(JSON.parse(temp.getItem(`${i}date`)));
        globalList.addTask(t);
    }
}

window.addEventListener("beforeunload",()=>{
    temp.clear();
    for(let i=0;i<globalList.listArr.length;i++){
        temp.setItem(`${i}`,JSON.stringify(globalList.listArr[i]));
        temp.setItem(`${i}date`,globalList.listArr[i].datetime=="Invalid Date"?"Invalid Date":JSON.stringify(globalList.listArr[i].datetime.toJSON()));
    }
    return null;
});

listContainer.appendChild(addButton);
listContainer.appendChild(listDOM.listContainer);
listDOM.appendListElement();

container.appendChild(listContainer);
container.appendChild(sidebar);

listContainer.classList.add("listContainer");
sidebar.classList.add("sidebar");
addButton.classList.add("addButton");

