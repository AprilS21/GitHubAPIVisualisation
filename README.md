# Github API Visualisation

This project displays visualisations of data retrieved from the GitHub API.
**A Personal Access Token is required**

- It displays the username, name, URL, location, blog and picture of the user.
- It draws a barchart of the commits in each of the users repositories.
- It draws a line chart of the number of commits per week in the last year in the given repository.
- It draws a piechart of all the different users that have committed to the given users repositories.
- It draws a donutchart of the languages used in the users repositories.

### Instructions to run 
Install Docker

clone this repository

Run command: **cd GitHubAPI**

Build docker image command: **docker build -t githubapi .** 

Run container command: **docker run -d --name githubapi -p 80:80 githubapi**

Go to localhost:80 to visit site.
