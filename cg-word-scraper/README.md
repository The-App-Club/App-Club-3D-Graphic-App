- Reference
  - [the-ultimate-guide-to-web-scraping-with-node-js](https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/)
  - [cgworld](https://entry.cgworld.jp/terms/)

- Sketch

do scrape index

```
Array.prototype.eachSlice = function (size){
  this.arr = []
  for (var i = 0, l = this.length; i < l; i += size){
    this.arr.push(this.slice(i, i + size))
  }
  return this.arr
};

let a = [...document.querySelector(`.box_dictionary_lists`).children].filter(dom=>{return dom.nodeName==="UL" || dom.nodeName==="H4"})

a.eachSlice(2).map(itemList=>{return {key: itemList[0].textContent,value: [...itemList[1].querySelectorAll(`a`)].map(a=>{return a.href})}})
```

do scrape detail

```
let title = a.querySelector('h2').textContent


let yomiJP = a.querySelector('.box_text > p.jp').textContent

let yomiEN = a.querySelector('.box_text > p.en').textContent

let description = a.querySelector('p.txt').textContent
```

Program

One

```
$ time node scripts/get-index.js
```

Two

```
$ time node scripts/get-detail.js

real    0m42.923s
user    0m5.599s
sys     0m0.894s
```

Three

```
$ time node scripts/get-cool.js

real    0m17.318s
user    0m20.560s
sys     0m1.834s
```

Do mash up

```
$ find -type f | grep json | grep -vP 'index|all' | awk '{print "\x27"$0"\x27"}' | xargs cat >all.json

$ cat all.json | jq 'map({"title":.title,"yomiJP": (.yomiJP)|gsub("\\n +";""),"yomiEN": (.yomiEN)|gsub("\\n +";"") ,  "description": (.description)|gsub("\\n +";"")})' | sponge all.json
```
