import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const delay = document.querySelector('[name="delay"]');
const delayStep = document.querySelector('[name="step"]');
const promisesAmount = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const handlePromisesCreate = e => {
  e.preventDefault();
  let firstDelay = parseInt(delay.value);
  const step = parseInt(delayStep.value);
  const amount = parseInt(promisesAmount.value);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
    firstDelay += step;
  }
};
form.addEventListener('submit', handlePromisesCreate);
