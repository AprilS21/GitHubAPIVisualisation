async function main(){
console.log("testing js1234");
let url = `https://api.github.com/users/AprilS21`;

var info = await getRequest(url, "AprilS21");
console.log(info);
let name = document.getElementById('test');
name.innerHTML = `<b>Name2: </b>${info.login}`;

url = `https://api.github.com/users/AprilS21/repos`
var repo = await getRequest(url, "AprilS21");
console.log(repo);

name = document.getElementById('test2');
 for(i in repo){
    name.innerHTML='Repo id111: ' +repo[i].id; 
    console.log(repo[i].id);
} 
/* url = `https://api.github.com/repos/AprilS21/lowestCommonAncestor/commits`
var commits = await getRequest(url, "AprilS21");
console.log(commits); */

drawLineChart(repo, "AprilS21");
}




async function getRequest(url, token) {

var data;
let response  = await fetch(url,{
    "method": "GET",
    "user-agent": token
})
.then(response=> response.json());
console.log(response);
data = response
return data
}

async function drawLineChart(repo, token){
/* var xValues = [50,60,70,80,90,100,110,120,130,140,150];
var yValues = [7,8,8,9,9,9,10,11,14,14,15]; */

var xValues =[];
var yValues =[];
var commit;
var url = "https://api.github.com/repos/"+token;

for(i in repo){
    commit = await getRequest(url + "/"+repo[i].name+"/commits");
    xValues.push(repo[i].name);
    yValues.push(commit.length);
}

new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: "red",
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Commits per Repo"
      }
    }
  });
}