import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let userSelectedDate = null;
let timerId = null;

refs.startBtn.disabled = true;

//Вибір дати
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });

      refs.startBtn.disabled = true;
      userSelectedDate = null; // Скидаємо збережену дату
    } else {
      userSelectedDate = selectedDate;
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.dateInput, options);

//Btn Start
refs.startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  refs.startBtn.disabled = true;
  refs.dateInput.disabled = true;

  //Відлік часу
  timerId = setInterval(() => {
    const ms = userSelectedDate - Date.now();

    if (ms <= 0) {
      clearInterval(timerId);
      refs.dateInput.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(ms);

    refs.days.textContent = addZero(days);
    refs.hours.textContent = addZero(hours);
    refs.minutes.textContent = addZero(minutes);
    refs.seconds.textContent = addZero(seconds);
  }, 1000);
});

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

//Метод для двозначного формату
function addZero(value) {
  return String(value).padStart(2, '0');
}
