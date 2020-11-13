import { EventType } from '@/eventType';

class FullScreenToggle {
  constructor(options, container) {
    this.options = options;
    this.container = container;
    this.className = 'plv-player-skin';
    this.normalClass = `${this.className}__normalscreen`;
    this.bindEvent();
  }

  bindEvent() {
    const { normalClass, container } = this;
    const { stayFullState } = this.options;
    container.on('click', () => {
      const isFull = container.hasClass(normalClass);
      if (!stayFullState)
        isFull ? this.normalState() : this.fullState();
      this.options.events.emit(EventType.FULL_BTN_CLICKED, !isFull);
    });
  }

  fullState() {
    const { normalClass, container } = this;
    container.addClass(normalClass);
  }

  normalState() {
    const { normalClass, container } = this;
    container.removeClass(normalClass);
  }
}

export default FullScreenToggle;
