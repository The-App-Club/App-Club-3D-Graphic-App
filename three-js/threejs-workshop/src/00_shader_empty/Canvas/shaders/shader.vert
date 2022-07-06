// vertex shader ( 頂点シェーダー )
// このファイルに各頂点ごとの処理を記述します

// https://qiita.com/watabo_shi/items/1b48ca54a9034f3614d8#varying%E5%A4%89%E6%95%B0
varying float vSample; // varying: 頂点シェーダーからピクセルシェーダーに変数を送るための装飾子

varying vec2 vUv;

void main() {
  vUv = uv; // uv: ShaderMaterialで補完される vec2 型(xy)の変数。テクスチャ座標のこと。
  vSample = 111.0; // main() の中で値を代入する

  vec3 pos = position; // position: ShaderMaterialで補完される vec3 型(xyz)の変数。ジオメトリの頂点のこと。

  gl_Position = vec4( pos, 1.0 );
}
