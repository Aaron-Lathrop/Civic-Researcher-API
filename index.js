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
    .fail(function() {
        $('#displayingResultsFor').html(`<p>Sorry, but no results were found.</p>
        <p>Try just the city, for example "San Fransico"</p>`);
        
});
}


function createPoliticanList(data) {
    const politicanList = [];
    const officials = data.officials.map((item, index) => `${item.name}`);
    const offices = data.offices.map((item, index) => `${item.name}`);
    let officeIndex = [];
    for(let i = 0; i < officials.length - 1; i++){
        let politican = new Politican();
        politican.index = i;
        if(i < data.offices.length) {
            officeIndex = data.offices[i].officialIndices;
            politican.office = offices[i];
            
        } else {
            officeIndex = data.offices[offices.length - 1].officialIndices;
            politican.office = offices[offices.length - 1 ];
        }


        for(let j=0; j < officeIndex.length; j++) {

            let currentIndex = officeIndex[j];

            if(j === 0){
                politican.name = officials[currentIndex];
                politican.picture = data.officials[currentIndex].photoUrl;
                if(data.officials[currentIndex].address !== undefined){
                const politicalAddress = data.officials[currentIndex].address[0];
                    
                    
                    politican.line1 = politicalAddress.line1 ? politicalAddress.line1 : "";
                    politican.line2 = politicalAddress.line2 ? politicalAddress.line2 : "";
                    politican.city = politicalAddress.city ? politicalAddress.city : "";
                    politican.state = politicalAddress.state ? politicalAddress.state : "";
                    politican.zip = politicalAddress.zip ? politicalAddress.zip : "";
                }
                politican.party = data.officials[currentIndex].party ? data.officials[currentIndex].party : "";
                politican.phone = data.officials[currentIndex].phones ? data.officials[currentIndex].phones[0] : "";
                politican.url = data.officials[currentIndex].urls ? data.officials[currentIndex].urls[0] : "";
                politican.email = data.officials[currentIndex].emails ? data.officials[currentIndex].emails : "";
                politican.channels = data.officials[currentIndex].channels ? data.officials[currentIndex].channels : "";
            } else {
                let politicanTwo = new Politican();
                politicanTwo.index = (i + j);
                politicanTwo.office = offices[i];
                politicanTwo.name = officials[currentIndex];
                politicanTwo.picture = data.officials[currentIndex].photoUrl;
                if(data.officials[currentIndex].address !== undefined){
                const politicalAddress = data.officials[currentIndex].address[0];
                    
                    
                    politicanTwo.line1 = politicalAddress.line1 ? politicalAddress.line1 : "";
                    politicanTwo.line2 = politicalAddress.line2 ? politicalAddress.line2 : "";
                    politicanTwo.city = politicalAddress.city ? politicalAddress.city : "";
                    politicanTwo.state = politicalAddress.state ? politicalAddress.state : "";
                    politicanTwo.zip = politicalAddress.zip ? politicalAddress.zip : "";
                }
                politicanTwo.party = data.officials[currentIndex].party ? data.officials[currentIndex].party : "";
                politicanTwo.phone = data.officials[currentIndex].phones ? data.officials[currentIndex].phones[0] : "";
                politicanTwo.url = data.officials[currentIndex].urls ? data.officials[currentIndex].urls[0] : "";
                politicanTwo.email = data.officials[currentIndex].emails ? data.officials[currentIndex].emails : "";
                politicanTwo.channels = data.officials[currentIndex].channels ? data.officials[currentIndex].channels : "";
    
                politicanList.push(politicanTwo);
            }

        }
        //Fix bug where the last politican is sometimes added mulitiple times
        while(politicanList.length >= officials.length) {
            politicanList.pop();
        }
        //Add the politican to the list
        politicanList.push(politican);
    };

    return politicanList;
}

function displayResults(data) {
    const politican = createPoliticanList(data);

    let federalResults = "<h2>Federal Level</h2><ul>";
    let localResults = "<h2>Local Level</h2><ul>";
    for(let i=0; i < (politican.length); i++) {
        if(politican[i].isFederal() === true) {
            federalResults += `<li id=${i}><a href='#resultPicture'>${politican[i].office} - <span  class='name'>${politican[i].name}</span></a></li>`
        } else {
            localResults += `<li id=${i}><a href='#resultPicture'>${politican[i].office} - <span  class='name'>${politican[i].name}</span></a></li>`
        }
        
    }
    federalResults += '</ul>';
    localResults += '</ul>';
    
    $('#federal').html(federalResults);
    $('#local').html(localResults);
    $(displayMoreResults(politican));
}

function displayMoreResults(politicanList) {
    $('li').click(function(e) {
            
            const id = $(this).attr("id");
            const politican = politicanList[id];
            const info = $(getDataWikipediaAPI(`${politican.name}`));
            
            //clear previous information, in case of no results
            $('#resultSocialMedia').html("");

            //display picture, show default if no result
            if(politican.picture != undefined){
                $('#resultPicture').html(`<hr><img src='${politican.picture}' alt='${politican.name}'>
                <h2>${politican.name}</br>${politican.party}</h2>`);
                
            } else {
                $('#resultPicture').html(`<hr><h2>${politican.name}</br>${politican.party}</h2>`);
            }

            //display general information about politican
            $('#resultContact').html(`
            <h3>Contact</h3>
            <p>${politican.phone}</p>
            <p>${politican.email}</p>
            <p><a href="${politican.url}" target="_blank" rel="noopener">${politican.url}</a></p>
            ${politican.address()}`);

            //display social media information
            if(politican.channels.length > 0){
                $('#resultSocialMedia').html(`<h3>Social Media</h3>
                ${politican.socialMedia()}`);
            } else {
                $('#resultSocialMedia').html(`<h3>Social Media</h3>
                <p>No social media accounts found`);
            }
            

            //display YouTube results
            $('#youTubeResults').html('<br><br><hr><h3>YouTube Videos</h3>');
            $(watchSubmit(politican)).ready($('footer').html(`<a href='#address-form' class='card-1'>Back to Top</a><br><br><p>Created by Aaron Lathrop Miller - 2018</p>`));
            
    });
        
}


function watchCivicSubmit() {
    
    $('#address-form').on('submit', function(e){
        e.preventDefault();
        const addressQuery = $(e.currentTarget).find('#address-search');
        const query = addressQuery.val();
        
        //clears previous results in case of mulitple searches
        $('main').html(`
        
        <section id='results'  aria-live="polite">
            
            <div class='row'>
            <div id='federal' class='col-6'></div>
            <div id='local' class='col-6'></div>
            </div>
        </section>
        <section id='moreResults' aria-live="polite">
            <div class='row'>
                <section id='resultPicture'>
                <img src='' alt=''>
                </section>
                <section class='row'>
                    <section id='resultContact' class='col-6'></section>
                    <section id='resultSocialMedia' class='col-6'></section>
                </section>
                <section id='bio' class="hide"></section>
                <section id='youTubeResults'></section>
            </div>   
        </section>   `);
        $('#displayingResultsFor').html(`<p>Displaying results for "${query}"</p>
        <p>Click on a name for more information</p>`);
        getDataGoogleCivicAPI(query, displayResults);
        
    });
}

$(document).ready($(watchCivicSubmit));


//Wikipedia API code
const wikiURL = 'https://en.wikipedia.org/w/api.php';

function getDataWikipediaAPI(search) {
   
    const settings = {
        origin: "*",
        format: "json",
        action: "query",
        prop: "extracts",
        exlimit: "max",
        explaintext:"",
        exintro:"",
        titles: `${search}`,
        redirects: "true",
        indexpageids:""
        }
      
      
      $.getJSON(wikiURL, settings).done(function(response) {
          const key = Object.values(response.query.pages);
          const info = key[0].extract.replace(/\n/g, "<br /> <br />");
          $('#bio').removeClass('hide');
          $('#bio').html(`<hr><h3>Bio</h3>
          <p>${info}</p>`);
      })
      .fail($('#bio').html(``));
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