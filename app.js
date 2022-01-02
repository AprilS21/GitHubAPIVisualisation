//takes user input, does a get request and calls chart drawing functions
async function main(){

var canvas = document.getElementById('myChart');
var context = canvas.getContext('2d');
context.clearRect(0, 0, canvas.width, canvas.height);
canvas = document.getElementById('myChart2');
context = canvas.getContext('2d');
context.clearRect(0, 0, canvas.width, canvas.height);
canvas = document.getElementById('myChart3');
context = canvas.getContext('2d');
context.clearRect(0, 0, canvas.width, canvas.height);
canvas = document.getElementById('myChart4');
context = canvas.getContext('2d');
context.clearRect(0, 0, canvas.width, canvas.height);


var username = document.getElementById("userName").value;
if(username==""){username = "AprilS21";}
var repoInput = document.getElementById("repoInput").value;
var tokenInput = document.getElementById("authInput").value;
if(tokenInput==""){tokenInput = username;}
let url = `https://api.github.com/users/`+ username;


var info = await getRequest(url, tokenInput).catch(error => console.error(error));
console.log(info);

let image = document.getElementById('image');
image.src=info.avatar_url;
let nameLogin = document.getElementById('login');
nameLogin.innerHTML = `<b>Login: </b>${info.login}`;
let name = document.getElementById('name');
name.innerHTML = `<b>Name: </b>${info.name == null ? 'Not Found' : info.name}`;
let urlUser = document.getElementById('url');
urlUser.innerHTML = `<b>URL: </b>${info.html_url == null ? 'Not Found' : info.html_url}`;
let location = document.getElementById('location');
location.innerHTML = `<b>Location: </b>${info.location == null ? 'Not Found' : info.location}`;
let blog = document.getElementById('blog');
blog.innerHTML = `<b>Blog: </b>${info.blog == "" ? 'Not Found' : info.blog}`;



url = 'https://api.github.com/users/' + username + '/repos';
var repo = await getRequest(url, tokenInput).catch(error => console.error(error));


await drawBarChart(repo, username,tokenInput);
await drawDonutChart(repo, username,tokenInput);
await drawLineChart(username, repoInput,tokenInput);
}



//function for requests to github API
async function getRequest(url, token) {

var data;

let response  = await fetch(url,{
    "method": "GET",
    'headers': {
      'Authorization': `token ${token}` 
    }
})
.then(response=> response.json());
console.log(response);
data = response;
return data
}

//draws barchart of commits per repo
async function drawBarChart(repo, name,token){

var xValues =[];
var yValues =[];
var data = [];
var commit;
var url = "https://api.github.com/repos/"+name;

for(i in repo){
    commit = await getRequest(url + "/"+repo[i].name+"/commits", token).catch(error => console.error(error));
    xValues.push(repo[i].name);
    yValues.push(commit.length);
    data.push(commit); // storing the data for piechart function
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
        text: "Commits per Repository"
      },
      layout: {
        padding: {
          left: 50
        }
      }
    }
  });
  drawPieCharts(data); //calls function to draw piechart
}

//draws line chart of the number of commits to a given repo in the last year
async function drawLineChart(name, request,token){
    var url ="https://api.github.com/repos/"+name;
    var xValues = [];
    var yValues = [];

    commit = await getRequest(url + "/"+request+"/stats/participation",token).catch(error => console.error(error));
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
          text: "Commits in " + request + " per week during the last year"
        },
        scales: {
          yAxes: [{ticks: {min: 0, max: Math.max(...yValues)==0? 5 : Math.max(...yValues)}}],
          y: {
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return 'Week' + value;
                }
            }
        }
      }
    }
    });

}

//draws piechart of the different users that have committed to the repos
async function drawPieCharts (repo){
  var xValues = [];
  var yValues = [];
  var barColors=[];
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
    if(!xValues.includes(name)){
      xValues.push(name);
      yValues.push(0);
      barColors.push(getRandomColor());
    }
    var index = xValues.indexOf(name);
    var x = yValues[index];
    x = x+1;
    yValues[index]=x;
  }
    }
      
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

//draws donut chart of the number of repos in each language
async function drawDonutChart(repo, name,token){
  var xValues=[];
  var yValues=[];
  var barColors=[];

  for(i in repo){
    if(!xValues.includes(repo[i].language)){
      xValues.push(repo[i].language);
      yValues.push(0);
      barColors.push(getRandomColor());
    }
    var index = xValues.indexOf(repo[i].language);
    var x = yValues[index];
    x = x+1;
    yValues[index]=x;
  }
  
  new Chart("myChart4", {
    type: "doughnut",
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
        text: "Languages"
      }
    }
  });

}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


