import SetupToggle from '@/setup/setupToggle';
import { EventType, SETUP_TYPE } from '@/eventType';
import $ from 'dom7';
import { isUndefined } from '@/utils';

class AudioToggle extends SetupToggle {
  constructor(options, container) {
    super();
    this.options = options;
    this.container = container;
    this.className = 'plv-player-setup';
    this.type = SETUP_TYPE.TOP_AUDIO;
    this.state = true; // false audio音频模式  true video视频模式
    this.nextState = null;
  }

  init() {
    const { showAudioBtn } = this.options;
    if (showAudioBtn !== true) {
      this.updateType(false);
      return;
    }
    this.createDom();
    this.bindEvent();
    this.updateType(true);
  }

  createDom() {
    const { className } = this;
    const { language } = this.options;
    const modeBtn = $(`
        <div class="${className}__section__top ${className}__section__top__border">
            <div class="${className}__selected ${className}__unselected"></div>
            <div>${language.AUDIO}</div>
        </div>`);
    this.modeBtn = modeBtn;
    this.select = modeBtn.find(`.${className}__selected`);
    this.container.append(modeBtn);
  }

  bindEvent() {
    const { modeBtn } = this;
    modeBtn.on('click', () => {
      this.nextState = !this.state;
      this.highLight(this.nextState);
    });
  }

  handleClick() {
    const { nextState, options } = this;

    if (!isUndefined(nextState)) {
      this.nextState = nextState;
      options.events.emit(EventType.AUDIO_BTN_CLICKED, this.state);
      // this.switchMode();
    }

    this.nextState = null;
  }

  switchMode() {
    const { state, className } = this;
    const { container } = this.options;

    const remove = () => {
      container.find(`.${className}__audio`).remove();
    };

    if (!state) {
      const style = `${className}__audio`;
      remove();
      const audioPoster = $(`<div class="${style}">`);
      container.append(audioPoster);
      return;
    }

    remove();
  }

  highLight(isVideo) {
    const { select, className } = this;
    const style = `${className}__unselected`;
    isVideo ? select.addClass(style) : select.removeClass(style);
    this.state = isVideo;
  }
}

module.exports = AudioToggle;
