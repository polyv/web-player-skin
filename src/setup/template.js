export const getTemplate = (style) => {
  const template = `
    <div class="${style}__top"></div>
    <div class="${style}__bottom"></div>
  `;

  return template;
};

