let formData = {
  email: '',
  message: '',
};
const key = 'feedback-form-state';
const form = document.querySelector('.login-form');

// ===== Отслеживаем изменения в полях формы =====
form.addEventListener('input', evt => {
  const email = evt.currentTarget.elements.email.value;
  const message = evt.currentTarget.elements.message.value;
  formData.email = email;
  formData.message = message;
  saveToLS(key, formData); // Сохраняем данные в локальное хранилище
});
document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS('formData');
  try {
    formData = lsData;
    form.elements.email.value = lsData.email;
    form.elements.message.value = lsData.message;
  } catch {
    console.log('Fill please all fields');
  }
});

// ===== Сохраняем данные в локальное хранилище =====
function saveToLS(key, value) {
  const jsonData = JSON.stringify(value); // Преобразуем значение в JSON-строку
  localStorage.setItem(key, jsonData); // Сохраняем по ключу в localStorage
}
function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key); // Получаем строку из localStorage

  try {
    const data = JSON.parse(jsonData); // Преобразуем обратно в объект
    return data;
  } catch {
    console.log('ERROR PARSING');
    return defaultValue || jsonData; // Возвращаем значение по умолчанию или «как есть»
  }
}
