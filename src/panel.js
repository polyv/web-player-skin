import $ from 'dom7';

class Panel {
  constructor() {
    this.$container = null;
    this.child = null;
  }

  createContainer() {
    const { options, className } = this;
    const { container } = options;

    this.$container = $('<div></div>')
      .addClass('plv-player-panel')
      .addClass(`${className}`);
    container.append(this.$container);
  }

  show() {
    if (this.$container) this.$container.show();
    if (this.child) this.child.show();
  }

  hide() {
    if (this.$container) this.$container.hide();
    if (this.child) this.child.hide();
  }

  destroy() {
    if (this.$container) this.$container.remove();
    if (this.child && this.child.destroy) this.child.destroy();
  }
}

module.exports = Panel;
