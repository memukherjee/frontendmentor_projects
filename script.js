import { Octokit } from "https://esm.sh/@octokit/rest";

const projectList = document.querySelector(".projects");
const octokit = new Octokit();

const BASE_URL = "https://memukherjee.github.io/frontendmentor_projects";

// List all the directories in the repo
octokit
    .request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: "memukherjee",
        repo: "frontendmentor_projects",
    })
    .then(({ data }) => {
        console.log(data);
        data = data.filter((item) => item.type === "dir");
        data.forEach(project => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            const image = document.createElement("img");
            image.src = `${BASE_URL}/${project.name}/screenshot.png`;
            link.href = `${BASE_URL}/${project.name}`;
            link.appendChild(image);
            link.appendChild(document.createTextNode(project.name));
            listItem.appendChild(link);
            projectList.appendChild(listItem);
        });
    });
