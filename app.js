async function main(){
console.log("testing js1234");
let url = `https://api.github.com/users/AprilS21`;

var info = await getRequest(url, "AprilS21");
console.log(info);
let name = document.getElementById('test');
name.innerHTML = `<b>Name7: </b>${info.login}`;

url = `https://api.github.com/users/AprilS21/repos`
var repo = await getRequest(url, "AprilS21");
console.log(repo);

name = document.getElementById('test2');
 for(i in repo){
    name.innerHTML='Repo id: ' +repo[i].id; 
    console.log(repo[i].id);
} 
}




async function getRequest(url, token) {

/* let result = await fetch(url,{
    "method": "GET",
    "user-agent": token
}); */
var data;

let response  = await fetch(url,{
    "method": "GET",
    "user-agent": token
})
.then(response=> response.json());

console.log(response);

//console.log(object.json());

//var info = object.json();
data = response
return data

}