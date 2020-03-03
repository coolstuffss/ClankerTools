//array di stringhe per semplificare lo riscrivere delle date
const monthNames = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre"
];

const dayNames = [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
];

const dayCroppedNames = [
    "Dom",
    "Lun",
    "Mar",
    "Mer",
    "Gio",
    "Ven",
    "Sab",
];

var pasti = ["Colazione", 5, 10, //0 , 1 , 2
    "Pranzo", 11, 15, // 3 , 4 , 5
    "Cena", 18, 22, //6 , 7 , 8
    "Niente"
];
//Scelta e Tipo di diete
const sceltaSeri = "0";

const dietNames = [
    "Low🍬"
];
//------------------------------------------------
var d = new Date();

$(".active.date-day").html(d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear());

$(".day-temp").html(dietNames[sceltaSeri]);
// 
var today = d.getDay();
var domani = d.getDate();
// Nomi dei giorni della settimana nell'elenco delle giornate
$(".day-name").each(function(element) {
    // element == this
    $(this).html(dayCroppedNames[today]);
    today < 6 ? today++ : today = 0;
});
//Numeri dei giorni della settimana nell'elenco delle giornate
$(".day-icon").each(function(element) {
    // element == this
    $(this).html(domani);
    domani++;
});

//$(".date-dayname").html(dayNames[d.getDay()]);

var ora = d.getHours();
var minuto = d.getMinutes();
var result = 9;

if ((ora >= pasti[1] && minuto >= 1) && (ora < pasti[2] && minuto < 59)) {
    result = 0;
} else {
    if ((ora >= pasti[4] && minuto >= 1) && (ora < pasti[5] && minuto < 59)) {
        result = 3;
    } else {
        if ((ora >= pasti[7] && minuto >= 1) && (ora < pasti[8] && minuto < 59)) {
            result = 6;
        } else {
            result = 9;
        }

    }

}
$(".weather-desc.active").html("Adesso: " + pasti[result]);

//healthbarje
var current = result;

function tohex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

$("#orologio").on("DOMNodeInserted", function() { //DOMSubtreeModified

    var inc = parseFloat((d.getHours() + "." + d.getMinutes()));
    if (current != 9) {
        cs = proportion(inc, pasti[(current + 1)], pasti[(current + 2)]);
        $("#bar1").css("width", cs + "%");

        cs = proportion(inc, pasti[(current + 1)], pasti[(current + 2)]);
        //console.log(proportion(inc, pasti[(current + 1)], pasti[(current + 2)]) + " inc: " + inc + "-color: " + tohex(255 - (cs * 2.5), cs * 2.5, 0));

        $("#bar1").css("background", "linear-gradient( 135deg, " + tohex(255 - (cs * 2.5), 50 + (cs * 2.5), 28) + " 10%, " + tohex(198 - (cs * 2.5), 20 + (cs * 2.5), 16) + " 100%)"); //c6ff1c - 3d6e10
    }
});

function proportion(inc, min, max) {
    //((inc - min) * 100) / (max - min)
    return 100 - (((inc - min) * 100) / (max - min));
}
//healthbar - FINE
//$(".location-button").html("Dettagli");
/*
$(".location-button").click(function() {
    var stringa = $(".location-button").text();
    stringa == "Più Dettagli" || stringa == "" ? stringa = "Meno Dettagli" : stringa = "Più Dettagli";
    $(".location-button").html(stringa);
});*/

//------------------------------------------------------------
//orologio
var d, h, m, s, animate;

d = new Date();
h = d.getHours();
m = d.getMinutes();

function init() {
    d = new Date();
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    clock();
};

function clock() {
    s++;
    if (s == 60) {
        s = 0;
        m++;
        if (m == 60) {
            m = 0;
            h++;
            if (h == 24) {
                h = 0;
            }
        }
    }
    orulogg('#orologio', s, m, h);
    animate = setTimeout(clock, 1000);
};

function orulogg(id, s, m, h) {
    //if (s < 10) {
    //   s = '0' + s;
    //}
    if (m < 10) {
        m = '0' + m;
    }
    if (h < 10) {
        h = '0' + h;
    }
    $("#orologio").html(dayNames[d.getDay()] + " - " + h + ":" + m /*+ ":" + s*/ );
};

window.onload = init;
//------------------------------------------------------------------------------------

$(".weather-side").click(function() {
    anime({
        targets: '.container',
        width: "100%",
        duration: 800
    });
    anime({
        targets: '.weather-side',
        width: "100%",
        duration: 800
    });
});