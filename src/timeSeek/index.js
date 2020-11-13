import './index.scss';
import Panel from '@/panel';
import { INNER_TYPE } from '@/eventType';
import { getTemplate } from '@/timeSeek/template';
import { timeFormat } from '@/utils';

class TimeSeek extends Panel {
  constructor(options) {
    super();
    this.options = options;
    this.className = 'plv-player-time-seek';
    // 显示格式 1 00：00  2 00：00：00
    this.timeShowBlock = 1;
    this.isFirstSwipe = false;
    this.swipeEndTime = 0;
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
    this.$duration = this.$container.find(`.${className}__duration`);
  }

  addEvent() {
    const { options } = this;
    const eventsCb = {
      [INNER_TYPE.SEEK_TIME_UPDATE]: time => {
        this.show(time);
      },

      [INNER_TYPE.DURATION_UPDATE]: (duration) => {
        this.updateDuration(duration);
      }
    };

    Object.keys(eventsCb).forEach(item => {
      options.events.on(item, eventsCb[item]);
    });
  }

  show(time) {
    const { className } = this;
    this.timeupdate(time);
    this.$container.addClass(`${className}__full__opacity`);
    this.$container.removeClass(`${className}__fadeOut`);
    this.clearFadeoutClock();
    this.fadeOutClock = setTimeout(() => {
      this.$container.addClass(`${className}__fadeOut`);
    }, 600);
  }

  clearFadeoutClock() {
    if (this.fadeOutClock) {
      clearTimeout(this.fadeOutClock);
      this.fadeOutClock = null;
    }
  }

  timeupdate(time) {
    this.$current.html(timeFormat(time, this.timeShowBlock));
  }

  updateDuration(duration) {
    if (duration > 3600)
      this.timeShowBlock = 2;

    if (this.$duration)
      this.$duration.html(timeFormat(duration, this.timeShowBlock));
  }
}

export default TimeSeek;
