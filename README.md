# POLYV WEB移动端播放器控制栏

### Overview
纯js支持的移动端播放控制栏皮肤，包含播放、暂停、播放进度栏、时间显示、全屏、倍速、清晰度等按钮或选择面板。依赖额外的video组件属性更新状态，并且会回调事件供操作video组件。

### Installation
```javascript
npm i @polyv/web-player-skin -S
```

### How to use

```
import PolyvSkin from '@polyv/web-player-skin';

const skin = new PolyvSkin({
    el: document.querySelector('.control'), // 控制栏父容器
    level: 0,
    levels: 3
});

```

### API

#### Params
##### level

默认清晰度

参数类型：Number

取值范围：0 ~ 3

0 自动 1流畅 2高清 3超清

##### levels

可选清晰度长度，默认会有自动

参数类型：Number

取值范围：1~3

3表示包含自动、流畅、高清、超清3个清晰度可选

##### isLive

直播模式

参数类型：Boolean

直播模式下，不显示进度条和时间显示块

##### stayFullState

保持全屏按钮状态

参数类型：Boolean

保持仅显示全屏按钮，点击按钮后不显示普屏按钮，事件触发正常

##### showRate

显示倍速按钮

参数类型：Boolean

默认显示，设置为fals则不显示


##### showHd

显示码率按钮

参数类型：Boolean

默认显示，设置为fals则不显示


##### autoHd

是否显示自动码率

参数类型：Boolean

默认显示，设置为fals则不显示


##### showAudioBtn

显示音频模式按钮

参数类型：Boolean

默认不显示，设置为true则显示


##### showDanmu

显示弹幕按钮

参数类型：Boolean

默认不显示，设置为true则显示


##### danmuInitState

弹幕按钮是否为选中状态

参数类型：Boolean

默认选中，设置为fals则为非选中状态


#### Function

- durationUpdate
```javascript
/**
* 更新总时长显示
* @param duration Number
*/
durationUpdate(duration) // skin.durationUpdate(1880);
```

- timeUpdate
```javascript
/**
* 更新当前播放时间点
* @param time Number
*/
timeUpdate(time) // skin.timeUpdate(10);
```

- changePlayState
```javascript
/**
* 更改播放按钮状态
* @param isToPlay Boolean
*/
changePlayState(isToPlay) // skin.changePlayState(true); // 显示为播放中状态
```

- changeRefreshState
```javascript
/**
* 更改刷新按钮状态
* @param isShow Boolean
*/
changeRefreshState(isShow) // skin.changeRefreshState(true); // 显示刷新按钮
```

- changeSettingState
```javascript
/**
* 更改刷新按钮状态
* @param isShow Boolean
*/
changeSettingState(isShow) // skin.changeSettingState(true); // 显示设置按钮
```

- changeLevel
```javascript
 /**
 * 清晰度变化
 * @param index Number
 */
 changeLevel(index) // skin.changeLevel(2); // 高亮超清选项
```

- showLight
```javascript
 /**
 * 亮度变化
 * @param num Number 范围0~100
 */
 showLight(num) // skin.showLight(80); // 弹窗显示亮度为80%
```

- showLight
```javascript
 /**
 * 音量变化
 * @param num Number 范围0~1
 */
 showVolume(num) // skin.showVolume(0.5); // 音量条显示为50%
```

- showSeekTime
```javascript
/**
* 快进退时间变化
* @param time Number
*/
showSeekTime(time) // skin.showSeekTime(50); // 弹窗显示拖拽进度为50秒
```

- showSafeArea
```javascript
/**
* 显示安全区域
* @param isShow Boolean
*/
showSafeArea(isShow) // skin.showSafeArea(true); // 显示安全区域34px
```

- addGesture
```javascript
/**
* 手势监听
* @param isAdd Boolean
*/
addGesture(isAdd) // skin.addGesture(true); // 设置true才会触发LEFT_UP等手势监听事件
```


#### Event

- PLAY_BTN_CLICKED

```javascript
// 播放|暂停按钮是否被点击
skin.on('PLAY_BTN_CLICKED', (isToPlay) => {
	isToPlay ? video.play() : video.pause();
});	
```



- FULL_BTN_CLICKED

```javascript
// 进入全屏|退出全屏按钮是否被点击
skin.on('FULL_BTN_CLICKED', (isToFull) => {
	console.log('>>> 是否点击全屏:', isToFull);
});	
```

- PROGRESS_DRAG_END

```javascript
// 拖拽进度条进行跳跃播放
skin.on('PROGRESS_DRAG_END', (toSeekTime) => {
   video.currentTime = toSeekTime;
});
```

- RATE_CHANGED

```javascript
// 倍速按钮点击
skin.on('RATE_CHANGED', (rate) => {
	console.log('>>> 倍速变化:', rate);
	video.playbackRate = rate;
});
```

- HD_CHANGED

```javascript
// 清晰度按钮点击
skin.on('HD_CHANGED', (level) => {
	console.log('>>> 清晰度变化：', level);
});
```

- LEFT_UP

```javascript
// 手势操作，左半部分区域上滑
skin.on('LEFT_UP', () => {
	console.log('>>>亮度调亮');
});
```

- LEFT_DOWN

```javascript
// 手势操作，左半部分区域下滑
skin.on('LEFT_DOWN', () => {
	console.log('>>>亮度调暗');
});
```

- RIGHT_UP

```javascript
// 手势操作，右半部分区域上滑
skin.on('RIGHT_UP', () => {
	console.log('>>>音量调高');
});
```

- RIGHT_DOWN

```javascript
// 手势操作，右半部分区域下滑
skin.on('RIGHT_DOWN', () => {
	console.log('>>>音量调低');
});
```

- SEEK_TO

```javascript
// 手势操作，进行播放进度跳跃
skin.on('SEEK_TO', () => {
	console.log('>>>拖拽播放:', time);
  video.currentTime = time;
});
```

- SCREEN_SHOT

```javascript
// 点击截图按钮
skin.on('SCREEN_SHOT', () => {
	console.log('>>> 点击截图按钮');
});
```

- DANMU_BTN_CLICKED

```javascript
// 点击弹幕按钮
skin.on('DANMU_BTN_CLICKED', (isShow) => {
	console.log('>>> 弹幕按钮是否选中状态:', isShow);
});
```

### Features
- ie >= 9

