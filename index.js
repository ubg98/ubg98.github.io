const fs = require('fs');


async function makeIndex() {
  const c6xPath= "./@orginal/launch";
  const FILEs= fs.readdirSync(c6xPath);
  indexHTML= "<html><head><title>Index of /classroom6x</title>\n";
  indexHTML+= "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, shrink-to-fit=no\">\n";
  indexHTML+= "</head><body><h1>Index of /classroom6x</h1><hr>";
  FILEs.forEach(async (file)=> {
    // console.log("file", file);
    if (file.indexOf(".html")>= 0) {
      const content= fs.readFileSync(c6xPath+ "/"+ file).toString();
      const frame= content.split("<iframe")?.[1].split("src=\"")?.[1].split("\"")[0]?? "";
      const game= file.split(".html")[0];
      console.log("file", file, "game", game, "frame", frame);
      indexHTML+= `<a href="/${game}/">/${game}/</a><br>`;
      if (frame.indexOf("/classroom6x.gitlab.io/")<= -1)  {
        indexFrame= `<html><body style="padding:0px;margin:0px;"><iframe src="${frame}" width= "100%" height= "100%" frameborder="0"></iframe></body></html>`;
        try {
          fs.mkdirSync(game);
        } catch (e) {}
        fs.writeFileSync(`${game}/index.html`, indexFrame);
      }
    }
  });
  fs.writeFileSync("index.html", indexHTML);
}


makeIndex();
