/*********************************************************************************
* From https://moment.github.io/luxon/#/install
* Third party module use to manipulate date/time objects (npm install luxon)
* Can craete object of 'DateTime' class or to convert object to a particular object
* In addtion, dummy text (lorem) can be found from https://lipsum.com/feed/html
**********************************************************************************/


//require luxon module & import date/time class from luxon model
const { DateTime } = require("luxon");

const stories = [
{
    id: '1',
    title: 'My life at Charlotte',
    content: 'The computer science program is tough. I have to work really hard to earn a decent grade. But I believe it will pay off at the end. :)', 
    author: 'Jai Vang',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT) //DATETIME_SHORT from https://moment.github.io/luxon/#/formatting
},
{
    id: '2',
    title: 'Learning NBAD',
    content: 'One of the coolest computer science courses. I can not wait to fully develope a working application. ',
    author: 'Jai Vang',
    //createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id: '3',
    title: 'My Spring Break',
    content: 'I can not wait for a break. I am planning to do lots of sleeping and fishing!!! ',
    author: 'Jai Vang',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
}
];


/**********************************
* function is find stories in array 
***********************************/

//exports.find = () => stories; 
// exports.find = function() {
//     return stories;
// }



/*************************************************
* Looking for stories in the array that has matching id
**************************************************/

//exports.findById = id => stories.find(story=>story.id ===id);
// exports.findById = function(id) {
//     return stories.find(story=>story.id === id);
// }





