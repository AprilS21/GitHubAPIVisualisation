async function main(){
console.log("testing js1234");
let url = `https://api.github.com/users/AprilS21`;

var info = await getRequest(url, "AprilS21");
console.log(info);
let name = document.getElementById('test');
name.innerHTML = `<b>Name9: </b>${info.login}`;

url = `https://api.github.com/users/AprilS21/repos`
var repo = await getRequest(url, "AprilS21");
console.log(repo);

name = document.getElementById('test2');
 for(i in repo){
    name.innerHTML='Repo id111: ' +repo[i].id; 
    console.log(repo[i].id);
} 
url = `https://api.github.com/repos/AprilS21/lowestCommonAncestor/commits`
var commits = await getRequest(url, "AprilS21");
console.log(commits);


//w3schools
var xValues = [50,60,70,80,90,100,110,120,130,140,150];
var yValues = [7,8,8,9,9,9,10,11,14,14,15];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});
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