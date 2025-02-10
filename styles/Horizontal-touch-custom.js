class SwipeSheetScroll {
  constructor() {
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.scrollStartX = 0;
    this.threshold = 10; // Sensibilidade ao toque

    Hooks.on("renderActorSheet", (app, html) => {
      this.makeSheetScrollable(html);
      this.addScrollListeners(html);
    });
  }

  makeSheetScrollable(html) {
    let sheet = html[0].querySelector(".window-content");
    if (!sheet) return;

    sheet.style.overflowX = "auto";
    sheet.style.overflowY = "auto";
    sheet.style.whiteSpace = "normal"; // Permite quebra de linha
    sheet.style.maxWidth = "none"; // Garante que a ficha não fique reduzida
  }

  addScrollListeners(html) {
    let sheet = html[0].querySelector(".window-content");
    if (!sheet) return;

    sheet.addEventListener("touchstart", (e) => this.onTouchStart(e, sheet), { passive: true });
    sheet.addEventListener("touchmove", (e) => this.onTouchMove(e, sheet), { passive: true });
  }

  onTouchStart(e, sheet) {
    this.touchStartX = e.touches[0].clientX;
    this.scrollStartX = sheet.scrollLeft;
  }

  onTouchMove(e, sheet) {
    let touchMoveX = e.touches[0].clientX;
    let moveDistance = this.touchStartX - touchMoveX;

    if (Math.abs(moveDistance) > this.threshold) {
      sheet.scrollLeft = this.scrollStartX + moveDistance;
      e.preventDefault();
    }
  }
}

Hooks.once("ready", () => {
  new SwipeSheetScroll();
});