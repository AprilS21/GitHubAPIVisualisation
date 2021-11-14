console.log("testing js1234");
let url = `https://api.github.com/users/AprilS21`;

getRequest(url, "AprilS21")

async function getRequest(url, token) {

let object = await fetch(url,{
    "method": "GET",
    "user-agent": token
});

console.log(object.json());
}