/*********************************************************************************
* From https://moment.github.io/luxon/#/install
* Third party module use to manipulate date/time objects (npm install luxon)
* Can craete object of 'DateTime' class or to convert object to a particular object
* In addtion, dummy text (lorem) can be found from https://lipsum.com/feed/html
**********************************************************************************/


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
    title: 'Music Talk',
    category: 'Music Talk',
    host: 'Chris and Lauren',
    details: 'Come join our Music Talk with Chris and Lauren. Chris and Lauren, who are happyily married, graudated from the University of North Carolina at Charlottle, with their Bachelors of Arts in Music Performace. Chris and Laruen has been playing on the road for the last five years and now they are back to shared with everyone their music experiences.',
    location: 'Music Center Room 101, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: DateTime.local(2023, 9, 14, 18, 0).toLocaleString(DateTime.DATETIME_SHORT),
    endDateTime: DateTime.local(2023, 9, 14, 19, 0).toLocaleString(DateTime.DATETIME_SHORT),
    image: ['../images/img-musicians/chris-and-wife.jpg']
},
{
    id: '2',
    title: 'Music Talk',
    category: 'Music Talk',
    host: 'Danny and Leyicet',
    details: 'Come join our Music Talk with Danny and Leyicet. Danny and Leyicet, who are happyily married, graudated from the University of North Carolina at Charlottle, with their Bachelors of Arts in Music Performace. Danny and Leyicet has been playing on the road for the last five years and now they are back to shared with everyone their music experiences.',
    location: 'Music Center Room 101, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: DateTime.local(2023, 9, 15, 18, 0).toLocaleString(DateTime.DATETIME_SHORT),
    endDateTime: DateTime.local(2023, 9, 15, 19, 0).toLocaleString(DateTime.DATETIME_SHORT),
    image: ['../images/img-musicians/danny-and-wife.jpg']
},
{
    id: '3',
    title: 'Music Talk',
    category: 'Music Talk',
    host: 'Pat Barret',
    details: 'Come join our Music Talk with Pat Barret. Pat Barret, who are happyily married, graudated from the University of North Carolina at Charlottle, with their Bachelors of Arts in Music Performace. Pat Barret has been playing on the road for the last five years and now they are back to shared with everyone their music experiences.',
    location: 'Music Center Room 101, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: DateTime.local(2023, 9, 16, 18, 0).toLocaleString(DateTime.DATETIME_SHORT),
    endDateTime: DateTime.local(2023, 9, 16, 19, 0).toLocaleString(DateTime.DATETIME_SHORT),
    image: ['../images/img-musicians/Pat-Barrett.jpg']
},
{
    id: '4',
    title: 'Try Outs',
    category: 'Try Outs',
    host: 'Elevation Worship',
    details: 'Come to Try Outs with Elevation Worship. Elevation Worship is the lead band at Elevation Church in Charlotte, North Carolina.',
    location: 'Music Center Room 105, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: DateTime.local(2023, 10, 16, 18, 0).toLocaleString(DateTime.DATETIME_SHORT),
    endDateTime: DateTime.local(2023, 10, 16, 19, 0).toLocaleString(DateTime.DATETIME_SHORT),
    image: ['../images/img-musicians-tryouts/eleveation.png']
},
{
    id: '5',
    title: 'Try Outs',
    category: 'Try Outs',
    host: 'Casting Crowns',
    details: 'Come to Try Outs with Casting Crowns. Casting Crowns is the lead band at Casting Crowns Church in Charlotte, North Carolina.',
    location: 'Music Center Room 105, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: DateTime.local(2023, 10, 17, 18, 0).toLocaleString(DateTime.DATETIME_SHORT),
    endDateTime: DateTime.local(2023, 10, 17, 19, 0).toLocaleString(DateTime.DATETIME_SHORT),
    image: ['../images/img-musicians-tryouts/casting_crowns.jpg']
},
{
    id: '6',
    title: 'Try Outs',
    category: 'Try Outs',
    host: 'Passion Worship',
    details: 'Come to Try Outs with Passion Worship. Passion Worship is the lead band at Passion City Church in Charlotte, North Carolina.',
    location: 'Music Center Room 105, 2319 Wellesley Ave., Charlotte, NC 28207',
    startDateTime: DateTime.local(2023, 10, 18, 18, 0).toLocaleString(DateTime.DATETIME_SHORT),
    endDateTime: DateTime.local(2023, 10, 18, 19, 0).toLocaleString(DateTime.DATETIME_SHORT),
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
    // story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
}



