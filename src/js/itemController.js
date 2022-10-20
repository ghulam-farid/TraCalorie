import storageController from './storageController.js';

const itemController = (function () {
   // Private section
   const Item = function (id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
   }
   // Data structure / State
   const data = {
      items: storageController.getItemsFromStorage(),
      current_item: null,
      total_calories: 0,
   }
   // Public section
   return {
      addItem: function (name, calories) {
         let id;
         if(data.items.length > 0){
            id = data.items[data.items.length - 1].id + 1;
         }else{
            id = 1;
         }
         calories = parseInt(calories);
         const new_item = new Item(id, name, calories);
         data.items.push(new_item);
         return new_item;
      },
      updateItem: function (name, calories) {
         calories = parseInt(calories);
         let updated_item = null;
         data.items.forEach(function (item, index) {
            if(item.id == data.current_item.id){
               updated_item = new Item(item.id, name, calories);
               data.items.splice(index, 1, updated_item);
            }
         });
         return updated_item;
      },
      deleteItem: function (id) {
         data.items.forEach(function (item, index) {
            if(item.id == id){
               data.items.splice(index, 1);
            }
         });
      },
      clearAllItems: function () {
         data.items = [];
      },
      getItems: function () {
         return data.items;
      },
      getItemById: function (id) {
         let found = null;
         data.items.forEach(item => {
            if(item.id == id){
               found = item;
            }
         });
         return found;
      },
      setCurrentItem : function (item) {
         data.current_item = item;
      },
      getCurrentItem: function () {
         return data.current_item; 
      },
      logData: function () {
         return data;
      },
      getTotalCalories: function () {
         let total = 0;
         data.items.forEach(item => {
            total += item.calories;
         });
         data.total_calories = total;
         return data.total_calories;
      }
   }
})();

export default itemController;