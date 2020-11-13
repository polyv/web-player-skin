import { EventType, INNER_TYPE } from '@/eventType';

class ProgressToggle {
  constructor(options, container) {
    this.options = options;
    this.container = container;
    this.className = 'plv-player-skin__progress';
    this.isDraging = false;
    this.init();
    this.addEvent();
    this.handleDrag();
  }

  init() {
    const { container, className } = this;
    this.progressPlay = container.find(`.${className}__play`);
    this.progressDot = container.find(`.${className}__dot`);
    this.progressMask = container.find(`.${className}__mask`);
  }

  addEvent() {
    const { options, videoDuration } = this;
    const eventsCb = {
      [INNER_TYPE.DURATION_UPDATE]: (duration) => {
        this.videoDuration = duration || videoDuration || 0;
      },

      [INNER_TYPE.TIME_UPDATE]: (time) => {
        this.timeupdate(time);
      }
    };

    Object.keys(eventsCb).forEach(item => {
      options.events.on(item, eventsCb[item]);
    });
  }

  timeupdate(time) {
    if (this.isDraging) return;
    this.precent = this.calcPrecent(time);
    this.updateProgress(this.precent);
  }

  updateProgress(precent) {
    precent = `${parseInt(precent * 100)}%`;
    this.progressDot.css('left', precent);
    this.progressPlay.css('width', precent);
  }

  calcPrecent(currentTime) {
    const { videoDuration } = this;
    if (currentTime > videoDuration) return 0;
    return currentTime / videoDuration;
  }

  handleDrag() {
    const { container, progressMask } = this;
    let controlWidth, initTouchPageX, touchPageX, finalPrecent;

    const calcPrecentChange = (count) => {
      const { precent } = this;
      const changedPrecent = count / controlWidth;
      finalPrecent = precent + changedPrecent;
      finalPrecent = this.limit(finalPrecent, 0, 1);
      this.updateProgress(finalPrecent);

      return finalPrecent;
    };

    const getChangedX = (touchPageX, initTouchPageX) => {
      return touchPageX - initTouchPageX;
    };

    progressMask.on('touchstart', (e) => {
      controlWidth = container[0].offsetWidth;
      initTouchPageX = e.targetTouches[0].pageX;

      this.clickToSeek(initTouchPageX, controlWidth);
    });

    progressMask.on('touchmove', (e) => {
      this.isDraging = true;
      touchPageX = e.targetTouches[0].pageX;
      const currentTime = getChangedX(touchPageX, initTouchPageX);
      calcPrecentChange(currentTime);
    });

    progressMask.on('touchend', () => {
      // 报错Ignored attempt to cancel a touchstart event with cancelable=false
      // 解决：touchend监听事件里不要return false
      if (this.isDraging) {
        this.toSeek(finalPrecent);
        this.isDraging = false;
      }
    });
  }

  clickToSeek(initTouchPageX) {
    const { container } = this;

    const offsetLeft = container[0].offsetLeft;
    const X = initTouchPageX - offsetLeft;
    const precent = X / container.width();
    this.updateProgress(precent);
    this.toSeek(precent);

    this.options.events.emit(INNER_TYPE.SKIN_SHOW, true);
    this.options.barup = true;
  }

  toSeek(precent) {
    const seekTime = parseInt(precent * this.videoDuration);
    if (!isNaN(seekTime)) this.options.events.emit(EventType.PROGRESS_DRAG_END, seekTime);
  }

  /**
   * 控制最小值，最大值
   * @param num
   * @param min
   * @param max
   * @returns {*}
   */
  limit(num, min, max) {
    if (num < min) return min;
    if (num > max) return max;
    return num;
  }
}

export default ProgressToggle;
