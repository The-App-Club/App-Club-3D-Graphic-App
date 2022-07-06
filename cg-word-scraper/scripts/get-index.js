const rp = require('request-promise');
const url = 'https://entry.cgworld.jp/terms';
const {writeFileSync, rmdirSync, readFileSync} = require('fs');
const mkdirp = require('mkdirp');
const {JSDOM} = require('jsdom');

const outputDir = './dump';
const dumpDir = './process';

// https://gist.github.com/SauloSilva/9771598
Array.prototype.eachSlice = function (size) {
  this.arr = [];
  for (var i = 0, l = this.length; i < l; i += size) {
    this.arr.push(this.slice(i, i + size));
  }
  return this.arr;
};

function download() {
  return new Promise((resolve, reject) => {
    rp(url)
      .then((html) => {
        writeFileSync(`${outputDir}/index.html`, html);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getDetailPageLinkList(file) {
  const html = readFileSync(`${outputDir}/index.html`, 'utf-8');
  const dom = new JSDOM(html);

  return [
    ...dom.window.document.querySelector(`.box_dictionary_lists`).children,
  ].filter((dom) => {
    return dom.nodeName === 'UL' || dom.nodeName === 'H4';
  });
}

(async () => {
  mkdirp(outputDir);
  mkdirp(dumpDir);
  await download();
  const detailPageLinkList = getDetailPageLinkList();
  const resultInfoList = detailPageLinkList.eachSlice(2).map((itemList) => {
    return {
      key: itemList[0].textContent,
      value: [...itemList[1].querySelectorAll(`a`)].map((a) => {
        return a.href;
      }),
    };
  });

  writeFileSync(`${dumpDir}/index.json`, JSON.stringify(resultInfoList));
})();
