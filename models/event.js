/*********************************************************************************
* From https://moment.github.io/luxon/#/install
* Third party module use to manipulate date/time objects (npm install luxon)
* Can craete object of 'DateTime' class or to convert object to a particular object
* In addtion, dummy text (lorem) can be found from https://lipsum.com/feed/html
**********************************************************************************/


/********************** Contain data objects and interface functions**************************/



//require luxon module & import date/time class from luxon model
const { DateTime } = require("luxon");

//after installing ('npm i uuid'), must require this package
const {v4: uuidv4} = require('uuid');

const events = [

//Example:
// { 
//     id: '1',
//     title: 'My life at Charlotte',
//     content: 'The computer science program is tough. I have to work really hard to earn a decent grade. But I believe it will pay off at the end. :)', 
//     author: 'Jai Vang',
//     createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT) //DATETIME_SHORT from https://moment.github.io/luxon/#/formatting
// },

{
    id: '1',
    title: 'Long Live The Musician',
    category: 'Music Talk',
    host: 'Chris and Lauren',
    details: 'Come join our Music Talk with Chris and Lauren. Chris and Lauren, who are happyily married, graudated from the University of North Carolina at Charlottle, with their Bachelors of Arts in Music Performace. Chris and Laruen has been playing on the road for the last five years and now they are back to shared with everyone their music experiences.',
    location: 'Music Center Room 101, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: '2023-12-20T18:00',
    endDateTime: '2023-12-20T19:00',
    image: ['../images/img-musicians/chris-and-wife.jpg']
},
{
    id: '2',
    title: 'A Piece Of Pie',
    category: 'Music Talk',
    host: 'Danny and Leyicet',
    details: 'Come join our Music Talk with Danny and Leyicet. Danny and Leyicet, who are happyily married, graudated from the University of North Carolina at Charlottle, with their Bachelors of Arts in Music Performace. Danny and Leyicet has been playing on the road for the last five years and now they are back to shared with everyone their music experiences.',
    location: 'Music Center Room 101, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: '2023-12-21T18:00',
    endDateTime: '2023-12-21T19:00',
    image: ['../images/img-musicians/danny-and-wife.jpg']
},
{
    id: '3',
    title: 'Gone with the Sound',
    category: 'Music Talk',
    host: 'Pat Barret',
    details: 'Come join our Music Talk with Pat Barret. Pat Barret, who are happyily married, graudated from the University of North Carolina at Charlottle, with their Bachelors of Arts in Music Performace. Pat Barret has been playing on the road for the last five years and now they are back to shared with everyone their music experiences.',
    location: 'Music Center Room 101, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: '2023-12-23T18:00',
    endDateTime: '2023-12-23T18:00',
    image: ['../images/img-musicians/Pat-Barrett.jpg']
},
{
    id: '4',
    title: 'Swift',
    category: 'Try Outs',
    host: 'Elevation Worship',
    details: 'Come to Try Outs with Elevation Worship. Elevation Worship is the lead band at Elevation Church in Charlotte, North Carolina.',
    location: 'Music Center Room 105, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: '2023-12-24T18:00',
    endDateTime: '2023-12-24T18:00',
    image: ['../images/img-musicians-tryouts/eleveation.png']
},
{
    id: '5',
    title: 'Lay IT All Down',
    category: 'Try Outs',
    host: 'Casting Crowns',
    details: 'Come to Try Outs with Casting Crowns. Casting Crowns is the lead band at Casting Crowns Church in Charlotte, North Carolina.',
    location: 'Music Center Room 105, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: '2023-12-28T18:00',
    endDateTime: '2023-12-28T18:00',
    image: ['../images/img-musicians-tryouts/casting_crowns.jpg']
},
{
    id: '6',
    title: 'No Regrets',
    category: 'Try Outs',
    host: 'Passion Worship',
    details: 'Come to Try Outs with Passion Worship. Passion Worship is the lead band at Passion City Church in Charlotte, North Carolina.',
    location: 'Music Center Room 105, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: '2023-12-30T18:00',
    endDateTime: '2023-12-30T18:00',
    image: ['../images/img-musicians-tryouts/passion-worship.jpg']
}
];


/******************************************
* function to find events in array
*******************************************/
//exports.find = () => events; //Can use this or the below code
exports.find = function() {
    return events;
}


/******************************************
* function to find unique arrays
*******************************************/
exports.getAllCategories = function() {
    //create an arry that store all the unique categories (Unique is the key-word)
    const uniqueEvents = {};

    //check to see, loop through every element in array
    events.forEach(event => {
        //if category doesn't exist, set to empty
        if (!uniqueEvents[event.category]) {
            uniqueEvents[event.category] = [];
        }
        //otherwise, add category to uniqueEvents arrray
        uniqueEvents[event.category].push(event);
    });
    //test
    // console.log(uniqueEvents);
    
    return uniqueEvents;
}


/*************************************************
* Looking for events in the array that has matching id
**************************************************/
// exports.findById = id => events.find(event=>event.id ===id); //Can use this or the below code
exports.findById = function(id) {
    //return array that has matching id
    return events.find(event=>event.id === id);
}


/***************************************
* Allow me to add event into this array
****************************************/
exports.save = function(event) {
    event.id = uuidv4();
    console.log(event);
    events.push(event);
}


/***************************************
* Take new event object and get id
****************************************/
exports.updateById = function(id, updatedEvent) {
    let event = events.find(event=>event.id === id);

    //if event exist
    if(event) {
        //we update
        event.category = updatedEvent.category; 
        event.title = updatedEvent.title;
        event.host = updatedEvent.host;
        event.details = updatedEvent.details;
        event.location = updatedEvent.location;
        event.startDateTime = updatedEvent.startDateTime; 
        event.endDateTime = updatedEvent.endDateTime; 
        event.image = updatedEvent.image; //might have to fix in the future
        return true;
    }
    else {
        return false;
    }
}

/**************************************
* interface that deletes 
***************************************/
exports.deleteById = function(id) {
    //function to find a event that matches this id and set to index
    let index = events.findIndex(event => event.id === id);
    
    if (index !== -1) {
        events.splice(index, 1); //delete event
        return true;
    }
    else {
        return false; //false if deletion is NOT successful
    }
}