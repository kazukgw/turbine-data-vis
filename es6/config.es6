var _ = require('lodash');

var colorPrimary = [
  '#FE4721',
  '#FF8D75',
  '#FF6A4B',
  '#D72702',
  '#A91D00'
];

var colorSecondary = [
  '#FEDF21',
  '#FFEC75',
  '#FFE64B',
  '#D7B902',
  '#A99100'
];

var colorSecondary2 = [
  '#5126AE',
  '#8869CC',
  '#6944B9',
  '#3A1093',
  '#2C0B73'
];

var colorComplement = [
  '#18B854',
  '#61D38B',
  '#39C26C',
  '#019C3B',
  '#007A2E'
];

var pointDefault = {
  'fill-opacity': 0.6
};

var polygonDefault = {
  'stroke-width': '1px',
  'fill-opacity': 0
};

module.exports = {
  color: [
    colorPrimary,
    colorSecondary,
    colorSecondary2,
    colorComplement
  ],
  point: {
    r: 2
  },
  style: {
    point: [
      extend(pointDefault, { fill: colorPrimary[0] }),
      extend(pointDefault, { fill: colorSecondary[0] }),
      extend(pointDefault, { fill: colorSecondary2[0] }),
      extend(pointDefault, { fill: colorComplement[0] })
    ],
    polygon: [
      extend(polygonDefault, { stroke: colorPrimary[1] }),
      extend(polygonDefault, { stroke: colorSecondary[1] }),
      extend(polygonDefault, { stroke: colorSecondary2[1] }),
      extend(polygonDefault, { stroke: colorComplement[1] })
    ],
    axisLine: {
      'stroke': '#1D1D1D',
      'stroke-width': '0.1px',
      'stroke-opacity': '0.9'
    },
    axisTitle: {
      'font-size': '10px',
      'stroke': '#1D1D1D',
      'stroke-width': '0.5px'
    },
    axisText: {
      'font-size': '9px',
      'stroke': '#999',
      'stroke-width': '0.5px'
    }
  }
};

function extend(a, b) {
  return _.assign(_.cloneDeep(a), b);
}
