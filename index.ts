import { offsetPercent, pageData, totalPages } from "./data";

// state of the webapp
let currentPage: number = 0,
  img: HTMLElement,
  companyInfo: HTMLElement,
  stepper: HTMLElement,
  splashScreen: HTMLElement,
  homePage: HTMLElement,
  pageInfo: HTMLElement,
  pager: HTMLElement;

// Slower network management
document.addEventListener("DOMContentLoaded", () => {
  const monk = document.querySelector(".monk");
  const text1 = document.querySelector(".monk-text-1");
  const text2 = document.querySelector(".monk-text-2");
  const loader = document.querySelector(".loader");

  monk.addEventListener("load", () => {
    loader.remove();
    monk.classList.add("appear");
    text1.classList.add("appear");
    text2.classList.add("appear");
    onPageMount();
  });
});

// On inital load of the page
function onPageMount() {
  img = document.getElementById("mainImg");
  companyInfo = document.getElementById("companyInfo");
  stepper = document.getElementById("stepper");
  splashScreen = document.querySelector(".home-splash");
  homePage = document.querySelector("#homePage");
  pageInfo = document.querySelector("#pageInfo");
  pager = document.querySelector("#pager");

  let fragment: DocumentFragment = document.createDocumentFragment();
  for (let i = 1; i <= totalPages; i++) {
    const div: HTMLElement = document.createElement("div");
    div.classList.add("page-info");
    div.classList.add("info-" + i);
    if (pageData[i - 1][1] === "right") {
      div.classList.add("right");
    }
    div.innerHTML = pageData[i - 1][0];
    fragment.appendChild(div);
  }
  pageInfo.appendChild(fragment);

  for (let i = 0; i <= totalPages + 1; i++) {
    const div: HTMLElement = document.createElement("div");
    const innerDiv: HTMLElement = document.createElement("div");
    if (i === 0) {
      innerDiv.classList.add("selected");
    }
    innerDiv.dataset.type = "page";
    innerDiv.id = "page" + i;
    innerDiv.textContent = i < 1 || i > totalPages ? "" : String(i);
    div.appendChild(innerDiv);
    fragment.appendChild(div);
  }
  pager.appendChild(fragment);

  setTimeout(() => {
    splashScreen.classList.add("hide");
    homePage.classList.remove("hide");
  }, 6500);

  companyInfo.style.width = (2 * window.innerWidth) / 3 + "px";
  companyInfo.style.transform = `translateX(${(2 * window.innerWidth) / 3}px)`;
  homePage.addEventListener("click", onClickHandler);

  companyInfo.style.width = (2 * window.innerWidth) / 3 + "px";
  companyInfo.style.transform = `translateX(${(2 * window.innerWidth) / 3}px)`;
  homePage.addEventListener("click", onClickHandler);
}

function onClickHandler(event: any): void {
  if (event.target.getAttribute("data-type") === "page") {
    if (updateStepper(+event.target.id.split("page")[1])) {
      currentPage = +event.target.id.split("page")[1];
      setPageNumberToHolder(currentPage);
      displayPageMark(currentPage);
    }
  } else if (event.target.id === "arrowLeft") {
    if (updateStepper(currentPage - 1)) {
      currentPage = currentPage - 1;
      setPageNumberToHolder(currentPage);
      displayPageMark(currentPage);
    }
  } else if (event.target.id === "arrowRight") {
    if (updateStepper(currentPage + 1)) {
      currentPage = currentPage + 1;
      setPageNumberToHolder(currentPage);
      displayPageMark(currentPage);
    }
  }
}

function setPageNumberToHolder(pageNo: number): void {
  document.getElementById("bgImgHolder").dataset.page = String(pageNo);
}

function updateStepper(pageNo: number): boolean {
  if (pageNo === 0) {
    stepper.style.display = "none";
    companyInfo.style.transform = `translateX(${(2 * window.innerWidth) / 3}px)`;
    img.style.transform = `translateX(0px)`;
    return true;
  } else if (pageNo === 9) {
    stepper.style.display = "none";
    img.style.transform = `translateX(${getLastPageOffset() - (2 * window.innerWidth) / 3}px)`;
    companyInfo.style.transform = "translateX(0px)";
    return true;
  } else if (pageNo === 7 || pageNo === 8) {
    stepper.textContent = `Step ${pageNo} out of 8 on the path of enlightenment`;
    companyInfo.style.transform = `translateX(${(2 * window.innerWidth) / 3}px)`;
    img.style.transform = `translateX(${getLastPageOffset()}px)`;
    stepper.style.display = "block";
    return true;
  } else if (pageNo > 0 && pageNo < 9) {
    stepper.textContent = `Step ${pageNo} out of 8 on the path of enlightenment`;
    companyInfo.style.transform = `translateX(${(2 * window.innerWidth) / 3}px)`;
    img.style.transform = `translateX(${offsetPercent[pageNo]})`;
    stepper.style.display = "block";
    return true;
  } else {
    return false;
  }
}

function getLastPageOffset(): number {
  return window.innerWidth - img.clientWidth;
}

function displayPageMark(pageNo: number): void {
  document.querySelector(".selected")?.classList.remove("selected");
  document.getElementById("page" + pageNo).classList.add("selected");
}
