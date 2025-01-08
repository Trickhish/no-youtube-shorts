var nctn=null;
var ntt=null;
var nbt=null;

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

function removeShortsShelves() {
    Array.from(document.querySelectorAll("ytd-rich-shelf-renderer")).forEach((e)=>{
        e.remove();
    });
}

function notifsOpened() {
    var nsh = document.querySelector("tp-yt-iron-dropdown.ytd-popup-container").getAttribute("aria-hidden");
    return(nsh != 'true');
}

function afterLoaded(equery, f, tm=500) {
    if (document.querySelector(equery) != null) {
        f();
    } else {
        setTimeout(()=>{
            afterLoaded(equery, f, tm);
        }, tm);
    }
}

function afterAttribute(e, f, an, av, tm=500) {
    if (e.getAttribute(an)==av) {
        f();
    } else {
        setTimeout(()=>{
            afterAttribute(e, f, an, av, tm);
        }, tm);
    }
}

function ntimes(f, n, tm) {
    if (n<=0) {
        return;
    }
    f();

    setTimeout(()=>{
        ntimes(f, n-1, tm);
    }, tm);
}



function load() {
    nbt = document.querySelector("yt-icon-button.style-scope.ytd-notification-topbar-button-renderer");

    if (nbt==null) {
        setTimeout(()=>{
            load();
        }, 500);
        return;
    }

    console.log("Page loaded, Removed shorts");

    removeShortsShelves();

    nctn = document.querySelector("tp-yt-iron-dropdown.style-scope.ytd-popup-container");
    ntt = document.querySelector("yt-formatted-string.style-scope.ytd-simple-menu-header-renderer");

    nbt.addEventListener("click", ()=>{
        if (!notifsOpened()) {
            return;
        }
        console.log("Opening Notifs");

        afterAttribute(document.querySelector("#container.menu-container.style-scope.ytd-multi-page-menu-renderer"), ()=>{ // notifs finished loading
            ntt = document.querySelector("yt-formatted-string.style-scope.ytd-simple-menu-header-renderer");
            ntt.innerText = "Notifications - NoShorts";

            var notifs = Array.from(document.querySelectorAll("ytd-notification-renderer.yt-multi-page-menu-section-renderer"));
            notifs.forEach((e)=>{
                var tt = e.querySelector("yt-formatted-string.message").innerText;
                var url = e.querySelector("a.yt-simple-endpoint").href;
                var thumb = e.querySelector("div.thumbnail-container img").src;
                var vid = url.split("v=")[1].split("&")[0];

                fgca("https://api.dury.dev/isytshort&vid="+encodeURIComponent(vid), (r)=>{
                    r = JSON.parse(r);
                    if (r["content"]==true) {
                        //e.style.backgroundColor = 'red';
                        e.style.display="none";
                    }

                    //console.log(vid, r["content"], r["content"]=='true', );
                });
            });
        }, "hidden", null);
    });
}

window.addEventListener("load", ()=>{
    console.log("Starting to block shorts");

    load();
});




