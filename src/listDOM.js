import {getFinalList} from "./priorityFilter"
import {listElementDOM} from "./listElementDOM"
import {globalList, currentPriorityOrder} from "./infoHandler";
import {projectInfo} from "./projectInfo";

let createListDOM=function(){
    
    let listContainer=document.createElement("ul");

    function appendListElement(){

        let finalList=getFinalList();

        while(listContainer.hasChildNodes()){
            listContainer.removeChild(listContainer.childNodes[0]);
        }
        
        for(let i=0;i<finalList.listArr.length;i++){
            
            listContainer.appendChild(listElementDOM(finalList.listArr[i]));

            listContainer.lastChild.lastChild.addEventListener("click",t.bind(finalList.listArr[i],i));
            //for(let j=0;j<1000;j++)console.log(j);
            
            function t(){
                globalList.removeTask(globalList.listArr.indexOf(this));
                while(listContainer.hasChildNodes()){
                    listContainer.removeChild(listContainer.childNodes[0]);
                }
                appendListElement();
                projectInfo.getProjectList();
                
                // if(currentPriorityOrder.getCurrentPriorityIndex()==5){
                //     if(!listContainer.hasChildNodes()){
                //         //projectInfo.getProjectList();
                //         let event=new MouseEvent("click",{view:window,bubbles:true,cancelable:true});
                //         let x=document.getElementById("PRO");
                //         x.dispatchEvent(event);
                //     }
                // }
            };
            
        }
    }

    appendListElement();

    return {listContainer, appendListElement};
}
let listDOM=createListDOM();

export {listDOM};