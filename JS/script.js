var events = {};
// display current day using moment
$("#currentDay").text(moment().format("dddd, MMMM Do"));

//This function is to add colors to description of each hour after comaring with current hour
var hourChecker = function(){
    //get current hour using moment
    var currentHour = moment().hour();

    //loop through every hour in calendar block and add cllases after comparing with current hour
    $(".time-block").each(function(){
        var timeBlock = parseInt($(this).attr("id")); //get id as id's are given for each hour
        //for past hour
        if(timeBlock < currentHour){
            $(this).addClass("past");
        }
        //for present hour
        else if (timeBlock===currentHour){
            $(this).removeClass("past");
            $(this).addClass("present");
        }
        //for future hour
        else {
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future");
        }
    });
};

//save events in local storage
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

//check for hour and color code acordingly
hourChecker();
loadEvent();

//saves text
$(".saveBtn").click(function(){
    var parenEl = $(this).parent();
    var id = $(parenEl).attr("id"); //get current hour
    var text = $(parenEl).find("textarea").val().trim(); //get text
    createEvent(id,text);
});