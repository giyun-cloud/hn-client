const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const ITEM_URL = "https://api.hnpwa.com/v0/item/@id.json";

function ajaxFunc(url) {
  ajax.open("GET", url, false);
  ajax.send();
  return JSON.parse(ajax.response);
}
const newsFeed = ajaxFunc(NEWS_URL);

const rootEl = document.getElementById("root");
const ul = document.createElement("ul");
const itemDiv = document.createElement("div");
const title = document.createElement("h3");

window.addEventListener("hashchange", () => {
  const id = location.hash.substr(1);
  const itemFeed = ajaxFunc(ITEM_URL.replace("@id", id));
  title.innerHTML = itemFeed.title;
});

for (let i = 0; i < newsFeed.length; i++) {
  const div = document.createElement("div");
  div.innerHTML = `
    <li>
      <a href=#${newsFeed[i].id}>
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      <a>
    </li>
  `;

  ul.appendChild(div.firstElementChild);
}

itemDiv.appendChild(title);
rootEl.appendChild(ul);
rootEl.appendChild(itemDiv);
