// indexedDB stuff
let indexedDB;
if(self.indexedDB) {
    indexedDB = self.indexedDB;
} else {
    indexedDB = window.indexedDB;
}

const request = indexedDB.open('animals',1);

let db;

request.onerror = (event) => {
    console.log('opening error');

}

request.onsuccess = (event) => {
    console.log('opening success');
    db = request.result;
    // or db = event.target.result;
    db.onerror = (event) => {
        console.log('Database error',event.target.errorCode);
    }
}

request.onupgradeneeded = (event) => {
    console.log('on upgrade needed ');
    const db = request.result;
    const outBox = db.createObjectStore('outbox',{autoIncrement: true});
    const inBox = db.createObjectStore('inbox',{autoIncrement: true});
}
//on send button press
const saveData = (name, data) => {
    return new Promise((resolve, reject)=> {
        const tx = db.transaction(name, "readwrite");
        const store = tx.objectStore(name);
        store.put(data);

        tx.oncomplete = (event) => {
            console.log('put ready');
            resolve(true);
        }
        tx.onerror = (event) => {
            console.log('put error');
            reject('put error');
        }
    });
};
const loadData = (name) => {
    return new Promise((resolve, reject)=> {
        const tx = db.transaction(name, "readwrite");
        const store = tx.objectStore(name);
        const query =store.getAll();

        tx.oncomplete = (event) => {
            console.log('load ready',query.result);
            resolve(query.result);
        }
        tx.onerror = (event) => {
            console.log('load error');
            reject('load error');
        }
    });

};
const clearData = (name) => {
    return new Promise((resolve, reject)=> {
        const tx = db.transaction(name, "readwrite");
        const store = tx.objectStore(name);
        store.clear()

        tx.oncomplete = (event) => {
            console.log('clear ready');
            resolve(true);
        }
        tx.onerror = (event) => {
            console.log('clear error');
            reject('clear error');
        }
    });

};
