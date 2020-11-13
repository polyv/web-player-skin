/**
 * 播放器对外触发事件
 * @type {{FULL_BTN_CLICKED: string, INIT: string, PLAY_BTN_CLICKED: string, PROGRESS_DRAG_END: string, SCREEN_SHOT: string, HD_CHANGED: string, RATE_CHANGED: string}}
 */
const EventType = {
  // 控制栏初始化
  INIT: 'INIT',
  // 控制栏显示/隐藏
  SHOW_BAR: 'SHOW_BAR',
  // 播放|暂停 按钮点击
  PLAY_BTN_CLICKED: 'PLAY_BTN_CLICKED',
  // 进入全屏|退出全屏 按钮点击
  FULL_BTN_CLICKED: 'FULL_BTN_CLICKED',
  // 清晰度
  HD_CHANGED: 'HD_CHANGED',
  // 线路
  LINE_CHANGED: 'LINE_CHANGED',
  // 倍速
  RATE_CHANGED: 'RATE_CHANGED',
  // 进度条拖拽Seek
  PROGRESS_DRAG_END: 'PROGRESS_DRAG_END',
  // 截图 按钮点击
  SCREEN_SHOT: 'SCREEN_SHOT',
  // 跳跃播放
  SEEK_TO: 'SEEK_TO',
  // 手势监听
  LEFT_UP: 'LEFT_UP',
  LEFT_DOWN: 'LEFT_DOWN',
  RIGHT_UP: 'RIGHT_UP',
  RIGHT_DOWN: 'RIGHT_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
  // 弹幕 按钮点击
  DANMU_BTN_CLICKED: 'DANMU_BTN_CLICKED',
  // 音频 按钮点击
  AUDIO_BTN_CLICKED: 'AUDIO_BTN_CLICKED'
};

// 播放器内部处理事件
const INNER_TYPE = {
  // 播放按钮状态更新
  PLAY_BTN_UPDATE: 'PLAY_BTN_UPDATE',
  // 播放按钮状态相对更新
  PLAY_BTN_TOGGLE: 'PLAY_BTN_TOGGLE',
  // 刷新按钮状态相对更新
  REFRESH_BTN_UPDATE: 'REFRESH_BTN_UPDATE',
  // 刷新按钮状态相对更新
  SETTING_BTN_UPDATE: 'SETTING_BTN_UPDATE',
  // 总时长显示更新
  DURATION_UPDATE: 'DURATION_UPDATE',
  // 当前播放时间显示更新
  TIME_UPDATE: 'TIME_UPDATE',
  // 倍速更新
  RATE_UPDATE: 'RATE_UPDATE',
  // 清晰度更新
  HD_UPDATE: 'HD_UPDATE',
  // 线路更新
  LINE_UPDATE: 'LINE_UPDATE',
  // 设置面板显示/隐藏
  SHOW_SETUP: 'SHOW_SETUP',
  // 设置面板 -> 清晰度 显示/隐藏
  SHOW_HD: 'SHOW_HD',
  // 设置面板 -> 线路 显示/隐藏
  SHOW_LINE: 'SHOW_LINE',
  // 显示亮度
  LIGHT_UPDATE: 'LIGHT_UPDATE',
  // 显示音量
  VOLUME_UPDATE: 'VOLUME_UPDATE',
  // 手势监听更新
  GESTURE_UPDATE: 'GESTURE_UPDATE',
  // 皮肤显示/隐藏
  SKIN_SHOW: 'SKIN_SHOW',
  // PLAY
  FIRST_PLAY: 'FIRST_PLAY',
  // 快进|快退
  SEEK_TIME_UPDATE: 'SEEK_TIME_UPDATE',
  // 更新设置面板选项个数
  UPDATE_SETUP: 'UPDATE_SETUP'
};

const SETUP_TYPE = {
  TOP_AUDIO: 'TOP_AUDIO',
  TOP_DANMU: 'TOP_DANMU',
  BOTTOM_RATE: 'BOTTOM_RATE',
  BOTTOM_HD: 'BOTTOM_HD',
  BOTTOM_LINE: 'BOTTOM_LINE'
};

export { EventType, INNER_TYPE, SETUP_TYPE };
