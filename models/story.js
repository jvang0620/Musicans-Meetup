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

const stories = [

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
    startDateTime: '2023-13-20T18:00',
    endDateTime: '2023-13-20T18:00',
    image: ['../images/img-musicians/danny-and-wife.jpg']
},
{
    id: '3',
    title: 'Gone with the Sound',
    category: 'Music Talk',
    host: 'Pat Barret',
    details: 'Come join our Music Talk with Pat Barret. Pat Barret, who are happyily married, graudated from the University of North Carolina at Charlottle, with their Bachelors of Arts in Music Performace. Pat Barret has been playing on the road for the last five years and now they are back to shared with everyone their music experiences.',
    location: 'Music Center Room 101, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: '2023-12-22T18:00',
    endDateTime: '2023-12-22T18:00',
    image: ['../images/img-musicians/Pat-Barrett.jpg']
},
{
    id: '4',
    title: 'Swift',
    category: 'Try Outs',
    host: 'Elevation Worship',
    details: 'Come to Try Outs with Elevation Worship. Elevation Worship is the lead band at Elevation Church in Charlotte, North Carolina.',
    location: 'Music Center Room 105, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: '2023-12-23T18:00',
    endDateTime: '2023-12-23T18:00',
    image: ['../images/img-musicians-tryouts/eleveation.png']
},
{
    id: '5',
    title: 'Lay IT All Down',
    category: 'Try Outs',
    host: 'Casting Crowns',
    details: 'Come to Try Outs with Casting Crowns. Casting Crowns is the lead band at Casting Crowns Church in Charlotte, North Carolina.',
    location: 'Music Center Room 105, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: '2023-12-24T18:00',
    endDateTime: '2023-12-24T18:00',
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
* function to find stories in array (below)
*******************************************/
//exports.find = () => stories; //Can use this or the below code
exports.find = function() {
    return stories;
}

// exports.getAllCategories = function() {
//     //create an arry that store all the unique categories (Unique is the key-word)
//     const uniqueCategoryArray = [];

//     //return stories.find(story=>story.id === id);

//     //check to see, loop through every elemnt in array
//     //stories.forEach(story => story.category === 


        
//     // array.forEach((category) => {
//     //     if!array.includes(category)) {
//     //         uniqueCategoryArray.push(category);
//     //     }
//     // })

//     //check category if exist
//     //if exist do nothing
//     //but if not, add category to the array

//     //4 lines of codes

// }



/*************************************************
* Looking for stories in the array that has matching id
**************************************************/
// exports.findById = id => stories.find(story=>story.id ===id); //Can use this or the below code
exports.findById = function(id) {
    //return array that has matching id
    return stories.find(story=>story.id === id);
}


/***************************************
* Allow me to add story into this array
****************************************/
exports.save = function(story) {
    story.id = uuidv4();
    //story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
}


/***************************************
* Take new story object and get id
*****************************************/
exports.updateById = function(id, newStory) {
    let story = stories.find(story=>story.id === id);

    //if story exist
    if(story) {
        //we update
        story.category = newStory.category; //might have to fix in the future
        story.title = newStory.title;
        story.host = newStory.host;
        story.details = newStory.details;
        story.location = newStory.location;
        story.startDateTime = newStory.startDateTime; //might have to fix in the future
        story.endDateTime = newStory.endDateTime; //might have to fix in the future
        story.image = newStory.image; //might have to fix in the future
        return true;
    }
    else {
        return false;
    }
}

//interface that deletes
exports.deleteById = function(id) {
    //fucntion to find a story that matches this id and set to index
    let index = stories.findIndex(story => story.id === id);
    
    if (index !== -1) {
        stories.splice(index, 1); //delete story/event
        return true;
    }
    else {
        return false; //false if deletion is NOT successful
    }
}