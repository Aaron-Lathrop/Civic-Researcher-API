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
                if(this.channels[i].type === "GooglePlus") {
                    social += `<p>${this.channels[i].type}: <a href='https://plus.google.com/${this.channels[i].id}' target="_blank">${this.channels[i].id}</a></p>`
                } else if(this.channels[i].type === "Facebook") {
                    social += `<p>${this.channels[i].type}: <a href='https://www.facebook.com/${this.channels[i].id}'>facebook/${this.channels[i].id}</a></p>`
                } else if(this.channels[i].type === "Twitter") {
                    social += `<p>${this.channels[i].type}: <a href='https://twitter.com/${this.channels[i].id}'>@${this.channels[i].id}</a></p>`
                } else if(this.channels[i].type === "YouTube") {
                    social += `<p>${this.channels[i].type}: <a href='https://www.youtube.com/${this.channels[i].id}'>${this.channels[i].id}</a></p>`
                }
                
            }
            return social;
        }

        address() {
            return `<section id="address">${this.line1}</br>
            ${this.line2}</br>
            ${this.city}, ${this.state} ${this.zip}</section>`
        }

}

function getDataGoogleCivicAPI(userAddress, callback) {
    const setting = {
        key: civicAPIkey,
        address: `${userAddress}`,
    };
    $.getJSON(GOOGLE_CIVIC_URL, setting, callback)
    .fail(function() {$('#displayingResultsFor').html(`<p>Please enter a valid U.S. address for example</p>
    <p>1600 Pennsylvania Ave NW, Washington, DC 20500</p>`)});
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
            politican.line1 = politicalAddress.line1 ? politicalAddress.line1 : "";
            politican.line2 = politicalAddress.line2 ? politicalAddress.line2 : "";
            politican.city = politicalAddress.city ? politicalAddress.city : "";
            politican.state = politicalAddress.state ? politicalAddress.state : "";
            politican.zip = politicalAddress.zip ? politicalAddress.zip : "";
            politican.party = data.officials[currentIndex].party ? data.officials[currentIndex].party : "";
            politican.phone = data.officials[currentIndex].phones ? data.officials[currentIndex].phones[0] : "";
            politican.url = data.officials[currentIndex].urls ? data.officials[currentIndex].urls[0] : "";
            politican.email = data.officials[currentIndex].emails ? data.officials[currentIndex].emails : "";
            politican.channels = data.officials[currentIndex].channels ? data.officials[currentIndex].channels : "";
        }
        politicanList.push(politican);
    };

    return politicanList;
}

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
        //clear previous information, in case of no results
        $('#resultSocialMedia').html("");

        //display picture, show default if no result
        if(politican.picture != undefined){
            $('#resultPicture').find('img').attr('src', `${politican.picture}`);
        } else {
            $('#resultPicture').find('img').attr('src', `https://2.bp.blogspot.com/-gL72SZb5r1A/V5zitzG0yiI/AAAAAAAAH1M/glC6e03Cx6E8k6qXLg61SB3r06xcfoTfACLcB/s1600/captain_america_by_cptcommunist-da55g3v.png`);
        }

        //display general information about politican
        $('#resultInfo').html(`<h2>${politican.name}, ${politican.party}</h2>
        <h3>Info</h3>
        <p>This is going to be super duper information about ${politican.name}</p>
        <h3>Contact</h3>
        <p>${politican.phone}</p>
        <p>Email: ${politican.email}</p>
        <p><a href="${politican.url}" target="_blank" rel="noopener">${politican.url}</a></p>
        ${politican.address()}`);

        //display social media information
        if(politican.channels !== undefined){
            $('#resultSocialMedia').html(`<h3>Social Media</h3>
             ${politican.socialMedia()}`);
        }
        

        //display YouTube results
        $('#youTubeResults').html('<h3>YouTube Videos</h3>');
        $(watchSubmit(politican));
    });
}

function clearResults() {
    $("#displayingResultsFor").html("");
    $("#results").html("");
    $("#moreResults").html("");
    $("#resultPicture").html(" <img src='' alt=''> ");
    $("#resultInfo").html("");
    $("#resultSocialMedia").html("");
    $("#youTubeResults").html("");
}

function watchCivicSubmit() {
    console.log(`watchCivicSubmit ran`);
    $('#address-form').on('submit', function(e){
        e.preventDefault();
        const addressQuery = $(e.currentTarget).find('#address-search');
        const query = addressQuery.val();
        if(query != undefined && query != "") {
            // $('#results').html("");
            $('#displayingResultsFor').html(`<p>Displaying results for "${query}"</p>`);
            addressQuery.val('');
            getDataGoogleCivicAPI(query, displayResults);
        } else if(query === "") {
            $('#displayingResultsFor').html(`<p>Please submit an address before continuing, for example</p>
            <p>1600 Pennsulvania Ave NW, Washington, DC 20500</p>`)
        }
        
        $('#displayingResultsFor').html(`<p>Displaying results for "${query}"</p>`)
        getDataGoogleCivicAPI(query, displayResults);
        
    });
}

$(watchCivicSubmit);


//Wikipedia API code
const wikiURL = 'https://en.wikipedia.org/w/api.php';

function getDataWikipediaAPI() {
    console.log(`getDataWikipediaAPI ran`);
    const settings {

    }
    $.getJSON(wikiURL,settings, callback);
}

function renderWikipedia() {
    console.log(`renderWikipedia ran`);
}

function displayWikipedia() {
    console.log(`displayWikipedia ran`);
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
        key: youTubeAPIkey,
        q: `${searchTerm}`,
        maxResults: 6,
        type: 'video',
        order: 'Relevance',
        sageSearch: 'strict',
        relevanceLanguage: 'en'
    }
    $.getJSON(YOUTUBE_SEARCH_URL, settings, callback);
}

function renderYouTube(result) {

    if(result.id.kind === "youtube#video") {
      return `
      <iframe class="results" src="https://www.youtube.com/embed/${result.id.videoId}" height='180' width='320' title='${result.snippet.title}' aria-label='YouTube Video'> `;
    } else if(result.id.kind === "youtube#channel") {
      return `
      <a href="https://www.youtube.com/user/${result.snippet.channelTitle}" target="_blank" rel="noopener" aria-label='YouTube Channel'><img class='results' src='${result.snippet.thumbnails.medium.url}' alt='${result.snippet.title}' height='180' width='320'></a>`;
    }
  }

function displayYouTube(data) {
    const results = data.items.map((item, index) => renderYouTube(item));
    $('#youTubeResults').append( results );
}

function watchSubmit(politican) {
      const query = `${politican.name} ${politican.office}`;
      getDataYouTubeAPI(query, displayYouTube);
  }