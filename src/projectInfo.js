import {globalList, currentPriorityOrder} from "./infoHandler"
import {listDOM} from "./listDOM"
import { addButton } from "./addListElement";
//when you press other buttons after erasing a project completely, project is lost. avaoid this
let projectInfoF=function(){
    let projectList=[];
    let currentProject="";
    let emptyProjects=[];

    function getProjectList(){
        while(projectList.length!=0) projectList.pop();
        for (let j=0;j<globalList.listArr.length;j++){
            let element=globalList.listArr[j];
            if(element.project!=""){
                if(!projectList.indexOf(element.project)>=0){
                    projectList.push(element.project);
                }
            }
        }
        return projectList;
    }

    function projectListDiv(){
        let temp=document.createElement("ul");
        temp.setAttribute("id","projectList")
        for(let k=0;k<projectList.length;k++){
                if(projectList.indexOf(projectList[k])>=k){
                let element=projectList[k];
                let t=document.createElement("li");
                t.textContent=element;
                t.classList.add("subproject");
                temp.appendChild(t);
                let del=deleteProject(t);
                t.addEventListener("click", ()=>{
                    this.currentProject=element;
                    currentPriorityOrder.currentPriorityChange("SUBPROJECT");
                    listDOM.appendListElement();

                    for(let o=0;o<t.parentNode.children.length;o++){
                        if(t.parentNode.children[o].childNodes.length>1)
                        t.parentNode.children[o].removeChild(t.parentNode.children[o].lastChild);
                    }
                    t.appendChild(del);
                });
            }
        }
        return temp;
    }

    function updateProjectDiv(projectString){
        if(!(projectList.indexOf(projectString)>=0) && projectString!="" && currentPriorityOrder.getCurrentPriorityIndex()>3){
            let temp=document.querySelector("#projectList");
            let t=document.createElement("li");
            t.textContent=projectString;
            temp.appendChild(t);
            t.classList.add("subproject");
            let del=deleteProject(t);
            t.addEventListener("click", ()=>{
                this.currentProject=projectString;
                currentPriorityOrder.currentPriorityChange("SUBPROJECT");
                listDOM.appendListElement();

                for(let o=0;o<t.parentNode.children.length;o++){
                    if(t.parentNode.children[o].childNodes.length>1)
                    t.parentNode.children[o].removeChild(t.parentNode.children[o].lastChild);
                }
                t.appendChild(del);
            });
        }
    }


    function deleteProject(t){
        let del=document.createElement("button");
        del.innerHTML="X";

        // t.addEventListener("click",()=>{
        //     console.log("hi in t");
        //     for(let l=0;l<listDOM.listContainer.children.length;l++){          
        //         console.log("hi in for");
        //         listDOM.listContainer.children[l].lastChild.addEventListener("click",()=>{
        //             console.log("hi in f");
        //             if(listDOM.listContainer.children.length==0)
        //                 del.style.display="inline"; 
        //             else del.style.display="none"
        //         })
        //     }
        // })
        del.classList.add("delProject");
        del.addEventListener("click", ()=>{
            
            while(listDOM.listContainer.children.length>0){
                    let event=new MouseEvent("click",{view:window,bubbles:true,cancelable:true});
                    let x=listDOM.listContainer.lastChild.lastChild;
                    x.dispatchEvent(event);
            }


            for(let n=0;n<projectList.length;n++){
                if(projectList[n]==t.textContent){
                    projectList.splice(n,1);
                    n--;
                }
            }
            
            let event=new MouseEvent("click",{view:window,bubbles:true,cancelable:true});
            let x=document.getElementById("PRO");
            x.dispatchEvent(event);
        })
        return del;
    }

    return {currentProject, getProjectList, projectListDiv, updateProjectDiv};

}

let projectInfo=projectInfoF();

export {projectInfo};