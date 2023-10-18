$(window).on("load", function() {    
    $("a").each(function() {
        let href = $(this).attr('href');
        if (href.indexOf("http")< 0) {
            this.href= "https://ubg98oct.games235.com/"+ href;
        }                
    });        
});
