import {listDOM} from "./listDOM"
import {currentPriorityOrder} from "./infoHandler"
import {projectInfo} from "./projectInfo"

let sideBarContainer= function(){
    let sidebarContainerDiv=document.createElement("div");

    function setUpDiv(priorityFilterString){
        let temp=document.createElement("div");
        temp.textContent=priorityFilterString;
        temp.addEventListener("click", ()=>{
            currentPriorityOrder.currentPriorityChange(priorityFilterString);
            listDOM.appendListElement();

            sidebarContainerDiv.childNodes.forEach((node)=>node.classList.remove("highlight"));
            if(priorityFilterString!="PROJECT")temp.classList.add("highlight");
        });

        sidebarContainerDiv.appendChild(temp);
        return temp;
    }

    function setUpProjectDiv(){
        let proDiv= document.createElement("div");
        let projectDiv=setUpDiv("PROJECT");
        projectDiv.setAttribute("id", "PRO");
        proDiv.appendChild(projectDiv);
        sidebarContainerDiv.appendChild(proDiv);
        projectDiv.addEventListener("click", ()=>{
            while(proDiv.children[1]){
                proDiv.removeChild(proDiv.children[1]);
            }
            projectDiv.textContent="PROJECT";
            projectInfo.getProjectList();
            proDiv.appendChild(projectInfo.projectListDiv())
            console.log("hi2");
        });

        for(let i=0;i<sidebarContainerDiv.childNodes.length-1;i++){
            sidebarContainerDiv.childNodes[i].addEventListener("click", ()=> {
                while(proDiv.children[1]){
                    proDiv.removeChild(proDiv.children[1]);
                }})
                proDiv.classList.remove("highlight");
        }
    }

    setUpDiv("ALL");
    setUpDiv("DAY");
    setUpDiv("WEEK");
    setUpDiv("MONTH");
    setUpProjectDiv();

    return sidebarContainerDiv;

}

let sidebar=sideBarContainer();
export {sidebar};