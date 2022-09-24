class ColorSwitcher {
  constructor(width, height, className, delay) {
    this.width = width;
    this.height = height;
    this.className = className;
    this.intervalId = null;
    this.delay = delay;

    this.bodyEl = document.body;
    this.markup = ` <div class="${this.className}">
    <div style="width: ${this.width}px; height: ${this.height}px"></div>
    <button type="button" data-start>Start</button>
  <button type="button" data-stop>Stop</button>
  </div>`;
    this.bodyEl.insertAdjacentHTML('beforeend', this.markup);

    this.divWrapper = document.querySelector(`.${this.className}`);
    this.startBtn = this.divWrapper.querySelector('[data-start]');
    this.stopBtn = this.divWrapper.querySelector('[data-stop]');
    this.divColor = this.divWrapper.querySelector('div');

    this.addListeners();
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  addListeners() {
    this.startBtn.addEventListener('click', this.onBodyColorChange.bind(this));
    this.stopBtn.addEventListener('click', this.onBodyColorStop.bind(this));
    this.stopBtn.disabled = true;
  }

  onBodyColorChange() {
    this.startBtn.disabled = true;
    this.stopBtn.disabled = false;
    this.intervalId = setInterval(() => {
      this.divColor.style.backgroundColor = this.getRandomHexColor();
    }, this.delay);
  }

  onBodyColorStop() {
    this.stopBtn.disabled = true;
    this.startBtn.disabled = false;
    clearInterval(this.intervalId);
  }
}

const colorSwitcher = new ColorSwitcher(300, 100, 'wrapper', 1000);
