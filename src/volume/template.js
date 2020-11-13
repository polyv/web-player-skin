export const getTemplate = (style) => {
  return `
    <div class="${style}__img"></div>
    <div class="${style}__control">
        <div class="${style}__bg"></div>
        <div class="${style}__current"></div>
    </div>
  `;
};
