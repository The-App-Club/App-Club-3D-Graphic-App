import './styles/index.scss';
import {Split} from './components/split';
import {WebGL} from './components/webgl';

class App {
  constructor() {
    window.addEventListener(
      'DOMContentLoaded',
      () => {
        this.init();
      },
      false
    );
  }
  init() {
    new Split();
    new WebGL();
  }
}
new App();
