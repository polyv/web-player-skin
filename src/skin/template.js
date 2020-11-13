export const getTemplate = (style, isLive) => {
  const liveClassName = `${style}__live`;

  return `
    <div class="${style}__bar ${ isLive ? liveClassName : ''}">
        <div class="${style}__play ${style}__btn"></div>
        <div class="${style}__refresh ${style}__btn"></div>
        <div class="${style}__time"">
            <span class="${style}__time__current">00:00</span>
            <span class="${style}__time__separate">/</span>
            <span class="${style}__time__duration">00:00</span>
        </div>
        <div class="${style}__progress">
            <div class="${style}__progress__bg ${style}__progress__line"></div>
            <div class="${style}__progress__load ${style}__progress__line"></div>
            <div class="${style}__progress__play ${style}__progress__line"></div>
            <div class="${style}__progress__dot"></div>
            <div class="${style}__progress__mask ${style}__progress__line"></div>
        </div>
        <div class="${style}__setting ${style}__btn"></div>
        <div class="${style}__fullscreen ${style}__btn"></div>
    </div>
  `;
};
