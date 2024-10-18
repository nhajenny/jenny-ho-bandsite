//show array 
// const showArray = [
//     {
//         date: "Mon Sept 09 2024",
//         venue: "Ronald Lane",
//         location: "San Francisco, CA",
//     },
//     {
//         date: "Tue Sept 17 2024",
//         venue: "Pier 3 East ",
//         location: "San Francisco, CA",
//     },
//     {
//         date: "Sat Oct 12 2024",
//         venue: "View Lounge",
//         location: "San Francisco, CA",
//     },
//     {
//         date: "Sat Nov 16 2024",
//         venue: "Hyatt Agency",
//         location: "San Francisco, CA",
//     },
//     {
//         date: "Fri Nov 29 2024",
//         venue: "Moscow Center",
//         location: "San Francisco, CA",
//     },
//     {
//         date: "Wed Dec 18 2024",
//         venue: "Press Club",
//         location: "San Francisco, CA",
//     },
// ]

import BandSiteApi from "./band-site-api.js"; 
const API_KEY="1b40932c-c612-4e3a-8adf-0d72a2e6c875";
const bandSiteApi = new BandSiteApi(API_KEY);

async function getRenderShowDates() {
    try {
        const showDates = await bandSiteApi.getShowDates();
        renderShowList(showDates);
    } catch(error) {
        console.error("error getting show dates",error);
    }
}

// function to pass array 
function renderShowList(shows) {
    let showContainer = document.querySelector(".section__show-list");
    showContainer.innerHTML=""; 
    let showHeader = document.createElement('h1');
    showHeader.classList.add("section__showHeader");
    showHeader.innerText = "Shows";
    showContainer.appendChild(showHeader);

//header row for name, venue, location
    
        let titleRow = document.createElement("div");
        titleRow.classList.add("section__show-card--header");
        let dateHeader = document.createElement("div");
        dateHeader.classList.add("section__date--header");
        dateHeader.innerText = "DATE";
        let venueHeader = document.createElement("div");
        venueHeader.classList.add("section__venue--header");
        venueHeader.innerText = "VENUE";
        let locationHeader = document.createElement("div");
        locationHeader.classList.add("section__location--header");
        locationHeader.innerText = "LOCATION";
        titleRow.appendChild(dateHeader);
        titleRow.appendChild(venueHeader);
        titleRow.appendChild(locationHeader);
        showContainer.appendChild(titleRow);

// start for loop to run through showArray
shows.forEach ((show)=> {
    //for (let i=0; i<shows.length; i++) {
    let showCard = document.createElement("div");
    showCard.classList.add("section__show-card");
    showCard.addEventListener("click", ()=> {
        showCard.classList.toggle("clicked");
    });
    showContainer.appendChild(showCard);
    //box for date/venue/location + content 
    let showDateCard = document.createElement("div");
    let showVenueCard = document.createElement("div");
    let showLocationCard = document.createElement('div'); 
    showDateCard.classList.add("section__show_card--date");
    showVenueCard.classList.add("section__show_card--venue");
    showLocationCard.classList.add("section__show_card--location");
    showCard.appendChild(showDateCard);
    showCard.appendChild(showVenueCard);
    showCard.appendChild(showLocationCard);
    //header title/naming (date/venue/location)
    let showDateTitle = document.createElement('div');
    let showVenueTitle = document.createElement('div');
    let showLocationTitle = document.createElement('div');

    showDateTitle.classList.add("section__show_date--title");
    showDateTitle.innerText = "DATE:"
    showVenueTitle.classList.add("section__show_venue--title");
    showVenueTitle.innerText="VENUE:";
    showLocationTitle.classList.add("section__show_location--title");
    showLocationTitle.innerText="LOCATION:";

    showDateCard.appendChild(showDateTitle);
    showVenueCard.appendChild(showVenueTitle);
    showLocationCard.appendChild(showLocationTitle);

    let showDate = document.createElement("div");
    showDate.classList.add("section__show--date");
    showDate.innerText= new Date(show.date).toLocaleDateString('en-US',{weekday:'short',year:'numeric', month:'short',day:'numeric'});
    showDateCard.appendChild(showDate);

    let showVenue = document.createElement('div');
    showVenue.classList.add("section__show--venue");
    showVenue.innerText=show.place;
    showVenueCard.appendChild(showVenue);

    let showLocation = document.createElement('div');
    showLocation.classList.add("section__show--location");
    showLocation.innerText = show.location;
    showLocationCard.appendChild(showLocation);

    let showButton = document.createElement('button');
    showButton.classList.add("section__show--button");
    showButton.innerText = "BUY TICKETS";
    showCard.appendChild(showButton);
});
}

getRenderShowDates();

