let db;
let shortName = "Clients";
let version = "0.1";
let displayName = "Clients";
let maxSize = 500000;

let feature = "";

db = openDatabase(shortName, version, displayName, maxSize);

let arr = [];
db.transaction(function (transaction) {
  //transaction.executeSql('DROP TABLE clients',null,function(){console.log('Drop Succeeded');},function(){console.log('Drop Failed');});
  transaction.executeSql(
    "CREATE TABLE IF NOT EXISTS clients " +
      " (id INTEGER NOT NULL PRIMARY KEY, " +
      " firstName TEXT NOT NULL, secondName TEXT NOT NULL, thirdName TEXT NOT NULL, address TEXT NOT NULL, telnumber TEXT NOT NULL, stationary TEXT NOT NULL);"
  );
});
let id = document.getElementById("id");
db.transaction(function (transaction) {
  transaction.executeSql(
    "SELECT id FROM clients;",
    [],
    function (transaction, result) {
      for (var i = 0; i < result.rows.length; i++) {
        let row = result.rows.item(i);
        arr[i] = row.id;
        id.insertAdjacentHTML(
          "beforeend",
          `<option value="${row.id}">` + row.id + `</option>`
        );
      }
    },
    errorHandler
  );
});
let list = document.getElementById("list");
db.transaction(function (transaction) {
  transaction.executeSql(
    'SELECT * FROM clients WHERE stationary="Да"',
    [],
    function (transaction, result) {
      for (let i = 0; i < result.rows.length; i++) {
        let row = result.rows.item(i);
        list.insertAdjacentHTML(
          "beforeend",
          `<li>` +
            row.firstName +
            " " +
            row.secondName +
            " " +
            row.thirdName +
            `</li>`
        );
      }
    },
    errorHandler
  );
});
if (localStorage.getItem("feature") != null) {
  let save1 = document.getElementById("save");
  save1.insertAdjacentHTML(
    "beforebegin",
    `
	<label for="feature">${localStorage.getItem("feature")}:
	<input type="text" name="feature" id="feature"></label>
	`
  );
}

function errorHandler(transaction, error) {
  console.log(
    "Oops. Error was " + error.message + " (Code " + error.code + ")"
  );
  return true;
}

function add() {
  let client = new Client();
  client.setClient();
}

function deleteClient() {
  let client = new Client();
  client.delClient();
}

function remove() {
  let t = confirm("Очистить форму?");
  if (t) {
    form.idclient.value = "";
    form.name.value = "";
    form.secondname.value = "";
    form.thirdname.value = "";
    form.address.value = "";
    form.telnumber.value = "";
  }
}

function showTable() {
  let table = document.querySelector("article.first");
  table.style.display = "block";
  let clients = document.querySelector("article.second");
  clients.style.display = "none";
  let client = new Client();
  client.getClient();
}

function showClients() {
  let clients = document.querySelector("article.second");
  clients.style.display = "block";
  let table = document.querySelector("article.first");
  table.style.display = "none";
}

function addNewFeature() {
  let client = new Client();
  client.addFeature();
}
