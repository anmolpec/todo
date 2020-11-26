import {globalList, currentPriorityOrder, list} from "./infoHandler"
import {add, compareAsc} from "date-fns"
import {projectInfo} from "./projectInfo"


let priorityFilter= function(){
    let currentDate= new Date();
    let finalList= list();
    //finalList.listArr=[...globalList.listArr.filter(filterFunction)];

    let temp=globalList.listArr.filter(filterFunction);
    for(let j=0;j<temp.length;j++){
        finalList.addTask(temp[j]);
    }
    
    function filterFunction(listElement){
        let priority=currentPriorityOrder.getCurrentPriorityIndex();
        switch(priority){
            case 0: return true;
                
            case 1: if(listElement.datetime!="Invalid Date"){
                        if(listElement.datetime.toDateString()==currentDate.toDateString())
                            return true;
                    }
                    else return false;

            case 2: if(listElement.datetime<add(currentDate, {years:0,months:0,weeks:1,days:0}))
                        return true;
                    else return false;
                
            case 3: if(listElement.datetime<add(currentDate, {years:0,months:1}))
                        return true;
                    else return false;

            case 4: if(listElement.project!="")
                        return true;
                    else return false;

            case 5: if(listElement.project.toString()==projectInfo.currentProject.toString())
                        return true;
                    else return false;

        }
    }
    return finalList;
}

let getFinalList=priorityFilter;

export {getFinalList};