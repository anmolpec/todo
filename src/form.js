import {globalList, listElement, currentPriorityOrder} from "./infoHandler";
import {listDOM} from "./listDOM";
import {projectInfo} from "./projectInfo";

function form(){

    if(!document.querySelector("#form")){
        let formContainer=document.createElement("form");
        formContainer.setAttribute("id", "form");

        let textInput=document.createElement("textarea");
        let datetimeInput=document.createElement("input");
        datetimeInput.setAttribute("type", "datetime-local");
        let projectInput=document.createElement("input");
        projectInput.setAttribute("type", "text");
        let submitButton=document.createElement("button");
        submitButton.innerHTML="SUBMIT";
        let cancelButton=document.createElement("button");
        cancelButton.innerHTML="CANCEL";

        formContainer.appendChild(textInput);
        formContainer.appendChild(datetimeInput);
        formContainer.appendChild(projectInput);
        formContainer.appendChild(submitButton);
        formContainer.appendChild(cancelButton);

        textInput.placeholder="Description";
        projectInput.placeholder="Project";
        if(currentPriorityOrder.getCurrentPriorityIndex()==5){
            projectInput.defaultValue=projectInfo.currentProject;
        }


        document.body.appendChild(formContainer);
        formContainer.classList.add("form");

        submitButton.addEventListener("click",()=>{
            let {isValid, error}= valid(textInput.value, datetimeInput.value);
            
            if(isValid){
                let newElement=listElement(textInput.value, new Date(datetimeInput.value),projectInput.value,false);
                globalList.addTask(newElement);

                listDOM.appendListElement();
                projectInfo.updateProjectDiv(projectInput.value);
                projectInfo.getProjectList();

                formContainer.remove();
                console.log(globalList.listArr)
            }
            else{
                alert(error);
                formContainer.remove();
                form();
            }
        });

        cancelButton.addEventListener("click", ()=>formContainer.remove());

        function valid(text,date){
            if(text=="")
                return {isValid:false , error:"Write a description for the task"};
            // else if(new Date(date)!="Invalid Date" && (new Date())-(new Date(date))>0)
            //     return {isValid:false , error:"Date for the task is in the past. Please leave date field empty or eneter a date in the future"};
            else return {isValid:true , error:""};//make the proper function later on
        }
    }
}

export {form};