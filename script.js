function getData() {
    return fetch("https://corona.lmao.ninja/countries")
    .then(response => response.json())

}

function getNine() {
let topNine = []
const countries = getData()
countries.then(data => {
    for (const country of data) {
        topNine.push(country)
        }  
topNine = topNine.sort(function(a, b) { 
    if (a.active > b.active) return -1;
    if (b.active > a.active) return 1;}).slice(0,9)
    console.log(topNine)
    renderNine(topNine)

})
const content = document.getElementById('content')
}
function renderNine(topNine) {
    topNine.forEach( (element, index) => {
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
         <h4 class="card-title">Active cases: <strong>${element.active}</strong></h4>
         <a href="http://www.youtube.com/results?search_query=${element.country}+coronavirus"><button type="button" class="btn btn-dark mt-5">News </button></a>
       </div>
     </div>
       `

        content.appendChild(div)
    });

}

getNine()