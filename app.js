const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const ITEM_URL = "https://api.hnpwa.com/v0/item/@id.json";
const rootEl = document.getElementById("root");
const store = {
  currentPage: 1,
};

function ajaxFunc(url) {
  ajax.open("GET", url, false);
  ajax.send();
  return JSON.parse(ajax.response);
}

const newsFeedFunc = () => {
  const newsFeed = ajaxFunc(NEWS_URL);
  let newFeedAry = ["<ul>"];
  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newFeedAry.push(`
  <li>
  <a href=#/show/${newsFeed[i].id}>
  ${newsFeed[i].title} (${newsFeed[i].comments_count})
  <a>
  </li>
  `);
  }
  newFeedAry.push("</ul>");
  newFeedAry.push(`
    <div>
      <a href=#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}>
      이전으로
      </a>
      <a href=#/page/${
        store.currentPage < newsFeed.length / 10
          ? store.currentPage + 1
          : newsFeed.length / 10
      }>
      다음으로
      </a>
    </div>
  `);
  rootEl.innerHTML = newFeedAry.join("");
};

const itemFeedFunc = () => {
  const id = location.hash.substr(7);
  const itemFeed = ajaxFunc(ITEM_URL.replace("@id", id));
  rootEl.innerHTML = `
    <h1>${itemFeed.title}</h1>

    <div><a href=#/page/${store.currentPage}>목록으로</a></div>
  `;
};

const router = () => {
  const routePath = location.hash;
  if (routePath === "") newsFeedFunc();
  else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeedFunc();
  } else itemFeedFunc();
};

window.addEventListener("hashchange", router);
router();
