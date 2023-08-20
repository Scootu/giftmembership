// change avatar radio input
const orderContainerComponent = document.querySelector(".membership");
const labelContainerButton = document.querySelectorAll(".price_input_rapper");
const allAvatares = document.querySelectorAll(".checked_avatar");
const btnOrderPage = document.querySelector(".price-list-btn");
// const inputAvatar = document.querySelectorAll(".checked_avatar");
//payment section
const paymentContainerComponent = document.querySelector(".payment");
function changeInputAvatar(labelContainer) {
  labelContainer.forEach((item) => {
    item.addEventListener("click", () => {
      deleteAllAvatarSelection();
      item.firstElementChild.firstElementChild.classList.toggle("hidden");
      btnOrderPage.classList.remove("not-selected");
    });
  });
}
function deleteAllAvatarSelection() {
  allAvatares.forEach((item) => {
    item.classList.add("hidden");
  });
}
function addEventListenerTobtnOrder() {
  btnOrderPage.addEventListener("click", () => {
    if (!btnOrderPage.classList.contains("not-selected")) {
      btnOrderPage.firstElementChild.textContent = "Loading...";
      btnOrderPage.lastElementChild.classList.remove("hidden");
      setTimeout(changeToPaymentFormComponent, 4000);
    }
  });
}
function changeToPaymentFormComponent() {
  orderContainerComponent.classList.add("translate");
  paymentContainerComponent.classList.remove("translate");
}
// //run eventListener
// change the input avatar
changeInputAvatar(labelContainerButton);
//get data Submiting form order
addEventListenerTobtnOrder();
