import { Blue } from './colors/blue';
import { Green } from './colors/green';
import { Red } from './colors/red';

class ColorFactory {
  constructor() {
    this.colorList = require('./colors');
  }

  getColor(color) {
    if (color === 'green') {
      return new Green();
    } else if (color === 'red') {
      return new Red();
    } else if (color === 'blue') {
      return new Blue();
    } else {
      return new Color();
    }
  }
}

export default ColorFactory;
