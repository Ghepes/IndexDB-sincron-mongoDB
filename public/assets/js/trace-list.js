const $traceList = document.querySelector('#trace-list');

const getTraceList = () => {
  fetch('/api/traces')
    .then(response => response.json())
    .then(traceListArr => {
      traceListArr.forEach(printTrace);
    })
    .catch(err => {
      console.log(err);
    });
};

const printTrace = ({ _id, traceName, logic, size, commentCount, createdBy, createdAt }) => {
  const traceCard = `
    <div class="col-12 col-lg-6 flex-row">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${traceName}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-dark">By ${createdBy}</h4>
          <p>On ${createdAt}</p>
          <p>${commentCount} Comments</p>
          <h5 class="text-dark">Suggested Size: ${size}
          <h5 class="text-dark">Logic</h5>
          <ul>
            ${logic
              .map(topping => {
                return `<li>${topping}</li>`;
              })
              .join('')}
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/trace?id=${_id}">See the discussion.</a>
        </div>
      </div>
    </div>
  `;

  $traceList.innerHTML += traceCard;
};

getTraceList();
