async function main(){
console.log("testing js1234");

var username = document.getElementById("userName").value;
if(username==""){username = "AprilS21";}
var repoInput = document.getElementById("repoInput").value;
var tokenInput = document.getElementById("authInput").value;
if(tokenInput==""){tokenInput = username;}
let url = `https://api.github.com/users/`+ username;

var info = await getRequest(url, tokenInput).catch(error => console.error(error));
console.log(info);
let name = document.getElementById('login');
name.innerHTML = `<b>Name: </b>${info.login}`;

let image = document.getElementById('image');
image.src=info.avatar_url;

url = 'https://api.github.com/users/' + username + '/repos';
var repo = await getRequest(url, tokenInput).catch(error => console.error(error));


await drawBarChart(repo, username);
await drawLineChart(repo,username, repoInput,tokenInput);
}




async function getRequest(url, token) {

var data;
let response  = await fetch(url,{
    "method": "GET",
    "Authorization": "Token " + token
})
.then(response=> response.json());
console.log(response);
data = response
return data
}

async function drawBarChart(repo, token,auth){
/* var xValues = [50,60,70,80,90,100,110,120,130,140,150];
var yValues = [7,8,8,9,9,9,10,11,14,14,15]; */

var xValues =[];
var yValues =[];
var commit;
var url = "https://api.github.com/repos/"+token;

for(i in repo){
    commit = await getRequest(url + "/"+repo[i].name+"/commits", auth).catch(error => console.error(error));
    xValues.push(repo[i].name);
    yValues.push(commit.length);
}

new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: "blue",
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

async function drawLineChart(repo, token, request,auth){
    var url ="https://api.github.com/repos/"+token;
    var xValues = [];
    var yValues = [];

    commit = await getRequest(url + "/"+request+"/stats/participation",auth).catch(error => console.error(error));
        for(j in commit.all){
            yValues.push(commit.all[j]);
            xValues.push(j);
        }
      //  console.log(commit.count);
    console.log(yValues+"array!!222222")

    new Chart("myChart2", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,
          lineTension: 0,
          backgroundColor: "rgb(51, 204, 51)",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
        title:{
          display:true,
          text: "Commits per week in " + request
        },
        scales: {
          yAxes: [{ticks: {min: 0, max: Math.max(...yValues)}}],
        }
      }
    });

}



