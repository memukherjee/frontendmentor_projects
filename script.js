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
        data.forEach((project) => {
            const listItem = document.createElement("li");
            fetch(project.url)
            .then((res) => res.json())
            .then((data) => {
                const image = document.createElement("img");
                image.src = data.find((item) => item.name === "screenshot.png").download_url;
                const link = document.createElement("a");
                link.target = "_blank";
                const readme_url = data.find((item) => item.name === "README.md").download_url;
                fetch(readme_url)
                .then((res) => res.text())
                .then((text) => {
                    const lines = text.split("\n");
                    const urlLine = lines.find((line) =>
                    line.includes("- Live Site URL:")
                    );
                    const urlText = urlLine
                    .split("[LIVE]")[1]
                    const url = urlText.slice(1, urlText.length-1)
                    link.href = url;
                });
                link.appendChild(image);
                link.appendChild(document.createTextNode(project.name));
                listItem.appendChild(link);
                projectList.appendChild(listItem);
            });
        });
    });
