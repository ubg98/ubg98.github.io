const STUDENTs= [
    {
        "os": "(Macintosh;",
        "browser": "Safari/",
        "w": 1024,
        "h": 768,
    }, {
        "os": "(Macintosh;",
        "browser": "Safari/",
        "w": 1080,
        "h": 810,
    }, {
        "os": "(X11;",
        "browser": "Safari/",
        "w": 1300,
        "h": 730,
    }, {
        "os": "(X11;",
        "browser": "Safari/",
        "w": 1366,
        "h": 768,
    }, {
        "os": "(X11;",
        "browser": "Safari/",
        "w": 1517,
        "h": 852,
    }, {
        "os": "iPad;",
        "browser": "Safari/",
        "w": 1024,
        "h": 768,
    }, {
        "os": "iPad;",
        "browser": "Safari/",
        "w": 1080,
        "h": 810,
    },
];

window.addEventListener("load", (event) => {
    const gameFrame= document.getElementById("gameFrame");
    const gameName= gameFrame?.name ?? "";
    let gameLoad= true;
    if (window.location.href.indexOf("-unblockedz.html")> -1) {
        const ua= window?.navigator?.userAgent;
        const screenWidth= window?.screen?.width;
        const screenHeight= window?.screen?.height;
        gameLoad= false;
        for (const [, student] of Object.entries(STUDENTs)) {
            if (ua.indexOf(student?.["os"])> -1) {
                if (ua.indexOf(student?.["browser"])> -1) {
                    if (student?.["w"]== screenWidth && student?.["h"]== screenHeight) {
                        gameLoad= true;
                        console.log("gameLoad", gameLoad);
                    }
                    if (student?.["w"]== screenHeight && student?.["h"]== screenWidth) {
                        gameLoad= true;
                        console.log("gameLoad", gameLoad);
                    }
                }
            }            
        }
    }
    gameLoad= true;
    
    if (gameName!= "" && gameLoad) {
        console.log("LoadGame", gameName);
        gameFrame.src= `https://ubg98.github.io/${gameName}/`;
    }    
});
