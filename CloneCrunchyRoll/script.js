const naviguer = document.getElementById("liNaviguer");
const news = document.getElementById("news");
const naviguerMore = document.getElementById("naviguerMore");
const newsMore = document.getElementById("newsMore");

naviguer.addEventListener("click", () => {
    naviguer.classList.toggle("active");
    naviguerMore.classList.toggle("naviguerVisible");
});
news.addEventListener("click", () => {
    news.classList.toggle("active");
    newsMore.classList.toggle("newsVisible");
});