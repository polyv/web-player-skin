import '@/setup/index.scss';
import Panel from '@/panel';
import { INNER_TYPE, SETUP_TYPE } from '@/eventType';
import { getTemplate } from '@/setup/template';
import AudioToggle from '@/setup/audioToggle';
import DanmuToggle from '@/setup/danmuToggle';
import RateToggle from '@/setup/rateToggle';
import HdToggle from '@/setup/hdToggle';
import LineToggle from '@/setup/lineToggle';

class Setup extends Panel {
  constructor(options) {
    super();
    this.options = options;
    this.className = 'plv-player-setup';
    this.fadeInClass = `${this.className}__fade-in-section`;
    this.components = [];
    this.addEvent();
    this.createDom();
    this.bindEvent();
  }

  createDom() {
    super.createContainer();
    const tmp = getTemplate(this.className);
    this.$container.append(tmp);
    this.registerSetupComponent();
  }

  addEvent() {
    const { options } = this;
    const eventsCb = {
      [INNER_TYPE.SHOW_SETUP]: isShow => {
        isShow ? this.show() : this.hide();
      },
      [INNER_TYPE.UPDATE_SETUP]: (data) => {
        this.updateSetBtn(data);
      }
    };

    Object.keys(eventsCb).forEach(item => {
      options.events.on(item, eventsCb[item]);
    });
  }

  bindEvent() {
    this.$container.on('click', (e) => {
      // 点击空白区域才执行隐藏
      const targetClassName = e.target.className;

      const isMatch = /plv-player-panel|plv-player-setup__content|plv-player-setup__top__full/.test(targetClassName || '');
      if (!isMatch) return;
      this.hide();

      this.components.forEach(item => {
        if (item.handleClick) item.handleClick();
      });
    });
  }

  registerSetupComponent() {
    const { $container, className, options } = this;
    this.topNum = 0;
    this.topWrap = $container.find(`.${className}__top`);
    this.bottomWrap = $container.find(`.${className}__bottom`);

    const module = {
      // 音频按钮
      [SETUP_TYPE.TOP_AUDIO]: {
        Class: AudioToggle
      },
      // 弹幕按钮
      [SETUP_TYPE.TOP_DANMU]: {
        Class: DanmuToggle
      },
      // 倍速切换
      [SETUP_TYPE.BOTTOM_RATE]: {
        Class: RateToggle
      },
      // 码率切换
      [SETUP_TYPE.BOTTOM_HD]: {
        Class: HdToggle
      },
      // 线路切换
      [SETUP_TYPE.BOTTOM_LINE]: {
        Class: LineToggle
      }
    };

    this.module = module;

    Object.keys(module).forEach(item => {
      // 按钮生成的父容器
      const parentEl = item.indexOf('TOP') > -1 ? this.topWrap : this.bottomWrap;

      let args = [options, parentEl];

      this[item] = new module[item].Class(...args);

      this.components.push(this[item]);
    });

    this.components.forEach(item => {
      item.init();
    });
  }

  /**
   * 设置面板按钮个数更新
   */
  updateSetBtn(data) {
    const { options } = this;
    const { type, isShow } = data;
    if (!this.module) return;
    // 保存按钮状态
    this.module[type].isShow = isShow;
    // 计算按钮个数
    const { topNum, bottomNum } = this.countBtnNum();

    // STEP1: 没有设置子组件按钮, 则不显示设置按钮
    const total = topNum + bottomNum;
    options.events.emit(INNER_TYPE.SETTING_BTN_UPDATE, total);

    // STEP2: 若只有顶部按钮，则居中显示
    const fullClass = 'plv-player-setup__top__full';
    const toggleFull = (isFull) => {
      if (!this.topWrap) return;
      isFull ? this.topWrap.addClass(fullClass) : this.topWrap.removeClass(fullClass);
    };
    toggleFull(!bottomNum);

    // STEP3: 计算顶部按钮占宽度百分比
    this.updateTopWidth(topNum);
  }

  /**
   * 计算按钮个数
   * @returns {{topNum: number, bottomNum: number}}
   */
  countBtnNum() {
    let topNum = 0, bottomNum = 0;
    const { module } = this;

    Object.keys(module).forEach(item => {
      if (!module[item].isShow) return;

      if (item.indexOf('TOP') > -1)
        topNum++;
      else
        bottomNum++;
    });

    return { topNum, bottomNum };
  }

  /**
   * 顶部按钮更新宽度
   */
  updateTopWidth(topNum) {
    if (!topNum) return;
    const width = topNum === 1 ? 'unset' : `${100 / topNum}%`;
    Object.keys(this.module).forEach(item => {
      if (item.indexOf('TOP') < 0) return;
      if (this[item] && this[item].updateWidth)
        this[item].updateWidth(width);
    });
  }

  show() {
    const { fadeInClass } = this;
    this.$container.addClass(fadeInClass);
  }

  hide() {
    const { fadeInClass } = this;
    this.$container.removeClass(fadeInClass);
  }
}

export default Setup;
