class Client {
  constructor() {}

  setClient() {
    let id = form.idclient.value;
    for (let number of arr) {
      if (number == id) {
        alert("Ошибка! Недоступный ID");
      }
    }
    let firstNameVariable = form.name.value;
    let secondNameVariable = form.secondname.value;
    let thirdNameVariable = form.thirdname.value;
    let addressVariable = form.address.value;
    let telnumberVariable = form.telnumber.value;
    let stationaryVariable = "";
    let feature = "";
    if (localStorage.getItem("feature") != null) {
      feature = form.feature.value;
    }
    let help = document.getElementsByName("help");
    for (let i = 0; i < help.length; i++) {
      if (help[i].checked) {
        if (i == 0) {
          stationaryVariable = "Да";
        } else if (i == 1) {
          stationaryVariable = "Нет";
        }
      }
    }
    if (localStorage.getItem("feature") != null) {
      db.transaction(function (transaction) {
        transaction.executeSql(
          `INSERT INTO clients (id,firstName,secondName,thirdName,address,telnumber,stationary,${localStorage.getItem(
            "feature"
          )}) VALUES (?,?,?,?,?,?,?,?);`,
          [
            id,
            firstNameVariable,
            secondNameVariable,
            thirdNameVariable,
            addressVariable,
            telnumberVariable,
            stationaryVariable,
            feature,
          ],
          null,
          errorHandler
        );
      });
    } else {
      db.transaction(function (transaction) {
        transaction.executeSql(
          "INSERT INTO clients (id,firstName,secondName,thirdName,address,telnumber,stationary) VALUES (?,?,?,?,?,?,?);",
          [
            id,
            firstNameVariable,
            secondNameVariable,
            thirdNameVariable,
            addressVariable,
            telnumberVariable,
            stationaryVariable,
          ],
          null,
          errorHandler
        );
      });
    }
  }

  getClient() {
    let feature = localStorage.getItem("feature");
    let table1 = document.getElementById("table1");
    while (table1.firstChild) {
      table1.removeChild(table1.firstChild);
    }
    if (localStorage.getItem("feature") == null) {
      table1.insertAdjacentHTML(
        "afterbegin",
        `<table><tr>
                        <th>
                        ID клиента 
                        </th>
                        <th>
                        Имя клиента
                        </th>
                        <th>
                        Фамилия клиента
                        </th>
                        <th>
                        Отчество клиента
                        </th>
                        <th>
                        Адрес
                        </th>
                        <th>
                        Номер телефона
                        </th>
                        <th>
                        Необходимо ли оказать стационарную помощь?
                        </th>
                        </tr></table>`
      );
      db.transaction(function (transaction) {
        transaction.executeSql(
          "SELECT id, firstName,secondName,thirdName,address,telnumber,stationary FROM clients;",
          [],
          function (transaction, result) {
            for (var i = 0; i < result.rows.length; i++) {
              var row = result.rows.item(i);
              table1.insertAdjacentHTML(
                "beforeend",
                `<tr>
                         <td>` +
                  row.id +
                  `</td>
                         <td>` +
                  row.firstName +
                  `</td>
                         <td>` +
                  row.secondName +
                  `</td>
                         <td>` +
                  row.thirdName +
                  `</td>
                         <td>` +
                  row.address +
                  `</td>
                         <td>` +
                  row.telnumber +
                  `</td>
                         <td>` +
                  row.stationary +
                  `</td>
                         </tr>`
              );
            }
          },
          errorHandler
        );
      });
    } else {
      table1.insertAdjacentHTML(
        "afterbegin",
        `<table><tr>
            <th>
            ID клиента 
            </th>
            <th>
            Имя клиента
            </th>
            <th>
            Фамилия клиента
            </th>
            <th>
            Отчество клиента
            </th>
            <th>
            Адрес
            </th>
            <th>
            Номер телефона
            </th>
            <th>
            Необходимо ли оказать стационарную помощь?
            </th>
            <th>
            ${localStorage.getItem("feature")}
            </th>
            </tr></table>`
      );
      db.transaction(function (transaction) {
        transaction.executeSql(
          `SELECT id, firstName,secondName,thirdName,address,telnumber,stationary,${feature} FROM clients;`,
          [],
          function (transaction, result) {
            for (var i = 0; i < result.rows.length; i++) {
              var row = result.rows.item(i);
              table1.insertAdjacentHTML(
                "beforeend",
                `<tr>
             <td>` +
                  row.id +
                  `</td>
             <td>` +
                  row.firstName +
                  `</td>
             <td>` +
                  row.secondName +
                  `</td>
             <td>` +
                  row.thirdName +
                  `</td>
             <td>` +
                  row.address +
                  `</td>
             <td>` +
                  row.telnumber +
                  `</td>
             <td>` +
                  row.stationary +
                  `</td>
             <td>` +
                  result.rows.item(i)[feature] +
                  `</td>
             </tr>`
              );
            }
          },
          errorHandler
        );
      });
    }
  }

  delClient() {
    let deleteID = +prompt("Введите ID");
    db.transaction(function (transaction) {
      transaction.executeSql(
        "DELETE FROM clients WHERE id=?;",
        [deleteID],
        null,
        errorHandler
      );
    });
    location.href = location.href;
    let check = 0;
    for (let number of arr) {
      if (number == deleteID) check = 1;
    }
    if (check == 1) {
      alert("Запись была успешно удалена");
    } else {
      alert("Запись с таким ID отсутствует");
    }
  }

  addFeature() {
    feature = prompt("Введите название нового свойства");
    localStorage.setItem("feature", feature);

    db.transaction(function (transaction) {
      transaction.executeSql(
        `ALTER TABLE clients ADD ${localStorage.getItem("feature")} TEXT;`,
        [],
        null,
        errorHandler
      );
    });

    db.transaction(function (transaction) {
      transaction.executeSql(
        "SHOW TABLES;",
        [],
        function (transaction, result) {
          for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows.item(i);
            alert(row);
          }
        },
        errorHandler
      );
    });
    location.href = location.href;
  }
}
