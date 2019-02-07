var options;

function configure() {
    $.getJSON("js/customerdisplayconfig.json", function (config) {
        options = config;
        $(document).ready(function () {

            loadTemplates();
        
            var brandCss = $("<link href=\"images/" + options.brand + "_brand.css\" rel=\"stylesheet\">");
            $('head').append(brandCss);
        
            var responseCss = $("<link href=\"css/responsive-"+options.displayOrientation+".css\" rel=\"stylesheet\">");
            $('head').append(responseCss);
        })
        
    });
}




function loadTemplates() {

    $.ajax({
        type: 'GET',
        url: "js/inprogressOrder-template-" + options.displayOrientation +".html",//ports and url can be change by environment
        dataType: "html",

        success: function (data) {
            var js = $("<script id=\"inprogressOrder-template\" type=\"text/x-handlebars-template\">" + data + "</script>");
            $('head').append(js);
        }
    });

    $.ajax({
        type: 'GET',
        url: "js/progressDone-template-" + options.displayOrientation +".html",//ports and url can be change by environment
        dataType: "html",

        success: function (data) {
            var js = $("<script id=\"progressDone-template\" type=\"text/x-handlebars-template\">" + data + "</script>");
            $('head').append(js);
        }
    });

    $.ajax({
        type: 'GET',
        url: "js/master-template-" + options.displayOrientation +".html",//ports and url can be change by environment
        dataType: "html",

        success: function (data) {
            $('#content').append(data);

            var x = $("#hazirlaniyorField");
            var path = "images/" + options.brand + "_";
            x.attr("src", path + "SiparisEkran_baslik-" + options.displayOrientation + ".png")

            x = $("#hazirField");
            x.attr("src", path + "SiparisEkran-" + options.displayOrientation + ".png")

            x = $("#altMesajField");
            x.attr("src", path + "SiparisEkran_altyazi-" + options.displayOrientation + ".png")

            
        }
    });
}