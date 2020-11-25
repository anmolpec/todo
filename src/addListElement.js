import {form} from "./form.js"

let addElementButton= function(){
    let addButton=document.createElement("button");
    addButton.textContent= "+";
    
    addButton.addEventListener("click", form);

    return addButton;
}

let addButton=addElementButton();
export {addButton};