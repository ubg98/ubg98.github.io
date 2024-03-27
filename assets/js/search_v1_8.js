const GAMEs= [];
let globalSearchQuery= "";
let globalSearchBusy= false;


DoSearch= function(searchQuery) {
    let found= false;
    let cnt= 0;
    let searchQueryEX= searchQuery.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()+ "-"; 
    for (i= 0; i<= 25; i++) {
        $("#menuSearch").children("a").eq(1).remove();
    }
    console.log("Search", searchQuery, "//", searchQueryEX);
    GAMEs.forEach((item)=> {
        let match= true;
        let pos= 0;
        let title= item?.["title"]?? "";
        let site= item?.["site"]?? "";
        let link= item?.["link"]?? "";
        for (i=0; i< searchQueryEX.length; i++) {
            let newPos= title.toLowerCase().indexOf(searchQueryEX[i], pos);
            if (newPos< 0) {
                match= false;
                break;
           } else {
               pos= newPos+ 1;
           }
        }
        if (searchQuery== "") {
            match= false;
        }
        if (match && cnt< 15) {
            cnt++;
            found= true;
            let newSubMenu= `<a class="dropdown-item" href="https://${site}${link}">${title}</a>`;
            $('#menuSearch').append(newSubMenu);
        }        
    });
    if (searchQuery== "") {
        let EmptySubMenu = "<a class=\"dropdown-item\" href=\"#\">Oops!</a>";
        $('#menuSearch').append(EmptySubMenu);
    } else if (!found) {
        if (searchQuery.length>= 3 && !globalSearchBusy) {
            let q= encodeURIComponent(searchQuery);
            let s= window.location.host;
            globalSearchBusy= true;
            $.getScript(`https://ubg235.pages.dev/search?q=${q}&s=${s}`)
            .done(function(script, textStatus) {
                console.log("searchLogs", textStatus);
                globalSearchBusy= false;
            })
            .fail(function(jqxhr, settings, exception) {
                console.log("searchLogs Fail!");
                globalSearchBusy= false;
            });            
        }        
        let NotFoundSubMenu = "<a class=\"dropdown-item\" href=\"#\">Not Found!</a>";
        $('#menuSearch').append(NotFoundSubMenu);
    }    
}


SearchQueryChange= function() {
    if (!globalSearchBusy && globalSearchQuery!= $("#searchInput").val()) {
        globalSearchQuery= $("#searchInput").val();        
        DoSearch(globalSearchQuery.trim());
    }    
}


$("#searchMenu").click(function(v){    
    setTimeout(()=> {
        $("#searchInput").select();
        $("#searchInput").focus();  
    }, 100);    
});


$.get("/assets/js/games.json", {}, function(data, response) {
    try {
        data["games"].forEach((item)=> {
            GAMEs.push(item);
        });
    } catch (e) {}    
    // console.log("GAMEs", GAMEs);
});
setInterval(SearchQueryChange, 500);
