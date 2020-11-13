import '@/assets/index.scss';
import EventEmitter from 'events';
import { EventType, INNER_TYPE } from '@/eventType';
import $ from 'dom7';
import Skin from '@/skin';
import Setup from '@/setup';
import ScreenShot from '@/screenShot';
import Light from '@/light';
import Volume from '@/volume';
import TimeSeek from '@/timeSeek';
import Gesture from '@/gesture';
import language from '@/lang/';
import { isIphoneX, isIos } from '@/utils';

class PolyvSkin extends EventEmitter {
  constructor(options) {
    super();
    this.options = Object.assign({}, {
      showScreenShot: true,
      isLive: false,
      lang: 'zh_CN'
    }, options);
    this.components = [];
    this.init();
    this.addEvent();
  }

  init() {
    const { showScreenShot, lang } = this.options;
    this.wrap = $('<div class="plv-skin"></div>');
    if (lang === 'en') this.wrap.addClass('plv-en');
    this.options.container = this.wrap;
    this.options.el.appendChild(this.wrap[0]);
    this.options.events = new EventEmitter();
    this.options.language = language[lang];
    this.components['light'] = new Light(this.options);
    this.components['volume'] = new Volume(this.options);
    this.components['timeSeek'] = new TimeSeek(this.options);
    this.components['gesture'] = new Gesture(this.options);
    this.components['skin'] = new Skin(this.options);
    this.components['setup'] = new Setup(this.options);
    if (showScreenShot) this.components['screenshot'] = new ScreenShot(this.options);
    this.emit(EventType.INIT);
  }

  addEvent() {
    Object.keys(EventType).forEach(item => {
      this.options.events.on(item, (data) => {
        this.emit(item, data);
      });
    });
  }

  /**
   * 总时长变化
   * @param duration
   */
  durationUpdate(duration) {
    this.options.events.emit(INNER_TYPE.DURATION_UPDATE, duration);
  }

  /**
   * 当前播放时长变化
   * @param time
   */
  timeUpdate(time) {
    this.options.events.emit(INNER_TYPE.TIME_UPDATE, time);
  }

  /**
   * 播放按钮状态变化
   * @param isToPlay
   */
  changePlayState(isToPlay) {
    this.options.events.emit(INNER_TYPE.PLAY_BTN_UPDATE, isToPlay);
  }

  /**
   * 刷新按钮状态变化
   * @param isShow
   */
  changeRefreshState(isShow) {
    this.options.events.emit(INNER_TYPE.REFRESH_BTN_UPDATE, isShow);
  }

  /**
   * 设置按钮状态变化
   * @param isShow
   */
  changeSettingState(isShow) {
    this.options.events.emit(INNER_TYPE.SETTING_BTN_UPDATE, isShow);
  }

  /**
   * 清晰度变化
   * @param index
   */
  changeLevel(index) {
    this.options.events.emit(INNER_TYPE.HD_UPDATE, index);
  }

  /**
   * 亮度变化
   * @param num
   */
  showLight(num) {
    this.options.events.emit(INNER_TYPE.LIGHT_UPDATE, num);
  }

  /**
   * 音量变化
   * @param num
   */
  showVolume(num) {
    this.options.events.emit(INNER_TYPE.VOLUME_UPDATE, num);
  }

  /**
   * 快进退时间变化
   * @param time
   */
  showSeekTime(time) {
    this.options.events.emit(INNER_TYPE.SEEK_TIME_UPDATE, time);
  }

  /**
   * 设置面板清晰度显示隐藏
   * @param isShow Boolean
   */
  showHd(isShow) {
    this.options.events.emit(INNER_TYPE.SHOW_HD, isShow);
  }

  /**
   * 线路变化
   * @param index
   */
  changeLine(index) {
    this.options.events.emit(INNER_TYPE.LINE_UPDATE, index);
  }

  /**
   * 设置面板线路显示/隐藏
   * @param isShow
   */
  showLine(isShow) {
    this.options.events.emit(INNER_TYPE.SHOW_LINE, isShow);
  }

  /**
   * 显示安全区域
   */
  showSafeArea(isShow) {
    const { wrap } = this;
    const safeAreaClass = 'plv-skin-safearea';
    if (!isShow) {
      wrap.removeClass(safeAreaClass);
      return;
    }
    if (isIos && !isIphoneX()) return;
    wrap.addClass(safeAreaClass);
  }

  /**
   * 手势监听
   */
  addGesture(isAdd) {
    this.options.events.emit(INNER_TYPE.GESTURE_UPDATE, isAdd);
  }
}

export default PolyvSkin;
