const rp = require('request-promise');
const url = 'https://entry.cgworld.jp/terms';
const {writeFileSync, rmdirSync, readFileSync} = require('fs');
const mkdirp = require('mkdirp');
const {JSDOM} = require('jsdom');

const HTMLDecoderEncoder = require('html-encoder-decoder');

const inputDir = './process';
const outputDir = './dump';

function getFileName(url) {
  return decodeURIComponent(url.split(/\//).reverse()[0]);
}

function download(url, dirName) {
  return new Promise((resolve, reject) => {
    rp(url)
      .then(async (html) => {
        await mkdirp(`${outputDir}/${dirName}`);
        await writeFileSync(
          `${outputDir}/${dirName}/${getFileName(url)}`,
          html
        );
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getDetailPageLinkList(file) {
  const json = readFileSync(`${inputDir}/index.json`, 'utf-8');
  return JSON.parse(json);
}

(async () => {
  mkdirp(inputDir);
  mkdirp(outputDir);
  const detailPageLinkList = getDetailPageLinkList();

  for (let i = 0; i < detailPageLinkList.length; i++) {
    const detailPageLink = detailPageLinkList[i];

    const {key, value} = {...detailPageLink};

    for (let j = 0; j < value.length; j++) {
      const url = value[j];
      await download(url, key);
      console.log(`[${key}] ${j} process done`);
    }
  }
})();
