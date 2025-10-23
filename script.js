let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  moveX = 0;
  moveY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {

    /* ✅ PC / Laptop Mouse Move */
    document.addEventListener('mousemove', (e) => {
      if (!this.rotating) {
        this.moveX = e.clientX;
        this.moveY = e.clientY;

        this.velX = this.moveX - this.prevX;
        this.velY = this.moveY - this.prevY;
      }

      if (this.holdingPaper) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;

        this.prevX = this.moveX;
        this.prevY = this.moveY;

        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
      }
    });

    /* ✅ PC / Laptop Click */
    paper.addEventListener('mousedown', (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    /* ✅ TOUCH SUPPORT (Mobile.js merged here) */
    paper.addEventListener('touchstart', (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.prevX = e.touches[0].clientX;
      this.prevY = e.touches[0].clientY;
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.moveX = e.touches[0].clientX;
      this.moveY = e.touches[0].clientY;

      this.velX = this.moveX - this.prevX;
      this.velY = this.moveY - this.prevY;

      if (this.holdingPaper) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;

        this.prevX = this.moveX;
        this.prevY = this.moveY;

        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
