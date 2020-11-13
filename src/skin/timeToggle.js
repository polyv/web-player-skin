import { INNER_TYPE } from '@/eventType';
import { timeFormat } from '@/utils';

class TimeToggle {
  constructor(options, container) {
    this.options = options;
    this.container = container;
    this.className = 'plv-player-skin__time';
    // 显示格式 1 00：00  2 00：00：00
    this.timeShowBlock = 1;
    this.init();
    this.addEvent();
  }

  init() {
    const { container, className } = this;
    this.durationBlock = container.find(`.${className}__duration`);
    this.currentBlock = container.find(`.${className}__current`);
  }

  addEvent() {
    const { options } = this;
    const eventsCb = {
      [INNER_TYPE.DURATION_UPDATE]: (duration) => {
        options.duration = duration;
        this.updateDuration(duration);
      },

      [INNER_TYPE.TIME_UPDATE]: (time) => {
        options.currentTime = time;
        this.timeupdate(time);
      }
    };

    Object.keys(eventsCb).forEach(item => {
      options.events.on(item, eventsCb[item]);
    });
  }

  timeupdate(time) {
    this.currentBlock.html(timeFormat(time, this.timeShowBlock));
  }

  updateDuration(duration) {
    if (duration > 3600)
      this.timeShowBlock = 2;

    this.durationBlock.html(timeFormat(duration, this.timeShowBlock));
  }
}

export default TimeToggle;
