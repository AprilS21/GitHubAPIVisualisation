Install Docker

clone this repository

Run command: 

cd GitHubAPI

Build docker image command: 

docker build -t githubapi .

Run container command:

docker run -d --name githubapi -p 80:80 githubapi

Go to localhost:80 to visit site.
