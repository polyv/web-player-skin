import SetupToggle from '@/setup/setupToggle';
import { EventType, INNER_TYPE, SETUP_TYPE } from '@/eventType';
// import { isUndefined } from '@/utils';

class LineToggle extends SetupToggle {
  constructor(options, container) {
    super();
    this.options = options;
    this.container = container;
    this.name = 'line';
    this.type = SETUP_TYPE.BOTTOM_LINE;
    this.defaultIndex = options.line || 0;
    this.changedIndex = null;
    this.addEvent();
  }

  init() {
    const { showLine } = this.options;
    const { LINE1, LINE2 } = this.options.language;

    if (showLine !== true) {
      this.updateType(false);
      return;
    }

    this.line = [LINE1, LINE2];
    this.createDom();
    this.bindEvent();
    this.updateType(true);
  }

  createDom() {
    const { language } = this.options;
    super.createDom(language.LINE, true);
    this.highLight();
  }

  addEvent() {
    const { options } = this;
    const eventsCb = {
      [INNER_TYPE.LINE_UPDATE]: index => {
        options.line = index;
        this.highLight();
      },
      [INNER_TYPE.SHOW_LINE]: isShow => {
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
      const index = e.target.dataset.line / 1;
      if (isNaN(index)) return;
      options.line = index;
      this.highLight();
      this.changedIndex = index;
    });
  }

  highLight() {
    const { modeBtn, className } = this;
    const { line = 0 } = this.options;
    const style = `${className}__active`;
    modeBtn.find(`.${style}`).removeClass(style);
    modeBtn.find(`[data-line="${line}"]`).addClass(style);
  }

  handleClick() {
    const { defaultIndex, changedIndex } = this;
    if ((!changedIndex && changedIndex !== 0) || changedIndex === defaultIndex) return;
    this.defaultIndex = changedIndex;
    this.options.events.emit(EventType.LINE_CHANGED, changedIndex);
  }
}

module.exports = LineToggle;
