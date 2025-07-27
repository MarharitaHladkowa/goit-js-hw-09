const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.login-form');
const Key = 'feedback-form-state';

// ===== Отслеживаем изменения в полях формы =====
form.addEventListener('input', evt => {
  const name = evt.target.name;
});

// ===== Обработка отправки формы =====
form.addEventListener('submit', evt => {
  evt.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('📬 Form submitted with data:', formData);

  localStorage.removeItem(Key);
  formData.email = '';
  formData.message = '';
  form.reset();
});
