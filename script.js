const url_api = "https://api.github.com/users/";

const main = document.querySelector("main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

getGitData("bidyut-sikder");


async function getGitData(userName) {
console.log(url_api+userName)
  const resp = await fetch(url_api + userName);
  const respData = await resp.json();
  //console.log(respData)
  showData(respData);
  anotherIpData(userName);
}

async function anotherIpData(userName) {

  console.log(url_api+userName+"/repos")

  const resp = await fetch(url_api + userName + "/repos");
  const respData = await resp.json();
  //console.log(respData);
  interInto(respData);
}

function showData(ipData) {
console.log(ipData.public_repos)
  const dataHTML = `
           <div class="myDiv"> 
          <div class="item1">
          <h2>${ipData.login}</h2>
          <h2> Total Repos ${ipData.public_repos}</h2>
          <img class="myPhoto" src="${ipData.avatar_url}" alt="">
          <h2>${ipData.name}</h2>
          <h2>${ipData.bio}</h2>
          </div>
          <div class="item2"></div>
          </div>


             `;

  main.innerHTML = dataHTML;

  return dataHTML;
}

function interInto(data) {
// console.log(data)
  const setitem = document.querySelector(".item2");
  const total = `
<h2>Check Out Repositories </h2>
`;
  setitem.innerHTML = total;
  data.forEach((e) => {
    const createEl = document.createElement("a");
    createEl.classList.add("myTag");
    createEl.innerText = e.name;
    createEl.href = e.html_url;
    createEl.target = "/blank";

    setitem.appendChild(createEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchVal = search.value;

  if (searchVal) {
    getGitData(searchVal);
    search.value = "";
  } else {
    alert("Not Found");
  }
});
