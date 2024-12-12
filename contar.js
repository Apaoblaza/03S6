let pncomp = document.querySelector("#tareascompletadas");
let pnpend = document.querySelector("#tareaspendientes");
let table = document.querySelector("#listadotareas");
let addbutton = document.querySelector("#addbutton");
let textfield = document.querySelector("#textfield");
let idtarea = 2;
let tareas = [
  { id: 0, nombre: "Tarea1", done: false },
  { id: 1, nombre: "Tarea2", done: true },
  { id: 2, nombre: "Tarea3", done: false },
];
let html =
  "<table><tr><th>ID</th><th>Nombre</th><th>Estado</th><th>Eliminar</th></tr>";

table.innerHTML = "";
html += refrescar(tareas);
html += "</table>";
table.innerHTML = html;
html =
  "<table><tr><th>ID</th><th>Nombre</th><th>Estado</th><th>Eliminar</th></tr>";
pncomp.innerHTML = refrescarcompletadas(tareas);
pnpend.innerHTML = refrescarpendientes(tareas);

function refrescar(tareas) {
  let p = "";
  for (const tarea of tareas) {
    p += "<tr>";
    p += `<td>${tarea.id}</td>`;
    p += `<td>${tarea.nombre}</td>`;
    if (tarea.done === false) {
      p += `<td><input type="checkbox" class="done" data-id=${tarea.id} unchecked></td>`;
    } else if (tarea.done === true) {
      p += `<td><input type="checkbox" class="done" data-id=${tarea.id} checked></td>`;
    }
    p += `<td><button class="delbutton" data-id="${tarea.id}">Eliminar</button></td>`;
    p += "</tr>";
  }
  return p;
}

function refrescarcompletadas(tareas) {
  let p = 0;
  for (const tarea of tareas) {
    if (tarea.done == true) {
      p = p + 1;
    }
  }
  return p;
}
function refrescarpendientes(tareas) {
  let p = 0;
  for (const tarea of tareas) {
    if (tarea.done == false) {
      p = p + 1;
    }
  }
  return p;
}

addbutton.addEventListener("click", function () {
  html =
    "<table><tr><th>ID</th><th>Nombre</th><th>Estado</th><th>Eliminar</th></tr>";
  if (textfield.value !== "") {
    table.innerHTML = "";
    idtarea++;
    tareas.push({ id: idtarea, nombre: textfield.value, done: false });
    html += refrescar(tareas);
    html += "</table>";
    table.innerHTML = html;
    textfield.value = "";
    html =
      "<table><tr><th>ID</th><th>Nombre</th><th>Estado</th><th>Eliminar</th></tr>";
    pncomp.innerHTML = refrescarcompletadas(tareas);
    pnpend.innerHTML = refrescarpendientes(tareas);
  }
});

table.addEventListener("click", function (event) {
  html =
    "<table><tr><th>ID</th><th>Nombre</th><th>Estado</th><th>Eliminar</th></tr>";
  if (event.target.classList.contains("delbutton")) {
    const button = event.target;
    const taskId = button.dataset.id;
    const delindex = tareas.findIndex((tarea) => tarea.id == taskId);
    console.log(delindex);
    tareas.splice(delindex, 1);
    table.innerHTML = "";
    html += refrescar(tareas);
    html += "</table>";
    table.innerHTML = html;
    pncomp.innerHTML = refrescarcompletadas(tareas);
    pnpend.innerHTML = refrescarpendientes(tareas);
  }
  if (event.target.classList.contains("done")) {
    const button = event.target;
    //console.log(button.dataset.id);
    const taskId = button.dataset.id;
    //console.log(taskId);
    const checkindex = tareas.findIndex((tarea) => tarea.id == taskId);
    console.log(checkindex);
    tareas[checkindex].done = !tareas[checkindex].done;
    pncomp.innerHTML = refrescarcompletadas(tareas);
    pnpend.innerHTML = refrescarpendientes(tareas);
  }
});
