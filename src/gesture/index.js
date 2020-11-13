import '@/gesture/index.scss';
import Panel from '@/panel';
import { getTemplate } from '@/gesture/template';
import { EventType, INNER_TYPE } from '../eventType';
import { limit } from '@/utils';

class GesturePanel extends Panel {
  constructor(options) {
    super();
    this.options = options;
    this.className = 'plv-player-gesture';
    this.listenGesture = false;
    this.swipeDir = -1;
    this.init();
    this.addEvent();
    this.bindEvent();
    this.downLeft = null; // 是否左半部分区域touchend，区分亮度/音频
  }

  init() {
    this.module = [
      {
        name: '$leftArea',
        eventName: 'left',
        callback: (type) => {
          // 触发亮度
          if (type < 2)
            this.options.events.emit(EventType[type ? 'LEFT_DOWN' : 'LEFT_UP']);
        }
      },
      {
        name: '$rightArea',
        eventName: 'right',
        callback: (type) => {
          // 触发音量
          if (type < 2)
            this.options.events.emit(EventType[type ? 'RIGHT_DOWN' : 'RIGHT_UP']);
        }
      }
    ];

    this.createDom();
  }

  createDom() {
    const { className } = this;
    super.createContainer();
    this.$container.addClass('clearfix');
    const tmp = getTemplate(this.className);
    this.$container.append(tmp);

    this.module.forEach(item => {
      const { name, eventName } = item;
      this[name] = this.$container.find(`.${className}__${eventName}`);
    });
  }

  addEvent() {
    const { options } = this;
    const eventsCb = {
      [INNER_TYPE.GESTURE_UPDATE]: isAdd => {
        this.addHandle(isAdd);
      }
    };

    Object.keys(eventsCb).forEach(item => {
      options.events.on(item, eventsCb[item]);
    });
  }

  bindEvent() {
    const { $container, options } = this;

    // 增加父容器左右滑动监听
    let finalTime = -1;
    // 计算左右滑动seek进度
    const countTime = (position) => {
      const precent = Math.abs(position) / options.container.width();
      let plusTime = parseInt(Math.abs(precent * options.duration));
      if (position < 0) plusTime = plusTime * -1;
      if (typeof options.currentTime === 'undefined') options.currentTime = 0;
      finalTime = options.currentTime + plusTime;
      finalTime = limit(finalTime, 0, options.duration);
      return finalTime;
    };

    this.addGesture($container, (type, position) => {
      switch (type) {
        // 下滑
        case -1:
          // console.log('//下滑', position, this.downLeft);
          if (!this.listenGesture) return;
          this.options.events.emit(EventType[this.downLeft ? 'LEFT_DOWN' : 'RIGHT_DOWN']);
          break;
        // 上滑
        case -2:
          // console.log('//上滑', position, this.downLeft);
          if (!this.listenGesture) return;
          this.options.events.emit(EventType[this.downLeft ? 'LEFT_UP' : 'RIGHT_UP']);
          break;
        // 左滑
        case 0:
          // console.log('//左滑', position);
          if (!this.listenGesture) return;
          this.swipeDir = type;
          options.events.emit(INNER_TYPE.SEEK_TIME_UPDATE, countTime(position));
          break;
        // 右滑
        case 1:
          // console.log('//右滑', position);
          if (!this.listenGesture) return;
          this.swipeDir = type;
          options.events.emit(INNER_TYPE.SEEK_TIME_UPDATE, countTime(position));
          break;
        // touchend for swipe
        case 3:
          if (!this.listenGesture) return;
          if (this.swipeDir > -1) {
            options.events.emit(EventType[this.swipeDir ? 'SWIPE_RIGHT' : 'SWIPE_LEFT']);
            this.swipeDir = -1;
          }

          if (finalTime > -1) {
            options.events.emit(EventType.SEEK_TO, finalTime);
            finalTime = -1;
          }
          break;
        // doubleTap
        case 4:
          options.events.emit(INNER_TYPE.PLAY_BTN_TOGGLE);
          this.showSkin(true);
          break;
        // tap
        case 5:
          this.showSkin(!options.barup);
          break;
        // longTap
        case 6:
          break;
        default:
          break;
      }
    });
  }

  addHandle(isAdd) {
    // 取消手势监听
    if (!isAdd) {
      if (!this.module) return;

      // this.module.forEach(item => {
      //   this.removeGesture(this[item.name]);
      // });

      // 父容器移除左右滑动监听
      this.listenGesture = false;
      return;
    }

    // 增加事件监听
    // this.module.forEach(item => {
    //   this.addGesture(this[item.name], true, item.callback);
    // });

    // 父容器增加左右滑动监听
    this.listenGesture = true;
  }

  /**
   * 手势监听
   * @param el
   * @param callback
   */
  addGesture(el, callback) {
    const { options } = this;
    let startX, startY, moveEndX, moveEndY, X, Y, position, hasType;
    let T, lastTap, isJustTouch = true;

    const excuteCb = (type) => {
      // type 手势类型 -2 上滑 -1 下滑 0 左滑  1 右滑  2 just touch 3 touchend 4 doubleTap 5 tap 6 longTap
      if (callback && typeof callback === 'function')
        callback(type, position);
    };

    const YPlus = 20;
    const YReduce = YPlus * -1;
    const XPlus = 50;
    const XReduce = XPlus * -1;

    const isXchange = () => {
      if (X > XPlus || X < XReduce) {
        position = X;
        hasType = 'X';
        isJustTouch = false;
      }

      if (X > XPlus) excuteCb(1);
      // 左滑
      else if (X < XReduce) excuteCb(0);
    };

    const isYchange = () => {
      if (Y > YPlus || Y < YReduce) {
        position = Y;
        hasType = 'Y';
        isJustTouch = false;
      }

      if (Y > YPlus) excuteCb(-1);
      // 上滑
      else if (Y < YReduce) excuteCb(-2);
    };

    const countDirect = () => {
      if (hasType) {
        hasType === 'X' ? isXchange() : isYchange();
        return;
      }
      isXchange();
      isYchange();
      // if (X > plus) {
      //   isJustTouch = false;
      //   excuteCb(1);
      // } else if (X < reduce) {
      //   isJustTouch = false;
      //   excuteCb(0);
      // } else {
      //   isJustTouch = true;
      //   excuteCb(2);
      // }
    };

    el.on('touchstart', (e) => {
      startX = e.changedTouches[0].pageX;
      startY = e.changedTouches[0].pageY;
      T = Date.now();
      hasType = '';
      isJustTouch = true;
      const halfWidth = options.container.width() / 2;
      this.downLeft = startX < halfWidth ? true : false;
    });

    el.on('touchmove', (e) => {
      moveEndX = e.changedTouches[0].pageX;
      moveEndY = e.changedTouches[0].pageY;
      X = moveEndX - startX;
      Y = moveEndY - startY;
      countDirect();
    });

    el.on('touchend', () => {
      if (isJustTouch)
        if (lastTap && Date.now() - lastTap <= 300)
          excuteCb(4);
        else if (Date.now() - T < 1000)
          excuteCb(5);
        else
          excuteCb(6);
      else
        excuteCb(3);

      lastTap = Date.now();
      isJustTouch = true;
    });
  }

  /**
   * 移除手势监听
   * @param el
   */
  removeGesture(el) {
    el.off('touchstart');
    el.off('touchmove');
  }

  showSkin(isShow) {
    const { options } = this;
    options.barup = isShow;
    options.events.emit(INNER_TYPE.SKIN_SHOW, isShow);
  }
}

export default GesturePanel;
