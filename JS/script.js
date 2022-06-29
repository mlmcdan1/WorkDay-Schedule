var events = {};
// shows today's date
$("#currentDay").text(moment().format("dddd, MMMM Do"));

//check to see if hours is listed
var hourCheck = function(){
    //get current hour using moment
    var currentHour = moment().hour();

    //
    $(".time-block").each(function(){
        var timeBlock = parseInt($(this).attr("id")); //get id as id's are given for each hour
        
        //past hour
        if(timeBlock < currentHour){
            $(this).addClass("past");
        }
        //present hour
        else if (timeBlock===currentHour){
            $(this).removeClass("past");
            $(this).addClass("present");
        }
        //future hour 
        else {
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future");
        }
    });
};

//save in local storage
var loadEvent = function(id,text){
    events = JSON.parse(window.localStorage.getItem("events")) || {}
    $.each(events,function(hour,description){
        $('#' + hour).find("textarea").val(description);
    })
}

var saveEvent = function() {
    localStorage.setItem("events", JSON.stringify(events));
  };

var createEvent = function(id, text){
    events[id] = text;
    saveEvent();
}

//checks the hour
hourCheck();
loadEvent();

//saves text
$(".saveBtn").click(function(){
    var parenEl = $(this).parent();
    var id = $(parenEl).attr("id"); //get current hour
    var text = $(parenEl).find("textarea").val().trim(); //get text
    createEvent(id,text);
});
