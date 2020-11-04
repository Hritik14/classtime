let loading = document.getElementById("loading");
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
fetch("routine.json")
  .then((response) => response.json())
  .then((routine) => {
    loading.style.display = "none";
    //let date = new Date();
    let date = new Date("Tue Nov 03 2020 12:01:00 GMT+0530");
    let day = date.getDay();
    if (day == 0 || day == 6) {
      document.write("Enjoy Holiday");
      return;
    }

    let table = document.createElement("table");
    table.border = "1";
    let header = table.createTHead();
    header.innerHTML =
      "<tr><th>Time</th><th>Subject</th><th>Description</th></tr>";
    let tbody = table.createTBody();
    let routineToday = routine[day].data;
    table.createCaption().innerHTML = days[day];

    let classGoingOnIdx;
    for (var i = 0; i < routineToday.length; i++) {
      let row = tbody.insertRow(i);
      let cellno = 0;

      let time = row.insertCell(cellno++);
      time.innerHTML = `${routineToday[i].start}<hr/>${routineToday[i].end}`;

      let subject = row.insertCell(cellno++);
      for (let s of routineToday[i].subject) {
        subject.innerHTML += `<a href="${s.link}">${s.name}</a>`;
      }

      let description = row.insertCell(cellno++);
      let desc = routineToday[i].description;
      if (desc != undefined) {
        description.innerHTML = `${desc}`;
      }

      let [hour, min] = routineToday[i].end.split(":");
      if (
        hour < date.getHours() ||
        (hour == date.getHours() && min <= date.getMinutes())
      ) {
        row.className = "completed";
        classGoingOnIdx = row.rowIndex + 1;
      }
    }

    let classGoingOn = table.rows[classGoingOnIdx];
    document.body.appendChild(table);
    if (classGoingOn != undefined) {
      classGoingOn.className = "classGoingOn";
      classGoingOn.scrollIntoView();
    }
  });
