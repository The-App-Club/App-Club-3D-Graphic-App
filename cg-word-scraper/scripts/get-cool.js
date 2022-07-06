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

function coolParse(url, dirName) {
  return new Promise(async (resolve, reject) => {
    const html = await readFileSync(
      `${outputDir}/${dirName}/${getFileName(url)}`,
      'utf-8'
    );
    const dom = new JSDOM(html);
    const niceDom = dom.window.document.querySelector(`.box_dictionary_post`);
    resolve(
      JSON.stringify({
        title: niceDom.querySelector('h2').textContent,
        yomiJP: niceDom.querySelector('.box_text > p.jp').textContent,
        yomiEN: niceDom.querySelector('.box_text > p.en').textContent,
        description: niceDom.querySelector('p.txt').textContent,
      })
    );
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
      const dumpData = await coolParse(url, key);

      await mkdirp(`${inputDir}/${key}`);
      await writeFileSync(
        `${inputDir}/${key}/${getFileName(url).replace(/html$/, 'json')}`,
        dumpData
      );
      console.log(`[${key}] ${j} process done`);
    }
  }
})();
