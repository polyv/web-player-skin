import $ from 'dom7';
import { INNER_TYPE } from '@/eventType';

class SetupToggle {
  constructor() {
    this.modeBtn = null;
    this.className = 'plv-player-setup';
  }

  /**
   * 创建dom
   * @param tmp
   * @param isFill 是否根据数组补充选项dom（如清晰度，线路，倍速）
   */
  createDom(tmp, isFill = false) {
    const { name, className } = this;

    if (!isFill) {
      this.modeBtn = $(tmp);
      this.container.append(this.modeBtn);
      return;
    }

    let optionsTmp = '';
    let dataSet, dataVal;
    this[name].forEach((item, index) => {
      switch (name) {
        case 'hd':
          dataSet = item[1];
          dataVal = item[0];
          break;
        case 'line':
          dataSet = index;
          dataVal = item;
          break;
        case 'rate':
          dataSet = item;
          dataVal = `${item}x`;
          break;
      }

      const largeClassName = `${className}__opt__large`;
      optionsTmp += `<div class="${className}__opt ${name === 'hd' ? largeClassName : ''}" data-${name}="${dataSet}">${dataVal}</div>`;
    });

    const wrapTmp = `
        <div class="${className}__section">
            <div class="${className}__title">${tmp}</div>
            <div class="${className}__content">${optionsTmp}</div>
        </div>`;

    this.modeBtn = $(wrapTmp);
    this.container.append(this.modeBtn);
  }

  highLight(type) {
    const { options, modeBtn, className, name } = this;
    const style = `${className}__active`;
    modeBtn.find(`.${style}`).removeClass(style);
    modeBtn.find(`[data-${name}="${options[type]}"]`).addClass(style);
  }

  updateWidth(width) {
    if (this.modeBtn) this.modeBtn.css('width', width);
  }

  enable() {
    const { modeBtn, className } = this;
    modeBtn.removeClass(`${className}__disable`);
  }

  disable() {
    const { modeBtn, className } = this;
    modeBtn.addClass(`${className}__disable`);
  }

  show() {
    this.modeBtn && this.modeBtn.show();
    this.updateType(true);
  }

  hide() {
    this.modeBtn && this.modeBtn.hide();
    this.updateType(false);
  }

  updateType(isShow) {
    const { options, type } = this;
    options.events.emit(INNER_TYPE.UPDATE_SETUP, {
      type,
      isShow
    });
  }

  destroy() {
  }

}

export default SetupToggle;

