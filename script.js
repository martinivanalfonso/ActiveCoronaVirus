// Fetching API
const getData = async (country) => {
  let link = "https://corona.lmao.ninja/v2/countries/";
  if (country) link += country;
  try {
    const response = await fetch(link);
    return response.json().then((data) => data);
  } catch (error) {
    console.log(error);
  }
  return;
};

// Countries

const getCountries = async (number = 15) => {
  const sortedCountries = Object.values(await getData())
    .sort((a, b) => b.active - a.active)
    .slice(0, number);
  renderCountries(sortedCountries);
};

const renderCountries = (sortedCountries) => {
  const content = document.createElement("div");
  content.className = "content";
  document.body.appendChild(content);

  sortedCountries.forEach((element, index) => {
    const card = document.createElement("div");
    if (index < 3) {
      className = "danger";
    } else if (index >= 3 && index < 6) {
      className = "warning";
    } else {
      className = "primary";
    }
    card.innerHTML = `
       <div class="card text-white bg-${className} mb-3" style="max-width: 20rem;">
       <div class="card-header">${element.country}</div>
       <div class="card-body">
         <h4 class="card-title">Active cases:<br><strong>${element.active}</strong></h4>
         <a href="http://www.youtube.com/results?search_query=${element.country}+coronavirus" target="_blank"><button type="button" class="btn btn-dark mt-5">News </button></a>
         <button type="button" data-country="${element.country}" class="btn btn-secondary mt-5"" onclick="openModal(this)">More Details</button>

       </div>
     </div>
       `;
    content.appendChild(card);
  });
};

// Modal

const openModal = (event) => {
  getData(event.dataset.country).then((data) => renderModal(data));
};

const renderModal = (object) => {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  const modal = document.createElement("div");
  modal.innerHTML = `
    <div class="modal-show"id="modal-dialog">
    <div class="modal-dialog" role="document">
    <div class="modal-content bg-info" >
      <div class="modal-header">
        <h5 class="modal-title" ><strong>${object.country}</strong></h5>
      </div>
      <div class="modal-body">
        <p>Current details about this country <br><br>
        Total Cases: ${object.cases}<br>
        Total Active: ${object.active}<br>
        Total Deaths: ${object.deaths}<br>
        Today Deaths: ${object.todayDeaths}<br>
        Total Recovered: ${object.recovered}<br>
        Cases Per Million: ${object.casesPerOneMillion}<br>
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Close</button>
      </div>
    </div>
  </div>
  </div>
    `;
  document.body.appendChild(modal);
};

const closeModal = () => {
  const overlay = document.querySelector(".overlay");
  overlay.remove();
  const modalDialog = document.getElementById("modal-dialog");
  modalDialog.parentElement.remove();
};

// Display 15 countries

addEventListener("DOMContentLoaded", getCountries(15));
