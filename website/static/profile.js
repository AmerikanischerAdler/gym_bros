function submitAllForms() {
  const forms = document.querySelectorAll('form');

  const finalForm = document.createElement('form');
  finalForm.method = 'POST';
  finalForm.action = '/update-profile'; 

  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const clonedInput = input.cloneNode(true);
      finalForm.appendChild(clonedInput);
    });
  });

  document.body.appendChild(finalForm);
  finalForm.submit();
}
