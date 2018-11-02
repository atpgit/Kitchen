$(document).ready(function () {
    var x = $("#hazirlaniyorField");
    x.attr("src",brand+"/SiparisEkran_baslik.png")

    x = $("#hazirField");
    x.attr("src",brand+"/SiparisEkran.png")

    x = $("#altMesajField");
    x.attr("src",brand+"/SiparisEkran_altyazi.png")


    var brandCss = $('<link href="'+ brand + '/brand.css" rel="stylesheet">');
    $('head').append(brandCss);
    //x = $("#brandCss");
    //x.attr("hrep",brand+"/brand.css")

    
})