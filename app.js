//主程式  app.js
//初始化頁面

$(function(){
    
    var stickiesKeyArray = getStickiesKeyArray();
    //alert(stickiesKeyArray);
    for(var index=0 ; index<stickiesKeyArray.length; index++){
        var key = stickiesKeyArray[index];
        var sticky = JSON.parse(localStorage[key]);
        addStickyToList(key,sticky);
    }
    
    $("#add_button").click(createSticky);
    $("#clear_button").click(deleteAllSticky);
      
});


function getStickiesKeyArray(){
    var stickiesKeyArray = localStorage["stickiesKeyArray"];
    if(!stickiesKeyArray){
        
        stickiesKeyArray=[];
        localStorage.setItem("stickiesKeyArray",JSON.stringify(stickiesKeyArray));    //對localStorage做初始化
    }
    else{
        stickiesKeyArray = JSON.parse(stickiesKeyArray);
    }
        
    return stickiesKeyArray;
}

function createSticky(){
    //取出現有key值表
    var stickiesKeyArray = getStickiesKeyArray();
    //給訂一個新的key值
    var key = "sticky_" +(new Date()).getTime();
    
    //取得畫面上的資料
    var text = $("#note_text").val();
    var color = $("#note_color").val();
    
    //資料存回local Storage
    var sticky = {"text":text,"color":color};
    localStorage.setItem(key,JSON.stringify(sticky));
    //key存回local Storage
    stickiesKeyArray.push(key);
    localStorage.setItem("stickiesKeyArray",JSON.stringify(stickiesKeyArray));
    
    addStickyToList(key,sticky);
}


function addStickyToList(key ,sticky){
    
    var $li= 
    $("<li></li>")
    .attr("id",key)
    .css("background-color",sticky.color)
    .text(sticky.text)
    .click(deleteSticky);
    $("#stickies").append($li);
    
}

//  刪除單篇記事
function deleteSticky(event){
    var key = event.target.id;
    var removeStickyId="#"+key;
    
    $(removeStickyId).remove();
    var stickiesKeyArray = getStickiesKeyArray();           
    for(var index=0;index<stickiesKeyArray.length;index++){
        if(stickiesKeyArray[index]==key)
             stickiesKeyArray.splice(index,1);
    }
    localStorage["stickiesKeyArray"]=JSON.stringify(stickiesKeyArray);
    
    localStorage.removeItem(key);
    
    
}

//Todo6:
//   清空所有記事

function deleteAllSticky(){
    
    localStorage.clear();
    stickiesKeyArray=[];
    localStorage.setItem("stickiesKeyArray",JSON.stringify(stickiesKeyArray));    //對localStorage做初始化

    $("li[id^='sticky']").remove(); 
    
}

