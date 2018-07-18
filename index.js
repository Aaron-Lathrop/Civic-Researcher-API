'use strict';

//Google Civic API code
const GOOGLE_CIVIC_URL = 'https://www.googleapis.com/civicinfo/v2/representatives';
const civicAPIkey = 'AIzaSyA5z-WSZ6wIlhOW3mFNgUMh-63djxwyDms';

class Politican {
    constructor(name, office, picture, line1, line2, city, state, zip, party, phone, url, email, channels, federal, index) {
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
        this.email = email;
        this.channels = channels;
        this.federal = federal;
        this.index = index;
    }

        isFederal() {
            if(this.office.includes('United States')) {
                this.federal = true;
            } else {
                this.federal = false;
            }
            return this.federal;
        }

        socialMedia() {
            let social = "";
            for(let i = 0; i < this.channels.length; i++) {
                social += `<p>${this.channels[i].type}: ${this.channels[i].id}</p>`
            }
            return social;
        }

}

function getDataGoogleCivicAPI(userAddress, callback) {
    const setting = {
        key: civicAPIkey,
        address: `${userAddress}`,
    };
    $.getJSON(GOOGLE_CIVIC_URL, setting, callback);
}


function createPoliticanList(data) {
    const politicanList = [];
    const officials = data.officials.map((item, index) => `${item.name}`);
    const offices = data.offices.map((item, index) => `${item.name}`);
    let officeIndex = [];
    for(let i = 0; i < data.officials.length - 1; i++){
        let politican = new Politican();
        politican.index = i;
        if(i < data.offices.length) {
            officeIndex = data.offices[i].officialIndices;
            politican.office = offices[i];
            
        } else {
            officeIndex = data.offices[offices.length -1].officialIndices;
            politican.office = offices[i -1];
        }
        for(let j=0; j < officeIndex.length; j++) {
            const currentIndex = officeIndex[j];
            const politicalAddress = data.officials[currentIndex].address[0];
            politican.name = officials[currentIndex];
            politican.picture = data.officials[currentIndex].photoUrl;
            politican.line1 = politicalAddress.line1;
            politican.line2 = politicalAddress.line2;
            politican.city = politicalAddress.city;
            politican.state = politicalAddress.state;
            politican.zip = politicalAddress.zip;
            politican.party = data.officials[currentIndex].party;
            politican.phone = data.officials[currentIndex].phones;
            politican.url = data.officials[currentIndex].urls;
            politican.email = data.officials[currentIndex].emails;
            politican.channels = data.officials[currentIndex].channels;
        }
        politicanList.push(politican);
    };

    return politicanList;
}

// function renderOfficials(data) {
//     console.log(`renderGoogleCivic ran, name = ${data.name}`);
//     const results = data.officials.map((item, index) => `${item.name}`);
//     return results;
// }

// function renderOffices(data) {
//     console.log(` renderOffices ran`)
//     const results = data.offices.map((item, index) => `${item.name}`);
//     return results;
// }

function displayResults(data) {
    const politican = createPoliticanList(data);
    let federalResults = "<h2>Federal Level</h2><ul>";
    let localResults = "<h2>Local Level</h2><ul>";
    for(let i=0; i < politican.length; i++) {
        if(politican[i].isFederal() === true) {
            federalResults += `<li id=${i}>${politican[i].office} - <span  class='name'>${politican[i].name}</span></li>`
        } else {
            localResults += `<li id=${i}>${politican[i].office} - <span  class='name'>${politican[i].name}</span></li>`
        }
        
    }
    federalResults += '</ul>';
    localResults += '</ul>';
    $('#federal').html(federalResults);
    $('#local').html(localResults);
    $(displayMoreResults(politican));
}

function displayMoreResults(politicanList) {
    $('li').on('click', function(e) {
        const id = $(this).attr("id");
        const politican = politicanList[id];
        $('#resultPicture').find('img').attr('src', `${politican.picture}`);
        $('#resultInfo').html(`<h2>${politican.name}</h2>
        <h3>Info</h3>
        <p>This is going to be super duper information about ${politican.name}</p>`);
        $('#resultSocialMedia').html(`<h3>Social Media</h3>
        ${politican.socialMedia()}`);
        $('#youTubeResults').html('<h3>YouTube Videos</h3>');
    });
}

function watchCivicSubmit() {
    console.log(`watchCivicSubmit ran`);
    $('#address-form').on('submit', function(e){
        e.preventDefault();
        const addressQuery = $(e.currentTarget).find('#address-search');
        const query = addressQuery.val();
        addressQuery.val('');
        $('#displayingResultsFor').html(`<p>Displaying results for "${query}"</p>`)
        getDataGoogleCivicAPI(query, displayResults);
        
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