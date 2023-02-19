import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const timerRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const timerStartBtn = document.querySelector('[data-start]');
const calendarInput = document.querySelector('#datetime-picker');
let timerId = null;
timerStartBtn.disabled = true;
// Налаштування бібліотеки
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      timerStartBtn.disabled = false;
      timerStartBtn.addEventListener('click', handleTimerClick);
    }
  },
};

flatpickr(calendarInput, options);
const handleTimerClick = () => {
  timerId = setInterval(() => {
    timerStartBtn.disabled = true;
    const selectedDate = new Date(calendarInput.value).getTime();
    const currentTime = new Date().getTime();
    const counterTime = selectedDate - currentTime;
    const counterTimeMs = convertMs(counterTime);
    for (elem in counterTimeMs) {
      timerRefs[elem].textContent =
        counterTimeMs[elem].toString().padStart(2, '0') || '';
    }
    if (counterTime < 1000) {
      clearInterval(timerId);
      timerStartBtn.disabled = false;
    }
  }, 1000);
};

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
