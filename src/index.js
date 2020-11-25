import {listDOM} from "./listDOM"
import {addButton} from "./addListElement"
import {sidebar} from "./sidebar"

let container=document.querySelector("#content");

let listContainer=document.createElement("div");

listContainer.appendChild(addButton);
listContainer.appendChild(listDOM.listContainer);

container.appendChild(listContainer);
container.appendChild(sidebar);

listContainer.classList.add("listContainer");
sidebar.classList.add("sidebar");
addButton.classList.add("addButton");
