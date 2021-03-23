import Blue from './colors/blue.js';
import Green from './colors/green.js';
import Red from './colors/red.js';
import colorList from './colors.js';
class ColorFactory {
  constructor() {
    this.colorList = colorList;
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
