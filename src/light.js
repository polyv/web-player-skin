import Panel from '@/panel';
import { INNER_TYPE } from '@/eventType';

class Light extends Panel {
  constructor(options) {
    super();
    this.options = options;
    this.className = 'plv-player-light';
    this.init();
    this.addEvent();
    this.fadeOutClock = null;
  }

  init() {
    this.createDom();
  }

  createDom() {
    const { className } = this;
    super.createContainer();
    const imgClass = `${className}__img`;
    const textClass = `${className}__text`;
    this.$container.html(`
        <div class="${imgClass}"></div>
        <div class="${textClass}"></div>`);
    this.$lightText = this.$container.find(`.${textClass}`);
  }

  addEvent() {
    const { options } = this;
    const eventsCb = {
      [INNER_TYPE.LIGHT_UPDATE]: num => {
        if (num > 100) num = 100;
        if (num < 0) num = 0;
        this.show(parseInt(num));
      }
    };

    Object.keys(eventsCb).forEach(item => {
      options.events.on(item, eventsCb[item]);
    });
  }

  show(num) {
    this.$lightText.html(`${num}%`);
    this.$container.addClass('plv-player__full__opacity');
    this.$container.removeClass('plv-player-fadeOut');
    this.clearFadeoutClock();
    this.fadeOutClock = setTimeout(() => {
      this.$container.addClass('plv-player-fadeOut');
    }, 600);
  }

  clearFadeoutClock() {
    if (this.fadeOutClock) {
      clearTimeout(this.fadeOutClock);
      this.fadeOutClock = null;
    }
  }
}

export default Light;
