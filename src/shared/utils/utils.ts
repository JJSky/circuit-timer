// Add or remove the "dark" class on the document body
export const toggleDarkTheme = (shouldAdd: boolean) => {
  document.body.classList.toggle('dark', shouldAdd);
};