
import '@/skin/index.scss';
import Panel from '@/panel';
import { getTemplate } from '@/skin/template';
import PlayToggle from '@/skin/playToggle';
import FullScreenToggle from '@/skin/fullscreenToggle';
import ProgressToggle from '@/skin/progressToggle';
import TimeToggle from '@/skin/timeToggle';
import { EventType, INNER_TYPE } from '@/eventType';

class Skin extends Panel {
  constructor(options) {
    super();
    this.options = options;
    this.className = 'plv-player-skin';
    this.moveClassName = `${this.className}__moveout`;
    this.mrAutoClassName = `${this.className}__mrauto`;
    this.init();
    this.addEvent();
    this.clock = null;
  }

  init() {
    this.createDom();
    this.bindEvent();
  }

  addEvent() {
    const { options } = this;
    const eventsCb = {
      [INNER_TYPE.SKIN_SHOW]: (isShow) => {
        isShow ? this.show() : this.hide();
      },

      [INNER_TYPE.FIRST_PLAY]: () => {
        this.show();
      },

      [INNER_TYPE.REFRESH_BTN_UPDATE]: (isShow) => {
        const { refreshModule, playModule, mrAutoClassName } = this;
        if (!refreshModule) return;

        if (!isShow) {
          refreshModule.hide();
          playModule && playModule.addClass(mrAutoClassName);
          return;
        }

        refreshModule.show();
        playModule && playModule.removeClass(mrAutoClassName);
      },

      [INNER_TYPE.SETTING_BTN_UPDATE]: (isShow) => {
        const { settingModule } = this;
        if (!settingModule) return;
        isShow ? settingModule.show() : settingModule.hide();
      }
    };

    Object.keys(eventsCb).forEach(item => {
      options.events.on(item, eventsCb[item]);
    });
  }

  createDom() {
    const { isLive } = this.options;
    super.createContainer();
    const tmp = getTemplate(this.className, isLive);
    this.$container.append(tmp);
  }

  bindEvent() {
    const { options, className } = this;
    const modules = [
      'play',
      'fullscreen',
      'setting',
      'progress',
      'time',
      'refresh',
      'setting'
    ];

    modules.forEach(item => {
      this[`${item}Module`] = this.$container.find(`.${className}__${item}`);
    });

    new PlayToggle(options, this.playModule);
    new FullScreenToggle(options, this.fullscreenModule);
    new ProgressToggle(options, this.progressModule);
    new TimeToggle(options, this.timeModule);

    this.settingModule.on('click', () => {
      this.options.events.emit(INNER_TYPE.SHOW_SETUP, true);
    });
  }

  show() {
    this.$container.removeClass(this.moveClassName);
    this.options.events.emit(EventType.SHOW_BAR, true);
    this.clearClock();
    // 显示5秒后主动隐藏
    this.clock = setTimeout(() => {
      this.options.events.emit(INNER_TYPE.SKIN_SHOW, false);
      this.options.barup = false;
    }, 5e3);
  }

  hide() {
    this.clearClock();
    this.$container.addClass(this.moveClassName);
    this.options.events.emit(EventType.SHOW_BAR, false);
  }

  clearClock() {
    if (this.clock) {
      clearTimeout(this.clock);
      this.clock = null;
    }
  }

}

export default Skin;
