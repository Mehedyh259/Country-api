const showModal = () => {
    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
}

const toggleSpinner = prop => {
    document.getElementById('spinner').style.display = prop;
}
const loadCountries = () => {
    document.getElementById('countries').textContent = '';
    toggleSpinner('block');
    fetch(`https://restcountries.com/v3.1/all`)
        .then(res => res.json())
        .then(data => showCountries(data))
}

const showDetails = country => {
    fetch(`https://restcountries.com/v3.1/name/{${country}}`)
        .then(res => res.json())
        .then(data => showDetailsModal(data[0]))
}

const showDetailsModal = country => {
    console.log(country)
    document.getElementById('country-name').innerText = country.name.common;
    const container = document.getElementById('country-details');
    container.innerHTML = `
            <img src=${country.flags.png} style=" width: 100%;" class="card-img-top img-thumbnail" alt="...">
            <div class="card-body">
                 <p class="card-text fw-bold">Area: <span class="text-danger">${country.area} square kilometers</span></p>
                 <p class="card-text fw-bold">Populations: <span class="text-danger">${country.population} peoples</span></p>
                 <p class="card-text fw-bold">Capital: <span class="text-danger">${country.capital}</span></p>
                 <p class="card-text fw-bold">Currency: <span class="text-danger">
                    (${country.currencies[Object.keys(country.currencies)[0]].symbol})  ${country.currencies[Object.keys(country.currencies)[0]].name}</span>
                 </p>
                <p class="card-text fw-bold">Region: <span class="text-danger">${country.region}</span></p>
                <p class="card-text fw-bold">Continents: <span class="text-danger">${country.continents}</span></p>
                <p class="card-text fw-bold">Sub Region: <span class="text-danger">${country.subregion}</span></p>
                <p class="card-text fw-bold">TimeZones: <span class="text-danger">${country.timezones}</span></p>

            </div>
    `;
    const myModal = new bootstrap.Modal(document.getElementById('myModal'))
    myModal.show()

}

const showCountries = countries => {
    const container = document.getElementById('countries');

    countries.forEach(country => {
        const div = document.createElement('div');
        div.classList.add('col-11', 'col-sm-6', 'col-md-3', 'col-lg-2', 'my-2', 'mx-auto');
        div.innerHTML = `
            <div class="card bg-light">
                <img src=${country.flags.png} style="height: 130px; width: 100%;" class="card-img-top img-thumbnail" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${country.name.common}</h5>
                    <small class="card-text">Region: ${country.region}</small><br>
                    <small class="card-text">Capital: ${country.capital}</small><br>
                    <a href="#" onclick="showDetails('${country.name.common}')" class="btn btn-sm btn-primary mt-2">Details</a>
                </div>
            </div> 
        `;
        container.appendChild(div);

    });
    toggleSpinner('none');
}


loadCountries();


const getCountry = () => {
    document.getElementById('countries').textContent = '';
    toggleSpinner('block');
    const search = document.getElementById('search-country').value;

    fetch(`https://restcountries.com/v3.1/name/{${search}}`)
        .then(res => res.json())
        .then(data => showCountries(data))
        .catch(error => {
            document.getElementById('countries').innerHTML = `
            <div class="col-md-10 mt-3 mx-auto alert alert-danger" role="alert">
                    Country Name Does Not Exist !!
                </div>`;
            toggleSpinner('none');
        })
}

const countryByRegion = region => {
    document.getElementById('countries').textContent = '';
    toggleSpinner('block');
    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then(data => showCountries(data));



}