

let listElement= function(textContent, datetime, project, isComplete){
    return {textContent, datetime, project, isComplete};
}

let list= function(){
    let listArr=[];

    let sortArr=function(){
        listArr.sort((task1,task2)=>{
            if (task1.datetime=="Invalid Date" && task2.datetime=="Invalid Date")
                return 0;
            else if(task2.datetime=="Invalid Date")
                return -1;
            else if(task1.datetime=="Invalid Date")
                return 1;
            else return task1.datetime-task2.datetime;
        });
        console.log(listArr);
    }

    let addTask= function(listElement){
        listArr.push(listElement);
        sortArr();
    }

    let removeTask=function(index){
        listArr.splice(index,1);
        sortArr();
    }

    return {listArr, addTask, removeTask};
}

let globalList= list();

let currentPriorityOrder= (function(){
    const PRIORITIES=["ALL", "DAY", "WEEK","MONTH","PROJECT","SUBPROJECT"];

    let currentPriority=0;

    let currentPriorityChange=function(priority){
        currentPriority=PRIORITIES.indexOf(priority);
    }

    let getCurrentPriorityIndex=function(){
        return currentPriority;
    }

    return {getCurrentPriorityIndex, currentPriorityChange};
})();

export {globalList, currentPriorityOrder, list, listElement};