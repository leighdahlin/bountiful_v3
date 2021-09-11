// module.exports = {
//     // the helper method 'format_time' will take in a timestamp and return a string with only the date
//     format_time: (date) => {
//       // uses the toLocaleDateString() method to format the date as MM/DD/YYYY
//       return date.toLocaleDateString();

//     }
//   };

export default function formatTime(date) {
  // console.log(date);
  const newDate = parseInt(date);
  // console.log("DATE");
  // console.log(newDate);
  const currentDate = new Date(newDate).toLocaleDateString();
  // console.log(currentDate);
  return currentDate;
};

//Helper for the cart:
export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('shop-shop', 1);
    let db, tx, store;
    request.onupgradeneeded = function(e) {
      const db = request.result;
      db.createObjectStore('items', { keyPath: '_id' });
      //do we need the categories??:
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    request.onerror = function(e) {
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function(e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}