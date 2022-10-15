const client = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { response } = require("express");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    const subscribingUser = { firstName: firstName, lastName: lastName, email: email }
    const run = async() => {
        const response = await client.lists.addListMember("4afd565b63", {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }

        });
        console.log(response); // (optional)
        run();
    }
    client.setConfig({
        apiKey: "e24460e7779034c712adccfe862a49d3-us10",
        server: "us10",

    })
    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    } else {
        res.send(__dirname + "/failure.html")
    }

})
app.post("/failure", function(req, res) {
        res.redirect("/")
    })
    // app.post("/", function(req, res) {
    //     const firstName = req.body.fName;
    //     const lastName = req.body.lName;
    //     const email = req.body.email;

//     const data = {
//         members: [
//             email_address: "email",
//             status: "subscribed",
//             merge_fields: {
//                 FNAME: firstName,
//                 LNAME: lastName,
//             }

//         ]
//     }
// const jsonData = JSON.stringify(data);
// const url = "https://us10.api.mailchimp.com/3.0/lists/4afd565b63"
// const options = {
//     method: "POST",
//     auth: "anastasiia1:e24460e7779034c712adccfe862a49d3-us10"
// }



//     const request = https.request(url, options, function(response) {
//         response.on("data", function(data) {
//             console.log(JSON.parse(data));
//         })
//     })
//     request.write(jsonData);
//     request.end();

// })

// API
// e24460e7779034c712adccfe862a49d3-us10
// Audience ID: 4afd565b63

app.listen(1717, function() {
    console.log("Server running on port 1717.")
})