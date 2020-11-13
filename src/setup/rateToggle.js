import SetupToggle from '@/setup/setupToggle';
import { EventType, SETUP_TYPE } from '@/eventType';

class RateToggle extends SetupToggle {
  constructor(options, container) {
    super();
    this.options = options;
    this.container = container;
    this.name = 'rate';
    this.type = SETUP_TYPE.BOTTOM_RATE;
    if (!options.currentRate) options.currentRate = 1;
    this.defaultIndex = options.currentRate;
    this.changedIndex = null;
    this.updateType(true);
  }

  init() {
    const { showRate } = this.options;
    this.rate = this.getRate();
    if (this.rate.length === 0 || showRate === false) {
      this.updateType(false);
      return;
    }
    this.createDom();
    this.bindEvent();
    super.updateType(true);
  }

  createDom() {
    const { language } = this.options;
    super.createDom(language.Rate, true);

    this.highLight();
  }

  bindEvent() {
    const { modeBtn, options } = this;
    modeBtn.on('click', (e) => {
      const rate = e.target.dataset.rate / 1;
      if (isNaN(rate)) return;
      options.currentRate = rate;
      this.highLight();
      this.changedIndex = rate;
    });
  }

  /**
   * 计算默认倍速选项
   */
  getRate() {
    const { speed } = this.options;
    const defaultRate = [0.5, 1.0, 1.5, 2];

    // 设置为false则关闭倍速
    if (speed === false)
      return [];

    if (!Array.isArray(speed))
      return defaultRate;

    // 自定义倍数，自动填入倍速1，所设置速率值必须大于0，少于或等于3
    // 最多设置6种速率（不包含1），所设置值会按由大到小自动排序
    let newRate = speed.filter(item => item !== 1 && item > 0 && item <= 3);
    newRate.push(1);
    return newRate.sort().slice(0, 7);
  }

  highLight() {
    const { modeBtn, className } = this;
    const { currentRate } = this.options;
    const style = `${className}__active`;
    modeBtn.find(`.${style}`).removeClass(style);
    modeBtn.find(`[data-rate="${currentRate}"]`).addClass(style);
  }

  handleClick() {
    const { defaultIndex, changedIndex } = this;
    if (!changedIndex || changedIndex === defaultIndex) return;
    this.defaultIndex = changedIndex;
    this.options.events.emit(EventType.RATE_CHANGED, changedIndex);
  }
}

export default RateToggle;
