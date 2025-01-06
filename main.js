function fgc(file, mode=false) { var requete = null; if (mode == undefined || mode == '') mode = false; if (window.XMLHttpRequest) {requete = new XMLHttpRequest();} else if (window.ActiveXObject) { requete = new ActiveXObject('Microsoft.XMLHTTP');} else return('false'); requete.open('GET', file, mode); requete.send(null); return requete.responseText;}

function fgca(url, s, e=function(){}) {
    var rq = new XMLHttpRequest();
    rq.open('GET', url, true);

    rq.onload = function() {
        var r = rq.responseText;
        s(r);
    };
    rq.onerror = e;

    rq.send();
}

window.addEventListener("load", ()=>{
    console.log("Starting to block shorts");

    
});




