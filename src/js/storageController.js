const storageController = (function () {
   return {
      storeItem: function (item) {
         let items;
         if(localStorage.getItem('items') === null){
            items = [];
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
         }else{
            items = JSON.parse(localStorage.getItem('items'));
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
         }
      },
      updateStorageItem: function(item){
         let items = JSON.parse(localStorage.getItem('items'));
         items.forEach((stored_item, index)=>{
            if(item.id == stored_item.id){
               items.splice(index, 1, item);
            }
         });
         localStorage.setItem('items', JSON.stringify(items));
      },
      deleteItemFromStorage: function(id){
         let items = JSON.parse(localStorage.getItem('items'));
         items.forEach((stored_item, index)=>{
            if(id == stored_item.id){
               items.splice(index, 1);
            }
         });
         localStorage.setItem('items', JSON.stringify(items));
      },
      clearAllItemsFromStorage: function(){
         localStorage.removeItem('items');
      },
      getItemsFromStorage: function () {
         let items;
         if(localStorage.getItem('items') === null){
            items = [];
         }else{
            items = JSON.parse(localStorage.getItem('items'));
         }
         return items;
      },
   }
})();

export default storageController;