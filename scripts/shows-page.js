//show array 

const showArray = [
    {
        date: "Mon Sept 09 2024",
        venue: "Ronald Lane",
        location: "San Francisco, CA",
    },
    {
        date: "Tue Sept 17 2024",
        venue: "Pier 3 East ",
        location: "San Francisco, CA",
    },
    {
        date: "Sat Oct 12 2024",
        venue: "View Lounge",
        location: "San Francisco, CA",
    },
    {
        date: "Sat Nov 16 2024",
        venue: "Hyatt Agency",
        location: "San Francisco, CA",
    },
    {
        date: "Fri Nov 29 2024",
        venue: "Moscow Center",
        location: "San Francisco, CA",
    },
    {
        date: "Wed Dec 18 2024",
        venue: "Press Club",
        location: "San Francisco, CA",
    },
]

// function to pass array 
function renderShowList(shows) {
    let showContainer = document.getElementById("section__show_list");
    showContainer.innerHTML=""; 
    let showHeader = document.createElement('h1');
    showHeader.classList.add("section__showHeader");
    showHeader.innerText = "Shows";
    showContainer.appendChild(showHeader);
    for (let i=0; i<shows.length; i++) {
        let showCard = document.createElement("div");
        showCard.classList.add("section__show-card");
        showContainer.appendChild(showCard);

        //box for date/venue/location + content 
        let showDateCard = document.createElement("div");
        let showVenueCard = document.createElement("div");
        let showLocationCard = document.createElement('div'); 
        showDateCard.classList.add("section__show_card--date");
        showVenueCard.classList.add("section__show_card--venue");
        showLocationCard.classList.add("section__show_card--location");
        //append all to showcontainer? or card? 
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
        showDate.innerText= shows[i].date;
        showDateCard.appendChild(showDate);

        let showVenue = document.createElement('div');
        showVenue.classList.add("section__show--venue");
        showVenue.innerText=shows[i].venue;
        showVenueCard.appendChild(showVenue);

        let showLocation = document.createElement('div');
        showLocation.classList.add("section__show--location");
        showLocation.innerText = shows[i].location;
        showLocationCard.appendChild(showLocation);

        let showButton = document.createElement('button');
        showButton.classList.add("section__show--button");
        showButton.innerText = "BUY TICKETS";
        showCard.appendChild(showButton);

    }
 }

renderShowList(showArray);

//

