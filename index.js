// This is where I'll write tons of awesome javascript

//Google Civic API code
function getDataGoogleCivicAPI {
    console.log(`getDataGoogleCivicAPI ran`);
}

function renderGoogleCivic {
    console.log(`renderGoogleCivic ran`);
}

function displayGoogleCivic() {
    console.log(`displayGoogleCivic ran`);
}

function watchCivicSubmit() {
    console.log(`watchCivicSubmit ran`);
}


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
const APIkey = 'AIzaSyAeXH1TNL5oTEVqbPGq8rrh6DF8WTbkKHE';


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