import iziToast from 'izitoast';

import iconSucceed from '../img/succeed-icon.svg';
import iconError from '../img/error-icon.svg';
import iconCaution from '../img/caution-icon.svg';

//---pressed on input delay
const input = document.querySelector('.user-input');

input.addEventListener('focus', () => {
  input.classList.add('pressed');
});

input.addEventListener('blur', () => {
  input.classList.remove('pressed');
});

//---Form submit
document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  //---value number
  const delay = Number(event.currentTarget.elements.delay.value);
  const state = event.currentTarget.elements.state.value;

  if (!state || !delay) {
    iziToast.warning({
      title: 'Caution',
      titleColor: '#fff',
      message: 'You forgot important data',
      iconUrl: iconCaution,
      position: 'topRight',
      close: false,
      backgroundColor: '#ffa000',
      messageColor: '#fff',
      timeout: 3000,
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        titleColor: '#fff',
        message: `Fulfilled promise in ${delay}ms`,
        iconUrl: iconSucceed,
        position: 'topRight',
        icon: '',
        close: false,
        messageColor: '#fff',
        backgroundColor: '#59a10d',
      });
    })
    .catch(err => {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        message: `Rejected promise in ${err}ms`,
        iconUrl: iconError,
        position: 'topRight',
        icon: '',
        close: false,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
      });
    });
});
