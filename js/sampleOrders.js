function fakeData() {
    var notPreparedCount =Math.max(3, new Date().getTime() % 12);
    var preparedCount =  Math.max(3,new Date().getTime() % 6);
    for(var i=0;i<notPreparedCount;i++){
        orders.push(
            {
                id: i,
                number: 100 + i,
                name: "",
                seat: "",
                isAddOn: false,
                state: STATUS_NOT_PREPARED
            });
    }

    for(var i=0;i<preparedCount;i++){
        orders.push(
            {
                id: i,
                number: 200 + i,
                name: "",
                seat: "",
                isAddOn: false,
                state: STATUS_SERVED
            });
    }
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
                state: STATUS_NOT_PREPARED
            });
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