// User model
const user_info = require("../models/user_info");

class info {
    constructor(name) {
        this.name = name
    }

    async getName (email) {
        var result;
        await user_info.findOne({ email: email })  // email found
        .then(user => { 
        // console.log(email);
        // console.log(user);
         console.log(user.name)
            result = user.name;   // return name
        })
        .catch(err => console.log(err));

        return result;
    }
}
var obj = new info(5);
async function printName(){
    var name = await obj.getName("wang1111@purdue.edu");
    console.log("Name received is: ");
    console.log(name);
}


module.exports = info;

// read name of a user
// use wang1111@purdue.edu as parameter for testing
// expected result should be 'bsdcfwe'
// exports.getName = async (email) => {
    
//     var name = "nothing";

//     await User.findOne({ email: email })  // email found
//     .then(user => { 
//         // console.log(email);
//         // console.log(user);
//         // console.log(user.name)
//         name = user.name;   // return name
//     })
//     .catch(err => console.log(err));

//     return name; 
// }

// exports.math = function(a) {
//     a.name = 10;
// }