const $addToppingBtn = document.querySelector('#add-topping');
const $traceForm = document.querySelector('#trace-form');
const $customLogicList = document.querySelector('#custom-logic-list');

const handleAddTopping = event => {
  event.preventDefault();

  const toppingValue = document.querySelector('#new-topping').value;

  if (!toppingValue) {
    return false;
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'topping';
  checkbox.value = toppingValue;
  checkbox.id = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const label = document.createElement('label');
  label.textContent = toppingValue;
  label.htmlFor = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const divWrapper = document.createElement('div');

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customLogicList.appendChild(divWrapper);

  toppingValue.value = '';
};

const handleTraceSubmit = event => {
  event.preventDefault();

  const traceName = $traceForm.querySelector('#trace-name').value;
  const createdBy = $traceForm.querySelector('#created-by').value;
  const size = $traceForm.querySelector('#trace-size').value;
  const logic = [...$traceForm.querySelectorAll('[name=topping]:checked')].map(topping => {
    return topping.value;
  });

  if (!traceName || !createdBy || !logic.length) {
    return;
  }

  const formData = { traceName, createdBy, size, logic };

  fetch('/api/traces', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(postResponse => {
      alert('Trace created successully!');
      console.log('postResponse');
    })
    .catch(err => {
      console.log(err);
      saveRecord(formData);
    });
};

$traceForm.addEventListener('submit', handleTraceSubmit);
$addToppingBtn.addEventListener('click', handleAddTopping);
