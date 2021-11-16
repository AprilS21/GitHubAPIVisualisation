async function main(){
console.log("testing js1234");

var username = document.getElementById("userName").value;
if(username==""){username = "AprilS21";}
var repoInput = document.getElementById("repoInput").value;
let url = `https://api.github.com/users/`+ username;

var info = await getRequest(url, username);
console.log(info);
let name = document.getElementById('login');
name.innerHTML = `<b>Name: </b>${info.login}`;

let image = document.getElementById('image');
image.src=info.avatar_url;

url = 'https://api.github.com/users/' + username + '/repos';
var repo = await getRequest(url, username);
//console.log(repo);

/* name = document.getElementById('test2');
 for(i in repo){
    name.innerHTML='Repo id111: ' +repo[i].id; 
    console.log(repo[i].id);
}  */
/* url = `https://api.github.com/repos/AprilS21/lowestCommonAncestor/commits`
var commits = await getRequest(url, "AprilS21");
console.log(commits); */

await drawBarChart(repo, username);
await drawLineChart(repo,username, repoInput);
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

async function drawBarChart(repo, token){
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

async function drawLineChart(repo, token, request){
    var url ="https://api.github.com/repos/"+token;
    var xValues = [];
    var yValues = [];

    commit = await getRequest(url + "/"+request+"/stats/participation");
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
          backgroundColor: "rgba(0,0,255,1.0)",
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



