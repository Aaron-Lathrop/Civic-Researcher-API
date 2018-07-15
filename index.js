'use strict';

//Google Civic API code
const GOOGLE_CIVIC_URL = 'https://www.googleapis.com/civicinfo/v2/representatives';
const civicAPIkey = 'AIzaSyA5z-WSZ6wIlhOW3mFNgUMh-63djxwyDms';

class Politican {
    constructor(name, office, picture, line1, line2, city, state, zip, party, phone, url, GooglePlus, Facebook, Twitter, YouTube) {
        this.name = name;
        this.office = office;
        this.picture = picture;
        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.party = party;
        this.phone = phone;
        this.url = url;
        this.GooglePlus = GooglePlus;
        this.Facebook = Facebook;
        this.Twitter = Twitter;
        this.YouTube = YouTube;
    }
}

function getDataGoogleCivicAPI(userAddress, callback) {
    console.log(`getDataGoogleCivicAPI ran`);
    const setting = {
        key: civicAPIkey,
        address: `${userAddress}`,
    };
    $.getJSON(GOOGLE_CIVIC_URL, setting, callback);
}

function renderOfficials(data) {
    console.log(`renderGoogleCivic ran, name = ${data.name}`);
    console.log(data);
    const results = data.officials.map((item, index) => `${item.name}`);
    console.log(results);
    return results;
}

function renderOffices(data) {
    console.log(` renderOffices ran`)
    const results = data.offices.map((item, index) => `${item.name}`);
    console.log(results);
    return results;
}

function displayGoogleCivic(data) {
    console.log(`displayGoogleCivic ran`);
    const offices = renderOffices(data);
    console.log(`The first office is: ${offices[0]}`);
    const names = renderOfficials(data);
    console.log(`The first name is: ${names[0]}`);
    let results = "";
    for(let i=0; i < offices.length; i++) {
        const officeIndex = data.offices[i].officialIndices;
        for(let j=0; j < officeIndex.length; j++) {
            const currentIndex = officeIndex[j];
            results += `<p>${offices[i]} - ${names[currentIndex]}</p>`;
        }
    }
    $('#results').html(results);
}

function watchCivicSubmit() {
    console.log(`watchCivicSubmit ran`);
    $('#address-form').on('submit', function(e){
        e.preventDefault();
        const addressQuery = $(e.currentTarget).find('#address-search');
        const query = addressQuery.val();
        addressQuery.val('');
        console.log(`Displaying results for ${query}`);
        $('#displayingResultsFor').html(`<p>Displaying results for "${query}"</p>`)
        getDataGoogleCivicAPI(query, displayGoogleCivic);
    });
}

$(watchCivicSubmit);


//Google Search API code
function getDataGoogleSearchAPI() {
    console.log(`getDataGoogleSearchAPI ran`);
}

function renderGoogleSearch() {
    console.log(`renderGoogleSearch ran`);
}

function displayGoogleSearch() {
    console.log(`displayGoogleSearch ran`);
}

function watchSearchSubmit() {
    console.log(`watchCivicSubmit ran`);
}


//YouTube API code
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const youTubeAPIkey = 'AIzaSyAeXH1TNL5oTEVqbPGq8rrh6DF8WTbkKHE';


function getDataYouTubeAPI(searchTerm, callback) {
    const settings = {
        part: 'snippet',
        key: APIkey,
        q: `${searchTerm}`
    }
    $.getJSON(YOUTUBE_SEARCH_URL, settings, callback);
}

function renderYouTube() {
    console.log(`renderYouTube ran`);
}

function displayYouTube() {
    const results = data.items.map((item, index) => renderYouTube(item));
    $('#js-YouTube-results').html( results );
}

function watchYouTubeSubmit() {
    console.log(`watchCivicSubmit ran`);
}


//General functionality

function watchAddressSubmit() {
    console.log(`watchAddressSubmit ran`);
}