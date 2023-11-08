document.addEventListener("DOMContentLoaded", () => {
  const inputQuery = document.getElementById("input-query");
  const btnSubmit = document.getElementById("btn-submit");
  const newsContainer = document.getElementById("news-container");
  const navPageNum = document.getElementById("nav-page-num");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const pageNum = document.getElementById("page-num");

  const PAGE_SIZE = 10; // Số lượng bài viết trên mỗi trang
  let currentPage = 1;
  let totalResults = 0;
  let currentKeyword = "";

  btnSubmit.addEventListener("click", () => {
    const keyword = inputQuery.value.trim();

    if (keyword === "") {
      alert("Please enter a keyword to search.");
      return;
    }

    currentKeyword = keyword;
    currentPage = 1;

    searchNews(currentKeyword, currentPage);
  });

  btnPrev.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      searchNews(currentKeyword, currentPage);
    }
  });

  btnNext.addEventListener("click", () => {
    if (currentPage * PAGE_SIZE < totalResults) {
      currentPage++;
      searchNews(currentKeyword, currentPage);
    }
  });

  function searchNews(keyword, page) {
    // Gọi API tìm kiếm bài viết
    const apiKey = "993f8c3469264deaac95d10405df645f";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${PAGE_SIZE}&page=${currentPage}&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        totalResults = data.totalResults;
        pageNum.innerText = currentPage;
        displayNews(data.articles);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }

  function displayNews(articles) {
    newsContainer.innerHTML = "";

    if (articles.length === 0) {
      newsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    articles.forEach((article) => {
      const newsItem = document.createElement("div");
      newsItem.classList.add("news-item");
      newsItem.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
      newsContainer.appendChild(newsItem);
    });

    if (currentPage === 1) {
      btnPrev.classList.add("disabled");
    } else {
      btnPrev.classList.remove("disabled");
    }

    if (currentPage * PAGE_SIZE >= totalResults) {
      btnNext.classList.add("disabled");
    } else {
      btnNext.classList.remove("disabled");
    }

    navPageNum.classList.remove("hide");
  }
});
