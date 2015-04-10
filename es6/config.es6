var _ = require('lodash');
var is = require('is_js');

var Config = {};

/*
class Base {
  constructor(override = {}) {
    this.raw = {};
    _.assign(this.raw, override);
  }

  get(key) {

  }

  set(key) {

  }

  getFormHtml() {
    if( is.json(this.formTypes) ) {
      return this._generateForm();
    }
    return false;
  }

  _generateForm() {
    var self = this;
    var html = '<div class="config-form">';
    _.each(this.formTypes, (v)=>{
      var method = self[('_' + _.camelCase(v.type))];
      if(is.not.function(method)) {
        throw new Error(`${v.type} というフォームタイプは存在しません`);
      }
      html += method(v);
    });
    html = "</div>";
  }

  _generateSelect(opt = {}) {
    return `
      <div>
        <select>
        <%= _.each(opt.options, function(v){ %>
          <option value="<%= v.value %>"><%= v.display %></option>
        <% }); %>
        </select>
      </div>
    `;
  }

  _generateCheckbox(opt = {}) {
    return ``;
  }

  _generateRadioButton(opt = {}) {
  }

  _generateColorPicker(opt = {}) {
  }
}

Config.Base = Base;

module.exports = Config;
module.exports = {
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
*/
