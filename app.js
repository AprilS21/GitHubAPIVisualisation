async function main(){

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

const headers = {
  'Authorization': `Token ${token}`
}
let response  = await fetch(url,{
    "method": "GET",
    "your_username": token
})
.then(response=> response.json());
console.log(response);
data = response
return data
}

async function drawBarChart(repo, token,auth){

var xValues =[];
var yValues =[];
var data = [];
var commit;
var url = "https://api.github.com/repos/"+token;

for(i in repo){
    commit = await getRequest(url + "/"+repo[i].name+"/commits", auth).catch(error => console.error(error));
    xValues.push(repo[i].name);
    yValues.push(commit.length);
    data.push(commit);
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
  drawPieCharts(data);
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

async function drawPieCharts (repo){
 // var xValues = [];
  //var yValues = [];
  var dataArray = [];
  var name;
  console.log(repo);
  if(repo.length > 0){console.log("has elements");}
  for(i in repo){
    for(j in repo[i]){
      //var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
      //var yValues = [55, 49, 44, 24, 15];
     try{
      
        name =repo[i][j].author['login'];;
      
    }catch{name = "unknown";}
    if(!xValues.includes(name)){xValues.push(name);}
    var index = xValues.findIndex(name);
    var x = yValues[index];
    x = x+1;
    yValues[index]=x;
    }
      var barColors = [
        "#b91d47",
        "#00aba9",
        "#2b5797",
        "#e8c3b9",
        "#1e7145"
      ];
      
      new Chart("myChart3", {
        type: "pie",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: true,
            text: "Users committed to your repos"
          }
        }
      });
    
  }
}



