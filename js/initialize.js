$(document).ready(function () {
    var x = $("#hazirlaniyorField");
    x.attr("src","images/" + brand + "_SiparisEkran_baslik.png")

    x = $("#hazirField");
    x.attr("src","images/" + brand + "_SiparisEkran.png")

    x = $("#altMesajField");
    x.attr("src","images/" + brand + "_SiparisEkran_altyazi.png")


    var brandCss = $("<link href=\"images/" + brand + "_brand.css\" rel=\"stylesheet\">");
    $('head').append(brandCss);
    //x = $("#brandCss");
    //x.attr("hrep",brand+"/brand.css")

    
})