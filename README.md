# Civic-Researcher-API

Introduction

The Civic Researcher site is designed to help people researcher U.S.A. politicans by searching a city and state (e.g. Denver, CO) by returning information from the Google Civic Information API, Wikipedia API, and YouTube API. After the user enters this information into the search bar and submits it, the site returns which results are being displayed (including no results and another example of how to input a search) along with a list of politicans on the federal and local levels that have jursidiction over the area submited. When the user clicks on a name, they're taken to more detailed results about that person including: party affiliation, contact information, social media, a brief biography, and 6 YouTube video results. The user has the option to return to the top of the screen at the bottom of the YouTube results.

For more detailed information about the code of this project, please visit https://github.com/Aaron-Lathrop/Civic-Researcher-API

To visit the live Civic Researcher site https://aaron-lathrop.github.io/Civic-Researcher-API/


Known Issues

While the Civic Researcher site works the majority of cases there are some known issues and opportunity for improvement.
    
    1. Pictures for all politicans were not available in the Google Civic Information API and some results exclude a picture. In the future, the Wikipedia API or another API will be used as 
    an alternate source for an image in these cases.
    
    2. The Wikipedia API does not always return biographical information on each politican and the site is set to display nothing currently. In the future, an alternate source for this information will be included so as to always provide more robust information.
    
    3. The Wikipedia API sometimes includes a reference to mulitiple results in the biographical information section. In the future, this bug will be resolved.
    
    4. The YouTube API sometimes returns irrelevant results, likely due to the low profile of the politican searched. In the future, it is hoped this issue can be resolved.