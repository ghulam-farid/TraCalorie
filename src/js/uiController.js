import itemController from "./itemController.js";

const UIController = (function () {
  //Private section
  const ui_selectors = {
    clear_btn: ".clear-btn",
    add_btn: ".add-btn",
    update_btn: ".update-btn",
    delete_btn: ".delete-btn",
    back_btn: ".back-btn",
    confirmed_delete_btn: ".confirmed-delete-btn",
    confirmed_clear_btn: ".confirmed_clear_btn",
    dialog_cancel_btn: ".dialog-cancel-btn",
    dialog_footer: ".modal-footer",
    item_name: "#item-name",
    item_calories: "#item-calories",
    item_list: "#item-list",
    total_calories: ".total-calories",
  };

  const getModal = function () {
    const elems = document.querySelector(".modal");
    const instance = M.Modal.init(elems);
    return instance;
  };

  // Public section
  return {
    getUISelectors: function () {
      return ui_selectors;
    },
    getInputs: function () {
      return {
        name: document.querySelector(ui_selectors.item_name).value,
        calories: document.querySelector(ui_selectors.item_calories).value,
      };
    },
    validateInputs: function () {
      if (
        document.querySelector(ui_selectors.item_name).value.length == 0 ||
        document.querySelector(ui_selectors.item_calories).value.length == 0
      ) {
        return false;
      }
      return true;
    },
    showAlert: function (message, className) {
      M.toast({
        html: message,
        classes: className,
        displayLength: 2000,
      });
    },
    showConfirmDeleteDialog: function (e) {
      e.preventDefault();
      if (e.target.classList.contains("delete-btn")) {
        if (itemController.getCurrentItem() == null) {
          UIController.showAlert("Please select an item", "rounded orange");
        } else {
          document.querySelector(
            ".modal-content"
          ).firstElementChild.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Are you sure you want to delete?`;
          document
            .querySelector(".modal-footer")
            .firstElementChild.classList.add("confirmed-delete-btn");
          getModal().open();
        }
      } else if (e.target.classList.contains("clear-btn")) {
        if (itemController.getItems().length == 0) {
          UIController.showAlert("Nothing to clear", "rounded orange");
        } else {
          document.querySelector(
            ".modal-content"
          ).firstElementChild.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Are you sure you want to clear all items?`;
          document
            .querySelector(".modal-footer")
            .firstElementChild.classList.add("confirmed-clear-btn");
          getModal().open();
        }
      }
    },
    hideConfirmDeleteDialog: function () {
      const modal_footer = document.querySelector(".modal-footer");
      const is_delete_btn = modal_footer.firstElementChild.classList.contains(
        "confirmed-delete-btn"
      );
      const is_clear_btn = modal_footer.firstElementChild.classList.contains(
        "confirmed-clear-btn"
      );
      if (is_delete_btn || is_clear_btn) {
        document
          .querySelector(".modal-footer")
          .firstElementChild.classList.remove("confirmed-delete-btn");
        document
          .querySelector(".modal-footer")
          .firstElementChild.classList.remove("confirmed-clear-btn");
      }
      getModal().close();
    },
    clearEditState: function () {
      document.querySelector(ui_selectors.add_btn).style.display = "inline";
      document.querySelector(ui_selectors.update_btn).style.display = "none";
      document.querySelector(ui_selectors.delete_btn).style.display = "none";
      document.querySelector(ui_selectors.back_btn).style.display = "none";
    },
    showEditState: function () {
      document.querySelector(ui_selectors.add_btn).style.display = "none";
      document.querySelector(ui_selectors.update_btn).style.display = "inline";
      document.querySelector(ui_selectors.delete_btn).style.display = "inline";
      document.querySelector(ui_selectors.back_btn).style.display = "inline";
    },
    clearInputs: function () {
      document.querySelector(ui_selectors.item_name).value = "";
      document.querySelector(ui_selectors.item_calories).value = "";
    },
    addListItem: function (item) {
      document.querySelector(ui_selectors.item_list).style.display = "block";
      const li = document.createElement("li");
      li.classList.add("collection-item");
      li.id = `item-${item.id}`;
      li.innerHTML = `
      <strong>${item.name}: </strong><em>${item.calories} Calories</em
      ><a href="#" class="secondary-content"
        ><i class="edit-item fa-solid fa-pencil"></i
      ></a>
      `;
      document
        .querySelector(ui_selectors.item_list)
        .insertAdjacentElement("beforeend", li);
    },
    updateListItem: function (item) {
      const li = document.querySelector(`#item-${item.id}`);
      li.firstElementChild.innerHTML = `${item.name}: `;
      li.firstElementChild.previousSibling.innerHTML = `${item.calories} Calories`;
    },
    deleteListItem: function (id) {
      const li = document.querySelector(`#item-${id}`);
      li.remove();
    },
    clearAllItems: function () {
      document.querySelector(ui_selectors.item_list).innerHTML = "";
    },
    populateItemList: function (items) {
      let html = "";
      items.forEach((item) => {
        html += `
         <li class="collection-item" id="item-${item.id}">
         <strong>${item.name}: </strong><em>${item.calories} Calories</em
         ><a href="" class="secondary-content"
           ><i class="edit-item fa-solid fa-pencil"></i
         ></a>
       </li>
         `;
      });
      document.querySelector(ui_selectors.item_list).innerHTML = html;
    },
    hideList: function () {
      document.querySelector(ui_selectors.item_list).style.display = "none";
    },
    showTotalCalories: function (total_calories) {
      document.querySelector(ui_selectors.total_calories).textContent =
        total_calories;
    },
    addItemToForm: function () {
      document.querySelector(ui_selectors.item_name).value =
        itemController.getCurrentItem().name;
      document.querySelector(ui_selectors.item_calories).value =
        itemController.getCurrentItem().calories;
    },
  };
})();

export default UIController;
