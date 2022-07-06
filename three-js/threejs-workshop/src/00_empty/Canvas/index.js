import * as THREE from 'three';
// import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
// import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
// import { Scene } from 'three/src/scenes/Scene';
// import { PointLight } from 'three/src/lights/PointLight';
// import { BoxGeometry } from 'three/src/geometries/BoxGeometry';
// import { MeshLambertMaterial } from 'three/src/materials/MeshLambertMaterial';
// import { Mesh } from 'three/src/objects/Mesh';
// import { Vector2 } from 'three/src/math/Vector2';

class Canvas {
  constructor(domId) {
    this.deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    this.dom = document.querySelector(`#${domId}`);
    const rect = this.dom.getBoundingClientRect();

    console.log(`rect`, rect);

    // スクロール量
    this.scrollY = window.scrollY;

    this.mouse = new THREE.Vector2(0, 0);

    // set window size
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    // WebGL レンダラーを作成

    // canvasの背景を透明にする alpha: true
    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.setSize(this.w, this.h); // 描画サイズ
    this.renderer.setPixelRatio(window.devicePixelRatio); // ピクセル比

    // Dom に レンダラーの canvasを追加
    const containerDom = document.querySelector('#canvas-container');
    containerDom.appendChild(this.renderer.domElement);

    // カメラを作成（視野角、画面のアスペクト比、カメラに映る最短距離、カメラに映る最遠距離）
    // https://qiita.com/watabo_shi/items/0811d03390c18e46be86

    const fov = 60;
    const fovRad = this.deg2rad(fov / 2);
    const dist = this.h / 2 / Math.tan(fovRad);

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new THREE.PerspectiveCamera(
      fov,
      this.w / this.h,
      1,
      dist * 2
    );
    // ピクセル座標で3Dオブジェクトを再配置
    this.camera.position.z = dist; // カメラを遠ざける

    // シーンを作成
    this.scene = new THREE.Scene();

    // ライトを作成

    this.light = new THREE.PointLight(0x00ffff);
    this.light.position.set(0, 0, 400); // ライトの位置を設定 ピクセル指定できる

    // ライトをシーンに追加
    this.scene.add(this.light);

    // 立方体のジオメトリを作成（幅、高さ、奥行） ピクセル指定できる
    // const geo = new THREE.BoxGeometry(200, 200, 200);

    // DOMRectサイズの直方体ジオメトリを作成(幅, 高さ, 奥行き)
    const depth = 300;
    const geo = new THREE.BoxGeometry(rect.width, rect.height, depth);

    // マテリアルを作成

    const mat = new THREE.MeshLambertMaterial({color: 0x00ffff});

    // ジオメトリとマテリアルからメッシュを作成
    this.mesh = new THREE.Mesh(geo, mat);
    // this.mesh.rotation.x = this.deg2rad(45);
    // this.mesh.rotation.y = this.deg2rad(45);

    // ウィンドウ中心からDOMRect中心へのベクトルを求めてオフセットする
    const center = new THREE.Vector2(
      rect.x + rect.width / 2,
      rect.y + rect.height / 2
    );

    const diff = new THREE.Vector2(
      center.x - this.w / 2,
      center.y - this.h / 2
    );

    this.mesh.position.set(diff.x, -diff.y, -depth / 2);
    this.offsetY = this.mesh.position.y;

    // this.mesh.position.z = -depth / 2; // 奥行きの半分前に出ているのを下げる

    // メッシュをシーンに追加
    this.scene.add(this.mesh);

    // 画面に表示
    this.renderer.render(this.scene, this.camera);
  }

  scrolled(y) {
    this.scrollY = y;
    console.log(this.scrollY);
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  mouseMoved(x, y) {
    // https://qiita.com/watabo_shi/items/0811d03390c18e46be86#%E3%83%9E%E3%82%A6%E3%82%B9%E3%81%A7%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%A9%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3
    this.mouse.x = x - this.w / 2; // 原点を中心に持ってくる
    this.mouse.y = -y + this.h / 2; // 軸を反転して原点を中心に持ってくる
    // console.log(this.mouse)

    this.light.position.x = this.mouse.x;
    this.light.position.y = this.mouse.y;
  }

  render() {
    // 次のアニメーションを要求
    requestAnimationFrame(() => {
      this.render();
    });

    // スクロールに追従させる
    this.mesh.position.y = this.offsetY + this.scrollY;

    // https://qiita.com/watabo_shi/items/1c3c50429279eedec04e
    // ミリ秒から秒に変換
    // const sec = performance.now() / 1000;

    // // 1秒で45°回転する
    // this.mesh.rotation.x = sec * (Math.PI / 4);
    // this.mesh.rotation.y = sec * (Math.PI / 4);

    // スクロールに追従させる
    // https://qiita.com/watabo_shi/items/0811d03390c18e46be86#%E3%82%B9%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%AB%E9%87%8F%E3%81%A7%E3%83%A1%E3%83%83%E3%82%B7%E3%83%A5%E3%82%92%E5%8B%95%E3%81%8B%E3%81%99
    // パララックス的な動き
    // this.mesh.position.y = this.scrollY * 0.5;

    // this.mesh.rotation.y = 0.05 * this.scrollY * 0.5;

    // this.mesh.scale.x = this.mesh.scale.x + 0.005 * this.randomNumber(-10, 10);
    // this.mesh.scale.y = this.mesh.scale.y + 0.005 * this.randomNumber(-10, 10);

    // this.mesh.position.x =
    //   this.mesh.position.x +
    //   0.00001 * this.randomNumber(-window.innerWidth, window.innerWidth);
    // this.mesh.position.y =
    //   this.mesh.position.y +
    //   0.00001 * this.randomNumber(-window.innerHeight, window.innerHeight);

    // 画面に表示
    this.renderer.render(this.scene, this.camera);
  }
}

export {Canvas};
