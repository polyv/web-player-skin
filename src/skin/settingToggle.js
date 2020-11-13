class SettingToggle {
  constructor(set, container) {
    this.set = set;
    this.container = container;
    this.addEvent();
    this.container.on('click', () => {
      this.handleClick();
    });
  }

  addEvent() {
  }

  handleClick() {
    const { state } = this;
    if (state) {
      this.pauseState();
      return;
    }
    this.playState();
  }
}

module.exports = SettingToggle;
