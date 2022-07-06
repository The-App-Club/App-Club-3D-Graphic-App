// fragment shader ( フラグメントシェーダー、ピクセルシェーダー )
// このファイルに各ピクセルごとの処理を記述します

varying float vSample;// 頂点シェーダーから送られてきた varying 変数を受け取る
varying vec2 vUv;
uniform float uAspect;// 画面のアスペクト比
uniform float uTime;// 時間
uniform vec2 uMouse;//マウス座標
uniform float uRadius;// 半径

void main(){
  
  vec2 uv=vec2(vUv.x*uAspect,vUv.y);// xをアスペクト補正したテクスチャ座標
  vec2 center=vec2(uMouse.x*uAspect,uMouse.y);// xをアスペクト補正した画面の中心
  float radius=.05+sin(uTime*2.)*.025;// 時間で半径をアニメーションさせる
  float lightness=uRadius/length(uv-center);
  float dist=length(uv-center);// 中心から現在のピクセルへの距離を取得
  
  // lightness = clamp( lightness, 0.0, 1.0 );
  
  vec4 color=vec4(vec3(lightness),1.);// 距離を rgb に変換
  
  // https://qiita.com/watabo_shi/items/1b48ca54a9034f3614d8#%E5%86%86%E3%81%AB%E8%89%B2%E3%82%92%E3%81%A4%E3%81%91%E3%82%8B
  color*=vec4(.7569,.8078,.0431,1.);
  // vec4 color=vec4(vUv.x,vUv.y,0.,1.);// テクスチャ座標を r g に入れる
  gl_FragColor=color;// gl_FragColor に vec4 型（rgba）の色を入れることでピクセル色を決定する。
}