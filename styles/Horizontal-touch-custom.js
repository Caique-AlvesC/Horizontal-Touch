class SwipeSheetScroll {
    constructor() {
      this.touchStartX = 0;
      this.touchEndX = 0;
      this.scrollStartX = 0;
      this.threshold = 10; // Sensibilidade ao toque
  
      Hooks.on("renderActorSheet", (app, html) => {
        this.addScrollListeners(html);
      });
    }
  
    addScrollListeners(html) {
      let sheet = html[0].querySelector(".sheet-container"); // Seleciona a área da ficha
      if (!sheet) return;
  
      sheet.style.overflowX = "auto"; // Garante que a rolagem horizontal está ativada
      sheet.style.whiteSpace = "nowrap"; // Evita que elementos fiquem cortados
  
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
        sheet.scrollLeft = this.scrollStartX + moveDistance; // Move horizontalmente
        e.preventDefault(); // Impede o comportamento padrão de rolagem vertical
      }
    }
  }
  
  Hooks.once("ready", () => {
    new SwipeSheetScroll();
  });
  