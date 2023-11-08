const apiKey = "993f8c3469264deaac95d10405df645f"; // Thay YOUR_NEWS_API_KEY bằng API Key của bạn
const pageSize = 10; // Số lượng bài viết trên mỗi trang
let currentPage = 1; // Trang hiện tại

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayNews();

  document.getElementById("btn-prev").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndDisplayNews();
    }
  });

  document.getElementById("btn-next").addEventListener("click", () => {
    currentPage++;
    fetchAndDisplayNews();
  });
});

async function fetchAndDisplayNews() {
  const newsContainer = document.getElementById("news-container");
  const pageNum = document.getElementById("page-num");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  // Gọi API để lấy dữ liệu tin tức
  const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;
  // const url = `GET https://newsapi.org/v2/everything?q=bitcoin&apiKey=993f8c3469264deaac95d10405df645f`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "ok") {
      const articles = data.articles;
      newsContainer.innerHTML = ""; // Xóa tin tức cũ

      // Hiển thị tin tức lên trang
      articles.forEach((article) => {
        const card = document.createElement("div");
        card.className = "card flex-row flex-wrap";
        card.innerHTML = `
          <div class="card mb-3" style="">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${article.urlToImage}" class="card-img" alt="${article.title}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${article.title}</h5>
                  <p class="card-text">${article.description}</p>
                  <a href="${article.url}" class="btn btn-primary" target="_blank">View</a>
                </div>
              </div>
            </div>
          </div>
        `;
        newsContainer.appendChild(card);
      });

      // Hiển thị số trang và điều hướng trang
      pageNum.textContent = currentPage;
      btnPrev.disabled = currentPage <= 1;
      btnNext.disabled = currentPage * pageSize >= data.totalResults;
    } else {
      console.error("API returned an error:", data.message);
    }
  } catch (error) {
    console.error("An error occurred while fetching news:", error);
  }
}
