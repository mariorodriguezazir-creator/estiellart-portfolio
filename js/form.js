document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');

  if (form === null) {
    return;
  }

  const submitButton = form.querySelector('.form__submit');

  if (submitButton === null) {
    return;
  }

  const initialButtonText = submitButton.textContent ? submitButton.textContent.trim() : 'Send the Message';

  const validators = {
    name: (value) => {
      const trimmedValue = value.trim();

      if (trimmedValue.length === 0) {
        return 'Please enter your name';
      }

      if (trimmedValue.length < 2) {
        return 'Name must be at least 2 characters';
      }

      return '';
    },
    email: (value) => {
      const trimmedValue = value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (trimmedValue.length === 0) {
        return 'Please enter your email';
      }

      if (!emailPattern.test(trimmedValue)) {
        return 'Please enter a valid email';
      }

      return '';
    },
    subject: (value) => {
      const trimmedValue = value.trim();

      if (trimmedValue.length === 0) {
        return 'Please select a subject';
      }

      return '';
    },
    message: (value) => {
      const trimmedValue = value.trim();

      if (trimmedValue.length === 0) {
        return 'Please enter your message';
      }

      if (trimmedValue.length < 10) {
        return 'Message must be at least 10 characters';
      }

      return '';
    },
  };

  const showError = (field, message) => {
    const formGroup = field.closest('.form__group');

    if (formGroup === null) {
      return;
    }

    const errorElement = formGroup.querySelector('.form__error');

    if (errorElement === null) {
      return;
    }

    if (message.length > 0) {
      field.classList.add('input--error');
      errorElement.textContent = message;
      errorElement.classList.add('form__error--visible');
      return;
    }

    field.classList.remove('input--error');
    errorElement.textContent = '';
    errorElement.classList.remove('form__error--visible');
  };

  const validateField = (field) => {
    const fieldName = field.name;
    const validator = validators[fieldName];

    if (validator === undefined) {
      return true;
    }

    const message = validator(field.value);
    showError(field, message);

    return message.length === 0;
  };

  const formFields = form.querySelectorAll('input, select, textarea');

  formFields.forEach((field) => {
    field.addEventListener('blur', () => {
      validateField(field);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isFormValid = true;

    formFields.forEach((field) => {
      const isValid = validateField(field);

      if (isValid === false) {
        isFormValid = false;
      }
    });

    if (isFormValid === false) {
      return;
    }

    submitButton.textContent = 'Message Sent!';
    submitButton.classList.add('btn--success');
    submitButton.disabled = true;

    window.setTimeout(() => {
      form.reset();

      formFields.forEach((field) => {
        showError(field, '');
      });

      submitButton.textContent = initialButtonText;
      submitButton.classList.remove('btn--success');
      submitButton.disabled = false;
    }, 3000);
  });
});
