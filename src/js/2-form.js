document.addEventListener('DOMContentLoaded', () => {
  const key = 'feedback-form-state';
  const form = document.querySelector('.feedback-form');

  // Оголошення formData локально, щоб уникнути глобальних змінних
  const formData = {
    email: '',
    message: '',
  };

  // ===== Отримання даних з localStorage і заповнення форми =====
  const lsData = getFromLS(key);
  if (lsData) {
    formData.email = lsData.email || '';
    formData.message = lsData.message || '';
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }

  // ===== Обробка введення в поля форми =====
  form.addEventListener('input', evt => {
    formData.email = form.elements.email.value;
    formData.message = form.elements.message.value;
    saveToLS(key, formData); // Зберігаємо оновлені дані в localStorage
  });

  // ===== Обробка відправки форми =====
  form.addEventListener('submit', evt => {
    evt.preventDefault();

    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    if (!email || !message) {
      alert('Fill please all fields');
      return;
    }

    // Оновлюємо значення formData, не перевизначаючи обʼєкт
    formData.email = email;
    formData.message = message;

    console.log(formData); // Виводимо в консоль зібрані дані

    localStorage.removeItem(key); // Очищаємо localStorage
    form.reset(); // Очищаємо форму

    // Обнуляємо formData вручну
    formData.email = '';
    formData.message = '';
  });

  // ===== Зберігання у localStorage =====
  function saveToLS(key, value) {
    try {
      const jsonData = JSON.stringify(value);
      localStorage.setItem(key, jsonData);
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }
  }

  // ===== Отримання з localStorage =====
  function getFromLS(key, defaultValue = null) {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) return defaultValue;
    try {
      const data = JSON.parse(jsonData);
      return data;
    } catch (err) {
      console.error('Error parsing from localStorage:', err);
      return defaultValue;
    }
  }
});
