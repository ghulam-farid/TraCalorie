import UIController from "./uiController.js";
import itemController from "./itemController.js";
import storageController from "./storageController.js";

const App = (function (UIController, itemController, storageController) {
  // private methods
  const loadEventListeners = function () {
    document
      .querySelector(UIController.getUISelectors().add_btn)
      .addEventListener("click", addItemHandler);

    document.addEventListener("keypress", function (e) {
      if (e.keyCode == 13 || e.which == 13) {
        e.preventDefault();
        return false;
      }
    });

    document
      .querySelector(UIController.getUISelectors().item_list)
      .addEventListener("click", eidtItemHandler);

    document
      .querySelector(UIController.getUISelectors().update_btn)
      .addEventListener("click", updateItemHandler);

    document
      .querySelector(UIController.getUISelectors().delete_btn)
      .addEventListener("click", UIController.showConfirmDeleteDialog);

    document
      .querySelector(UIController.getUISelectors().clear_btn)
      .addEventListener("click", UIController.showConfirmDeleteDialog);

    document
      .querySelector(UIController.getUISelectors().dialog_footer)
      .addEventListener("click", deleteItemHandler);

    document
      .querySelector(UIController.getUISelectors().dialog_footer)
      .addEventListener("click", clearAllItemsHandler);

    document
      .querySelector(UIController.getUISelectors().dialog_cancel_btn)
      .addEventListener("click", cancelDialogHandler);

    document
      .querySelector(UIController.getUISelectors().back_btn)
      .addEventListener("click", backBtnHandler);
  };

  const addItemHandler = function (e) {
    e.preventDefault();
    if (
      UIController.getInputs().name.length == 0 ||
      UIController.getInputs().calories.length == 0
    ) {
      UIController.showAlert("Please fill in the field", "rounded orange");
    } else {
      const new_item = itemController.addItem(
        UIController.getInputs().name,
        UIController.getInputs().calories
      );
      UIController.addListItem(new_item);
      storageController.storeItem(new_item);
      const total_calories = itemController.getTotalCalories();
      UIController.showTotalCalories(total_calories);
      UIController.showAlert("Item added", "rounded green");
      UIController.clearInputs();
    }
  };

  const eidtItemHandler = function (e) {
    if (e.target.classList.contains("edit-item")) {
      const id = e.target.parentNode.parentNode.id.split("-")[1];
      const item = itemController.getItemById(id);
      itemController.setCurrentItem(item);
      UIController.addItemToForm();
      UIController.showEditState();
    }
    e.preventDefault();
  };

  const updateItemHandler = function (e) {
    e.preventDefault();
    if (!UIController.validateInputs()) {
      UIController.showAlert("Please fill in the field", "rounded orange");
    } else if (itemController.getCurrentItem() == null) {
      UIController.showAlert("Please select an item", "rounded orange");
    } else {
      const updated_item = itemController.updateItem(
        UIController.getInputs().name,
        UIController.getInputs().calories
      );
      storageController.updateStorageItem(updated_item);
      UIController.updateListItem(updated_item);
      itemController.setCurrentItem(null);
      UIController.clearInputs();
      UIController.clearEditState();
      const total_calories = itemController.getTotalCalories();
      UIController.showTotalCalories(total_calories);
      UIController.showAlert("Item updated", "rounded green");
    }
  };

  const deleteItemHandler = function (e) {
    e.preventDefault();
    if (e.target.classList.contains("confirmed-delete-btn")) {
      const item = itemController.getCurrentItem();
      itemController.deleteItem(item.id);
      storageController.deleteItemFromStorage(item.id);
      UIController.deleteListItem(item.id);
      UIController.clearInputs();
      UIController.clearEditState();
      UIController.showAlert("Item deleted", "rounded green");
    }
  };

  const clearAllItemsHandler = function (e) {
    e.preventDefault();

    if (e.target.classList.contains("confirmed-clear-btn")) {
      itemController.clearAllItems();
      storageController.clearAllItemsFromStorage();
      UIController.clearAllItems();
      UIController.clearInputs();
      UIController.clearEditState();
      UIController.hideList();
      UIController.showAlert("All items deleted", "rounded green");
    }
  };

  const backBtnHandler = function (e) {
    UIController.clearEditState();
    itemController.setCurrentItem(null);
    UIController.clearInputs();
    e.preventDefault();
  };

  const cancelDialogHandler = function (e) {
    UIController.hideConfirmDeleteDialog();
    e.preventDefault();
  };

  // public methods
  return {
    init: function () {
      UIController.clearEditState();
      const items = itemController.getItems();
      if (items.length === 0) {
        UIController.hideList();
      } else {
        UIController.populateItemList(items);
      }
      const total_calories = itemController.getTotalCalories();
      UIController.showTotalCalories(total_calories);
      loadEventListeners();
    },
  };
})(UIController, itemController, storageController);

App.init();
