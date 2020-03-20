const content = document.getElementById('content')
const overlay = document.getElementById('overlay')

// API Requests
function getData() {
    return fetch("https://corona.lmao.ninja/countries")
    .then(response => response.json())

}

function getDataModal(country) {
    let link = "https://corona.lmao.ninja/countries/"
    link += country
    return fetch(link)
    .then(response => response.json())

}

// Countries

function getCountries() {
let topCountries = []
const countries = getData()
countries.then(data => {
    for (const country of data) {
        topCountries.push(country)
        }  
topCountries = topCountries.sort(function(a, b) { 
    if (a.active > b.active) return -1;
    if (b.active > a.active) return 1;}).slice(0,15)
    console.log(topCountries)
    renderCountries(topCountries)

})
}


const renderCountries = (topCountries) => {
    topCountries.forEach( (element, index) => {
       const div = document.createElement('div')
       let className = ""
       if (index < 3) {
           className = "danger"
       } else if (index >= 3 && index < 6) {
        className = "warning"
       } else {
           className = "primary"
       }
       div.innerHTML = `
       <div class="card text-white bg-${className} mb-3" style="max-width: 20rem;">
       <div class="card-header">${element.country}</div>
       <div class="card-body">
         <h4 class="card-title">Active cases:<br><strong>${element.active}</strong></h4>
         <a href="http://www.youtube.com/results?search_query=${element.country}+coronavirus" target="_blank"><button type="button" class="btn btn-dark mt-5">News </button></a>
         <button type="button" data-country="${element.country}" class="btn btn-secondary mt-5"" onclick="openModal(this)">More Details</button>

       </div>
     </div>
       `

        content.appendChild(div)
    });

}

// Modal 

function openModal(event) {
    const response = getDataModal(event.dataset.country)
    response.then( data => {
        renderModal(data)
    }
    )
}

function renderModal(object) {
    overlay.classList.add('active')
    const modal = document.createElement('div')
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
    `
    document.body.appendChild(modal)
}

function closeModal(){
    overlay.classList.remove('active')
    const modalDialog = document.getElementById('modal-dialog')
    modalDialog.parentElement.remove()

}

// Initiate countries

addEventListener('DOMContentLoaded', getCountries())
