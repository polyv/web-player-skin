export const getTemplate = (style) => {
  return `
    <span class="${style}__current"></span>
    <span class="${style}__seprator">/</span>
    <span class="${style}__duration"></span>
  `;
};
