const fs = require('fs');
const path = require('path');

const ROOT= "C:/Users/SKMGames/SKM Dropbox/SKM Software/@SKMGames/Dev/GitLab/ubg235-brand/classroom6x.gitlab.io/@orginal";
const OUTPUT= "./_posts/games";

async function makeGameByCategory() {
  const categoryPath= `${ROOT}/category`;
  const FILEs= fs.readdirSync(categoryPath);
  let totalCategory= 0;    
  FILEs.forEach(async (category)=> {    
    console.log("category", category);
    if (category.indexOf(".html")>= 0) {
      totalCategory++;
      const content= fs.readFileSync(categoryPath+ "/"+ category).toString();
      const GAMEs= content.split("<a href=\"/launch/");
      GAMEs.shift();
      GAMEs.forEach(async (game)=> {
        // console.log("game", game);
        const slug= game.split(".html\">")[0];
        const post= `${OUTPUT}/2024-01-01-${slug}.md`;
        const title= (game.split(" alt=\"")?.[1]?? "").split("\" />")[0];
        if (title!= "") {
          const data= `title: "${title}"\ndate: 2024-01-01 00:00:00 +0700\ncategories: ${path.basename(category, ".html")}`;
          console.log("slug", slug, "title", title, "post", post);
          fs.writeFileSync(post, `---\nlayout: games\n${data}\npermalink: /games/:slug.html\n---`);
          // fs.writeFileSync("sitemap.xml", mapXML);        
        }        
      });
    }
  });  
}

makeGameByCategory();
