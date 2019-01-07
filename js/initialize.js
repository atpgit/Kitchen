$(document).ready(function () {

    loadTemplates();

    var brandCss = $("<link href=\"images/" + brand + "_brand.css\" rel=\"stylesheet\">");
    $('head').append(brandCss);

    var responseCss = $("<link href=\"css/responsive-"+displayOrientation+".css\" rel=\"stylesheet\">");
    $('head').append(responseCss);


    


})

function loadTemplates() {

    $.ajax({
        type: 'GET',
        url: "js/inprogressOrder-template-" + displayOrientation +".html",//ports and url can be change by environment
        dataType: "html",

        success: function (data) {
            var js = $("<script id=\"inprogressOrder-template\" type=\"text/x-handlebars-template\">" + data + "</script>");
            $('head').append(js);
        }
    });

    $.ajax({
        type: 'GET',
        url: "js/progressDone-template-" + displayOrientation +".html",//ports and url can be change by environment
        dataType: "html",

        success: function (data) {
            var js = $("<script id=\"progressDone-template\" type=\"text/x-handlebars-template\">" + data + "</script>");
            $('head').append(js);
        }
    });

    $.ajax({
        type: 'GET',
        url: "js/master-template-" + displayOrientation +".html",//ports and url can be change by environment
        dataType: "html",

        success: function (data) {
            $('#content').append(data);

            var x = $("#hazirlaniyorField");
            var path = "images/" + brand + "_";
            x.attr("src", path + "SiparisEkran_baslik-" + displayOrientation + ".png")

            x = $("#hazirField");
            x.attr("src", path + "SiparisEkran-" + displayOrientation + ".png")

            x = $("#altMesajField");
            x.attr("src", path + "SiparisEkran_altyazi-" + displayOrientation + ".png")

            
        }
    });
}