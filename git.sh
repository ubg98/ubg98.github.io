cd ./.public
git initgit remote add origin https://github.com/ubg98/2048Fusion.git
git config --global user.email "games235@skm.vn"
git config --global user.name "games235"
git checkout -b gh-pages
git add . && git commit -m "update" && git push -f --set-upstream origin gh-pages
