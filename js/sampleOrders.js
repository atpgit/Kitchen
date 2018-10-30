function fakeData() {
    orders.push(
        {
            id: 1,
            number: "200",
            name: "",
            seat: "",
            isAddOn: false,
            state: STATUS_NOT_PREPARED
        });
    //timers.push({ id: 1, number: "100", totalSeconds: 10 });
    orders.push({
        id: 2,
        number: "201",
        name: "",
        seat: "",
        isAddOn: false,
        state: STATUS_NOT_PREPARED
    });
    //timers.push({ id: 2, number: "101", totalSeconds: 10 });
    orders.push({
        id: 3,
        number: "402",
        name: "",
        seat: "",
        isAddOn: false,
        state: STATUS_NOT_PREPARED
    });
    timers.push({ id: 3, number: "102", totalSeconds: 10 });
    orders.push({	
        id:4,
        number:"203",
        name : "",
        seat:"",
        isAddOn:false,
        state:STATUS_SERVED
    });
    // //timers.push({ id: 4, number: "103", totalSeconds: 10 });
    // orders.push({	
    //     id:5,
    //     number:"104",
    //     name : "",
    //     seat:"",
    //     isAddOn:false,
    //     state:STATUS_SERVED
    // });
    // orders.push({	
    //     id:6,
    //     number:"105",
    //     name : "",
    //     seat:"",
    //     isAddOn:false,
    //     state:STATUS_SERVED
    // });
    // orders.push({	
    //     id:7,
    //     number:"106",
    //     name : "",
    //     seat:"",
    //     isAddOn:false,
    //     state:STATUS_SERVED
    // });
    // orders.push({	
    //     id:8,
    //     number:"107",
    //     name : "",
    //     seat:"",
    //     isAddOn:false,
    //     state:STATUS_SERVED
    // });
    // orders.push({	
    //     id:9,
    //     number:"108",
    //     name : "",
    //     seat:"",
    //     isAddOn:false,
    //     state:STATUS_SERVED
    // });
    orders.push({
        id: 10,
        number: "101",
        name: "",
        seat: "",
        isAddOn: false,
        state: STATUS_SERVED
    });


    orders.push(
        {
            id: 11,
            number: "110",
            name: "",
            seat: "",
            isAddOn: false,
            state: STATUS_NOT_PREPARED
        });



    //timers.push({ id: 5, number: "104", totalSeconds: 10 });

}

//This method only generated new number to test done (STATUS_SERVED) orders not for In progress orders.
//Number generator service will be share with the source code please ask develpoer or system administrator
function GetDataFromService()
{
    $.ajax({
        type: 'GET',
        url: "http://localhost:62226/api/values",//ports and url can be change by environment
        processData: true,
        data: {},
        dataType: "json",
        //Return generated Number
        success: function (data) {
            orders.push({
                id: 10,
                number: data,//Generated Number
                name: "",
                seat: "",
                isAddOn: false,
                state: STATUS_SERVED
            });
        
        }
});

}