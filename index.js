const fs = require('fs');


async function makeIndex() {
  const c6xPath= "./@orginal/launch";
  const FILEs= fs.readdirSync(c6xPath);
  let totalGame= 0;
  let totalFrame= 0;
  indexHTML= "<html><head><title>Index of /classroom6x</title>\n";
  indexHTML+= "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, shrink-to-fit=no\">\n";
  indexHTML+= "</head><body><h1>Index of /classroom6x</h1><hr></hr>";
  mapXML= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
  mapXML+= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" ";
  mapXML+= "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" ";
  mapXML+= "xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">\n";
  FILEs.forEach(async (file)=> {
    // console.log("file", file);
    if (file.indexOf(".html")>= 0) {
      totalGame++;
      const content= fs.readFileSync(c6xPath+ "/"+ file).toString();
      const frame= content.split("<iframe")?.[1].split("src=\"")?.[1].split("\"")[0]?? "";
      const game= file.split(".html")[0];
      console.log("file", file, "game", game, "frame", frame);
      try {
        fs.unlinkSync(`${game}/index.html`);
        fs.rmdirSync(game);
      } catch (e) {}
      indexHTML+= `<a href="/${game}/">/${game}/</a><br>`;
      mapXML+= `<url><loc>https://classroom6x.gitlab.io/${game}/</loc></url>\n`;
      if (frame.indexOf("/classroom6x.gitlab.io/")<= -1)  {
        totalFrame++;
        indexFrame= `<html><body style="padding:0px;margin:0px;"><iframe src="${frame}" width= "100%" height= "100%" frameborder="0"></iframe></body></html>`;
        try {
          fs.mkdirSync(game);
        } catch (e) {}
        fs.writeFileSync(`${game}/index.html`, indexFrame);
      }
    }
  });
  indexHTML+= `<hr></hr><h4>Games: ${totalGame}, Frames: ${totalFrame}</h4>`;
  mapXML+= "</urlset>";
  fs.writeFileSync("index.html", indexHTML);
  fs.writeFileSync("sitemaps.xml", mapXML);
}


makeIndex();
