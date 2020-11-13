import './index.scss';
import Panel from '@/panel';
import { INNER_TYPE } from '@/eventType';
import { getTemplate } from '@/volume/template';

class Volume extends Panel {
  constructor(options) {
    super();
    this.options = options;
    this.className = 'plv-player-volume';
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
    const tmp = getTemplate(this.className);
    this.$container.append(tmp);
    this.$current = this.$container.find(`.${className}__current`);
    this.$img = this.$container.find(`.${className}__img`);
  }

  addEvent() {
    const { options, className } = this;
    const eventsCb = {
      [INNER_TYPE.VOLUME_UPDATE]: num => {
        if (num > 1) num = 1;
        if (num < 0) num = 0;
        const realNum = parseInt(num * 100);
        if (!num) this.$img.addClass(`${className}__mute`);
        else this.$img.removeClass(`${className}__mute`);
        this.show(realNum);
      }
    };

    Object.keys(eventsCb).forEach(item => {
      options.events.on(item, eventsCb[item]);
    });
  }

  show(num) {
    this.$current.css('width', `${num}%`);
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

export default Volume;
