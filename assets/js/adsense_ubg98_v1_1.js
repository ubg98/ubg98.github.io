const DMCAs= [
    "/retro-bowl-unblocked",
    "/super-liquid-soccer-unblocked",
    "/blumgi-rocket-unblocked",
    "/blumgi-slime-unblocked",
    "/crossy-road-unblocked",
    "/tunnel-rush-2-unblocked",
    "/stickman-hook-unblocked",
    "/g-switch-3-unblocked",
    "/g-switch-unblocked",
    "/g-switch-2-unblocked",
];

window.addEventListener("load", (event) => {
    function inFrame () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    function botBrowser() {
        try {
            return navigator.webdriver
        } catch (e) {
            return true;
        }
    }

    function loadGoogleAdsense() {
        // Google Adsense
        var f=document.getElementsByTagName("script")[0];
        j=document.createElement("script");
        j.async= true;
        j.crossorigin= "anonymous";
        j.src= "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2751856053825499";
        f.parentNode.insertBefore(j,f);
    }

    if (botBrowser()) {
        console.log('Bot Browser');
    } else {
        console.log('Human Browser');
        if (window.location.href.indexOf("/ubg98.github.io")> -1) {
            let dmca= false;
            for (i=0; i<DMCAs.length; i++) {
                if (window.location.href.indexOf(DMCAs[i])> -1) {
                    dmca= true;
                }
            }
            if (dmca) {
                console.log("Adsense Skip! DMCA!");
            } else if (inFrame()) {
                console.log("Adsense Skip! Frame!");
            } else if (window.location.href.indexOf(".html")== -1) {
                console.log("Adsense Skip! Home Page!");
            } else {
                console.log("Adsense Served!");
                loadGoogleAdsense();
            }
        } else {
            console.log("Adsense Skip! Not Games235!");
        }
    }
});
