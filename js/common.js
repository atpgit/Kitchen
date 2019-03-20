// window.onerror = function (e, z) {
//     //alert(e);
// };
var orders = new Array();
var timers = new Array();
// SETTINGS
//
// Defaults:
//var rows = 2;
//var columns = 2;
//var showOrderNumber = true;
//var showOrderName = true;
//var inProgressEnabled = true;
//var readyLabel = "READY";
//var inProgressLabel = "IN PROGRESS";
//var headerSubtitle = "ORDERS";
var timer = true;
//var adGraphics = new Array();
//var adDelay = 10;
//var elapsedAdTime = 0;
//var adIndex = 0;
//var bgColor = "#fff";
//var cellColor = "transparent";
// Updated by Aloha Kitchen

// Constant values
var STATUS_NOT_PREPARED = 0;                                      // In progress...
var STATUS_PARTIALLY_PREPARED = 1;                                // ...
var STATUS_FULLY_PREPARED_WITHOUT_FORECAST_BIN_ITEMS = 2;         // ...
var STATUS_FULLY_PREPARED = 3;                                    // ...
var STATUS_SERVED = 4;                                            // READY

window.onerror = function (e) {
    document.getElementById("errorField").innerText = e;
};

function inProgressOrdersPrereation() {
    var source = document.getElementById('inprogressOrder-template').innerHTML;
    var template = Handlebars.compile(source);

    var inprogressOrdersWrapper = { inprogressOrders: getSubsetOfArray(getInProgressOrders().reverse(),8) };
    var htmls = template(inprogressOrdersWrapper);
    $("#inProgressOrders").html(htmls);
}
var firstDoneItem=0;
function doneOrdersPrereation() {

  //  if (getSubsetOfArray(getReadyOrders()).length === 0) {
        //$("#takeYourOrderPlacer").css("display", "block");
  //  }
    var source = document.getElementById("progressDone-template").innerHTML;
    var template = Handlebars.compile(source);
    var doneProg = getSubsetOfArray(getReadyOrders().reverse(),4);
    if (doneProg.length == 0){
        var doneOrderProgress = { doneProgress: doneProg };
        var htmls = template(doneOrderProgress);
        $("#progressDone").html(htmls);
        return;
    }
        
    if (doneProg[0].number != firstDoneItem) {
        firstDoneItem = doneProg[0].number;

        var doneOrderProgress = { doneProgress: doneProg };
        var htmls = template(doneOrderProgress);
        $("#progressDone").html(htmls);
    }
}


function setSizeInfo(){
    try {
		var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		document.getElementById("resolutionField").innerText = w + " x " + h + " ("+ window.outerWidth + " x " + window.outerHeight + ")";
	}
	catch (e) {
		document.getElementById("errorField").innerText = e;
	}
}
function onLoad() {
    //This method gets static fake inprogress and ready orders
    //every 20 sec. this method pushes new order with dynamic order number to the order array
    //setInterval(GetDataFromService, 6000);
    var env =  getQueryVariable("env");
    try{
        var ver = navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)[1];
        
		document.getElementById("versionField").innerText = ver;
    }
    catch(e){
        document.getElementById("errorField").innerText = e;
	}

    setSizeInfo();
    
    
    if(env == "dev"){
        fakeData();
    }
    configure();
    setInterval(onTick, 1000);


}



// Adds a second to each of the timers, and then refreshes the table
function onTick() {
    // GetDataFromService();
    for (var t = 0; t < timers.length; t++) {
        var order = orders[t];
        var timer = timers[t];
        timer.totalSeconds++;
    }
    //elapsedAdTime++;
    // if (adGraphics.length > 1 && elapsedAdTime >= adDelay) {
    //     adIndex++;
    //     if (adIndex >= adGraphics.length) {
    //         adIndex = 0;
    //     }
    //     elapsedAdTime = 0;
    // }
    inProgressOrdersPrereation();
    doneOrdersPrereation();

    

}

// Lets us either add a brand new order, or update the status of an existing order.
function showOrUpdateOrder(orderDto) {
    // If we have an existing order, we must update its status.
    for (var i = 0; i < orders.length; i += 1) {
        if (orders[i].id == orderDto.id) {
            orders[i].number = orderDto.number;
            orders[i].name = orderDto.name;
            orders[i].seat = orderDto.seatLabel;
            orders[i].isAddOn = orderDto.isAddOn;
            orders[i].state = orderDto.state;
            inProgressOrdersPrereation();
            doneOrdersPrereation();
            return;
        }
    }

    // If we didn't find an existing order, we must add this new order.
    var order = {
        id: orderDto.id,
        number: orderDto.number,
        name: orderDto.name,
        seat: orderDto.seatLabel,
        isAddOn: orderDto.isAddOn,
        state: orderDto.state
    };
    var timer = { id: order.id, number: order.number, totalSeconds: orderDto.totalSeconds };
    orders.push(order);
    timers.push(timer);
    inProgressOrdersPrereation();
    doneOrdersPrereation();
}

// Removes an order (and its timer)
function removeOrder(orderId) {
    var index = -1;
    for (var i = 0; i < orders.length; i += 1) {
        if (orders[i].id == orderId) {
            index = i;
            break;
        }
    }

    // If we found the order (and its timer), remove them.
    if (index >= 0) {
        orders.splice(index, 1);
        timers.splice(index, 1);
    }
    inProgressOrdersPrereation();
    doneOrdersPrereation();
}

// Removes an order at a specific index.
// This is used for Kitchen's Bump Cell X functionality.
function removeOrderAtIndex(index) {
    if (index >= 0) {
        orders.splice(index, 1);
        timers.splice(index, 1);
    }
}

// Utility method to get all the orders that are not yet ready
function getInProgressOrders() {
    var inProgresOrders = new Array();
    for (var i = 0;  i < orders.length; i += 1) {
        if (orders[i].state < STATUS_SERVED) {
            inProgresOrders.push(orders[i]);
        }
    }
    return inProgresOrders;
}

// Utility method to get all the orders that are ready
function getReadyOrders() {
    var readyOrders = new Array();
    for (var i = 0; i < orders.length; i += 1) {
        if (orders[i].state == STATUS_SERVED) {
            readyOrders.push(orders[i]);
        }
    }
    return readyOrders;
}

// Utility function to pull a subset of an array
// Will pull as many elements as possible
function getSubsetOfArray(array, number) {
    //var number = rows * columns;
    var subset = [];
    var lengthOfArray = array.length;
    for (var i = 0; i < number && i < lengthOfArray; i++) {
        subset.push(array[i]);
    }
    return subset;
}

function formatTimer(order, timer) {
    var text = "";
    if (order.isAddOn) {
        text += "Add-On ";
    }

    var seconds = pad(timer.totalSeconds % 60);
    var minutes = pad(parseInt(timer.totalSeconds / 60));
    text += minutes + ":" + seconds;
    return text;
}

$(document).ready(function () {
    onLoad();
});

function getQueryVariable(variable)
{ 
  var query = window.location.search.substring(1); 
  var vars = query.split("&"); 
  for (var i=0;i<vars.length;i++)
  { 
    var pair = vars[i].split("="); 
    if (pair[0] == variable)
    { 
      return pair[1]; 
    } 
  }
  return -1; //not found 
}