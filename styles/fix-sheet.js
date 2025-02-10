Hooks.on("renderActorSheet", (app, html) => {
  let sheet = html[0];
  if (!sheet) return;

  sheet.style.width = "95vw";
  sheet.style.height = "90vh";
  sheet.style.minWidth = "320px";
  sheet.style.minHeight = "400px";
  sheet.style.maxWidth = "100vw";
  sheet.style.maxHeight = "100vh";
  sheet.style.overflow = "auto";
});