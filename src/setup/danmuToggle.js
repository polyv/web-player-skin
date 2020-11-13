import SetupToggle from '@/setup/setupToggle';
import { EventType, SETUP_TYPE } from '@/eventType';
import $ from 'dom7';

class DanmuToggle extends SetupToggle {
  constructor(options, container) {
    super();
    this.options = options;
    this.container = container;
    this.className = 'plv-player-setup';
    this.type = SETUP_TYPE.TOP_DANMU;
    this.state = true;
    this.nextState = true;
    this.isChange = false;
  }

  init() {
    const { showDanmu, danmuInitState } = this.options;
    if (showDanmu !== true) {
      this.updateType(false);
      return;
    }
    this.createDom();
    this.bindEvent();
    this.updateType(true);
    if (danmuInitState === false)
      this.highLight(false);
  }

  createDom() {
    const { className } = this;
    const { language } = this.options;
    const modeBtn = $(`
        <div class="${className}__section__top">
            <div class="${className}__selected"></div>
            <div>${language.DANMU}</div>
        </div>`);
    this.modeBtn = modeBtn;
    this.select = modeBtn.find(`.${className}__selected`);
    this.container.append(modeBtn);
  }

  bindEvent() {
    const { modeBtn } = this;
    modeBtn.on('click', () => {
      this.isChange = !this.isChange;
      this.nextState = !this.state;
      this.highLight(this.nextState);
    });
  }

  handleClick() {
    const { options, nextState, isChange } = this;

    if (!isChange) return;

    options.events.emit(EventType.DANMU_BTN_CLICKED, nextState);

    this.isChange = false;
  }

  highLight(isShow) {
    const { state, select, className } = this;
    if (state === isShow) return;
    const style = `${className}__unselected`;
    isShow ? select.removeClass(style) : select.addClass(style);
    this.state = isShow;
  }
}

export default DanmuToggle;
