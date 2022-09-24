import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('input'),
  startBtn: document.querySelector('button'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.startBtn.disabled = true;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateIsWrong = options.defaultDate > selectedDates[0];
    dateIsWrong
      ? Notiflix.Notify.failure('Please choose a date in the future')
      : (refs.startBtn.disabled = false);
  },
};
refs.startBtn.addEventListener('click', timerStart);
const fp = flatpickr(refs.input, options);

function timerStart() {
  clearInterval(intervalId);
  const startTime = fp.selectedDates[0].getTime();

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    const timeComponents = convertMs(deltaTime);
    deltaTime > 0 ? clockFace(timeComponents) : clearInterval(intervalId);
  }, 1000);
}

function pad(time) {
  return time.toString().padStart(2, '0');
}

function clockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
