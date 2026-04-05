document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');

  if (form === null) {
    return;
  }

  const submitButton = form.querySelector('.form__submit');

  if (submitButton === null) {
    return;
  }

  const getStoredLang = () => {
    try {
      return localStorage.getItem('estiellart-lang');
    } catch (error) {
      return null;
    }
  };

  const getCurrentLang = () => {
    const storedLang = getStoredLang();

    if (storedLang === 'en' || storedLang === 'es') {
      return storedLang;
    }

    return document.documentElement.lang === 'en' ? 'en' : 'es';
  };

  const messages = {
    es: {
      requiredName: 'Por favor ingresá tu nombre',
      shortName: 'El nombre debe tener al menos 2 caracteres',
      requiredEmail: 'Por favor ingresá tu correo electrónico',
      invalidEmail: 'Ingresá un correo electrónico válido',
      requiredSubject: 'Por favor seleccioná un tipo de comisión',
      requiredMessage: 'Por favor escribí tu mensaje',
      shortMessage: 'El mensaje debe tener al menos 10 caracteres',
      submitting: 'Enviando...',
      success: '¡Mensaje enviado!',
      error: 'Error. Intentá de nuevo.',
      idle: '✦ Enviar solicitud',
    },
    en: {
      requiredName: 'Please enter your name',
      shortName: 'Name must be at least 2 characters',
      requiredEmail: 'Please enter your email',
      invalidEmail: 'Please enter a valid email',
      requiredSubject: 'Please select a commission type',
      requiredMessage: 'Please enter your message',
      shortMessage: 'Message must be at least 10 characters',
      submitting: 'Sending...',
      success: 'Message sent!',
      error: 'Error. Please try again.',
      idle: '✦ Send request',
    },
  };

  const getLocaleMessages = () => messages[getCurrentLang()];

  const validators = {
    name: (value, locale) => {
      const trimmedValue = value.trim();

      if (trimmedValue.length === 0) {
        return locale.requiredName;
      }

      if (trimmedValue.length < 2) {
        return locale.shortName;
      }

      return '';
    },
    email: (value, locale) => {
      const trimmedValue = value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (trimmedValue.length === 0) {
        return locale.requiredEmail;
      }

      if (!emailPattern.test(trimmedValue)) {
        return locale.invalidEmail;
      }

      return '';
    },
    subject: (value, locale) => {
      const trimmedValue = value.trim();

      if (trimmedValue.length === 0) {
        return locale.requiredSubject;
      }

      return '';
    },
    message: (value, locale) => {
      const trimmedValue = value.trim();

      if (trimmedValue.length === 0) {
        return locale.requiredMessage;
      }

      if (trimmedValue.length < 10) {
        return locale.shortMessage;
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
      field.setAttribute('aria-invalid', 'true');
      if (errorElement.id) {
        field.setAttribute('aria-describedby', errorElement.id);
      }
      errorElement.textContent = message;
      errorElement.classList.add('form__error--visible');
      return;
    }

    field.classList.remove('input--error');
    field.setAttribute('aria-invalid', 'false');
    if (errorElement.id) {
      field.removeAttribute('aria-describedby');
    }
    errorElement.textContent = '';
    errorElement.classList.remove('form__error--visible');
  };

  const validateField = (field) => {
    const fieldName = field.name;
    const validator = validators[fieldName];

    if (validator === undefined) {
      return true;
    }

    const message = validator(field.value, getLocaleMessages());
    showError(field, message);

    return message.length === 0;
  };

  const formFields = form.querySelectorAll('input, select, textarea');

  formFields.forEach((field) => {
    field.setAttribute('aria-invalid', 'false');
  });

  const syncIdleButtonText = () => {
    if (submitButton.disabled || submitButton.classList.contains('btn--success')) {
      return;
    }

    submitButton.textContent = getLocaleMessages().idle;
  };

  formFields.forEach((field) => {
    field.addEventListener('blur', () => {
      validateField(field);
    });
  });

  document.addEventListener('languagechange', () => {
    syncIdleButtonText();
  });

  syncIdleButtonText();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const spamField = form.querySelector('input[name="_honey"]');
    if (spamField instanceof HTMLInputElement && spamField.value.trim().length > 0) {
      form.reset();
      return;
    }

    let isFormValid = true;
    let firstInvalidField = null;

    formFields.forEach((field) => {
      const isValid = validateField(field);

      if (isValid === false) {
        isFormValid = false;
        if (firstInvalidField === null) {
          firstInvalidField = field;
        }
      }
    });

    if (isFormValid === false) {
      if (firstInvalidField instanceof HTMLElement) {
        firstInvalidField.focus();
      }
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const resetForm = () => {
      form.reset();
      formFields.forEach((field) => {
        showError(field, '');
      });
      submitButton.textContent = getLocaleMessages().idle;
      submitButton.classList.remove('btn--success');
      submitButton.disabled = false;
    };

    submitButton.textContent = getLocaleMessages().submitting;
    submitButton.disabled = true;

    fetch("https://formsubmit.co/ajax/Estiellart@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `Nueva Comisión: ${data.subject} de ${data.name}`,
        _honey: data._honey || '',
        Nombre: data.name,
        Email: data.email,
        Tipo: data.subject,
        Mensaje: data.message
      })
    })
    .then(response => {
      if (!response.ok) throw new Error('Error en la red');
      return response.json();
    })
    .then(() => {
      submitButton.textContent = getLocaleMessages().success;
      submitButton.classList.add('btn--success');
      window.setTimeout(resetForm, 3000);
    })
    .catch(error => {
      console.error('Error al enviar el formulario:', error);
      submitButton.textContent = getLocaleMessages().error;
      window.setTimeout(resetForm, 3000);
    });
  });
});
