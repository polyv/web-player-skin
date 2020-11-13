import SetupToggle from '@/setup/setupToggle';
import { EventType, INNER_TYPE, SETUP_TYPE } from '@/eventType';

class HdToggle extends SetupToggle {
  constructor(options, container) {
    super();
    this.options = options;
    this.container = container;
    this.name = 'hd';
    this.type = SETUP_TYPE.BOTTOM_HD;
    this.addEvent();
    this.defaultIndex = options.level;
    this.changedIndex = null;
  }

  init() {
    const { levels, language, showHd, autoHd } = this.options;
    const { FHD, HD, SD, AUTO } = language;

    // 可选清晰度选项数组，默认包括自动
    let defaultHds = [[FHD, 3], [HD, 2], [SD, 1], [AUTO, 0]];
    let defaultHdNums = levels + 1;

    if (autoHd === false) {
      defaultHds = defaultHds.splice(0, defaultHds.length - 1);
      defaultHdNums = levels;
    }

    this.hd = defaultHds.splice(defaultHdNums * -1);

    if (showHd === false) {
      this.updateType(false);
      return;
    }

    this.createDom();
    this.bindEvent();
    this.updateType(true);
  }

  createDom() {
    const { language } = this.options;
    super.createDom(language.Quality, true);
    this.highLight();
  }

  addEvent() {
    const { options } = this;
    const eventsCb = {
      [INNER_TYPE.HD_UPDATE]: index => {
        options.level = index;
        this.highLight();
      },
      [INNER_TYPE.SHOW_HD]: isShow => {
        isShow ? this.show() : this.hide();
      }
    };

    Object.keys(eventsCb).forEach(item => {
      options.events.on(item, eventsCb[item]);
    });
  }

  bindEvent() {
    const { modeBtn, options } = this;
    modeBtn.on('click', (e) => {
      const hd = e.target.dataset.hd / 1;
      if (isNaN(hd)) return;
      options.level = hd;
      this.highLight();
      this.changedIndex = hd;
    });
  }

  highLight() {
    const { modeBtn, className } = this;
    const { level } = this.options;
    const style = `${className}__active`;
    modeBtn.find(`.${style}`).removeClass(style);
    modeBtn.find(`[data-hd="${level}"]`).addClass(style);
  }

  handleClick() {
    const { defaultIndex, changedIndex } = this;
    if (!changedIndex || changedIndex === defaultIndex) return;
    this.defaultIndex = changedIndex;
    this.options.events.emit(EventType.HD_CHANGED, changedIndex);
  }
}

module.exports = HdToggle;
