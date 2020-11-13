import Panel from '@/panel';
import { EventType, INNER_TYPE } from '@/eventType';

class ScreenShot extends Panel {
  constructor(options) {
    super();
    this.options = options;
    this.className = 'plv-player-screenshot';
    this.moveClassName = `${this.className}__moveout`;
    this.init();
    this.addEvent();
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
      }
    };

    Object.keys(eventsCb).forEach(item => {
      options.events.on(item, eventsCb[item]);
    });
  }

  createDom() {
    super.createContainer();
  }

  bindEvent() {
    const { $container } = this;
    $container.on('click', () => {
      this.options.events.emit(EventType.SCREEN_SHOT);
    });
  }

  show() {
    this.$container.removeClass(this.moveClassName);
  }

  hide() {
    this.$container.addClass(this.moveClassName);
  }
}

export default ScreenShot;
