import { EventType, INNER_TYPE } from '@/eventType';

class PlayToggle {
  constructor(options, container) {
    this.options = options;
    this.container = container;
    this.className = 'plv-player-skin';
    this.pausedClass = `${this.className}__pause`;
    this.state = false;
    this.addEvent();
    this.bindEvent();
  }

  addEvent() {
    const { options } = this;
    const eventsCb = {
      [INNER_TYPE.PLAY_BTN_UPDATE]: (isToPlay) => {
        isToPlay ? this.playState() : this.pauseState();
      },

      [INNER_TYPE.PLAY_BTN_TOGGLE]: () => {
        const toPlaying = !this.state;
        toPlaying ? this.playState() : this.pauseState();
        this.options.events.emit(EventType.PLAY_BTN_CLICKED, toPlaying);
      }
    };

    Object.keys(eventsCb).forEach(item => {
      options.events.on(item, eventsCb[item]);
    });
  }

  bindEvent() {
    const { pausedClass, container } = this;
    container.on('click', () => {
      const isPlaying = container.hasClass(pausedClass);
      isPlaying ? this.pauseState() : this.playState();
      this.options.events.emit(EventType.PLAY_BTN_CLICKED, !isPlaying);
    });
  }

  playState() {
    const { pausedClass, container, options } = this;
    if (!container.hasClass(pausedClass)) container.addClass(pausedClass);
    if (!options.firstPlayState) {
      options.firstPlayState = true;
      this.options.events.emit(INNER_TYPE.FIRST_PLAY);
    }
    this.state = true;
  }

  pauseState() {
    const { pausedClass, container } = this;
    container.removeClass(pausedClass);
    this.state = false;
  }

  toggleState() {

  }
}

export default PlayToggle;
