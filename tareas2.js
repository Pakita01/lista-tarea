let tareas = [];
let totalTareas = 0;
let tareasCompletadas = 0;
let tareasIncompletas = 0;

const form = document.getElementById('form');
const inputTarea = document.getElementById('form-input-tarea');
const lista = document.getElementById('list');
const totalElement = document.getElementById('total');
const completadasElement = document.getElementById('completed');
const incompletasElement = document.getElementById('incompleted');

//para entrar las tareas ingresada por el ususario
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const tareaTexto = inputTarea.value.trim();
    if (tareaTexto === '') return;

    const tarea = {
        texto: tareaTexto,
        completada: false,
    };

    tareas.push(tarea);
    totalTareas++;
    tareasIncompletas++;
    actualizaContadores();
    muestraTareas();

    inputTarea.value = '';
});
// funcion para mostrar las tareas y los botones en la lista;
function muestraTareas() {
    lista.innerHTML = '';
    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.classList.add('list-item');

        const input = document.createElement('input');
        input.type = 'text';
        input.readOnly = true;
        input.value = tarea.texto;
        li.appendChild(input);

        const checkBtn = document.createElement('button');
        checkBtn.classList.add('list-item-check-btn');
        checkBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="list-item-check-icon"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" /></svg>`;
        checkBtn.addEventListener('click', () => marcarComoCompletada(index));
        
        li.appendChild(checkBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('list-item-delete-btn');
        deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="list-item-delete-icon"><path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" /></svg>`;
        deleteBtn.addEventListener('click', () => eliminarTarea(index));
        li.appendChild(deleteBtn);
        
        lista.appendChild(li);
    });
}

function marcarComoCompletada(index) {
    tareas[index].completada = !tareas[index].completada;
    if (tareas[index].completada) {
        tareasCompletadas++;
        tareasIncompletas--;
    } else {
        tareasCompletadas--;
        tareasIncompletas++;
    }
    actualizaContadores();
    muestraTareas();
}
//eliminacion de tarea en la lista
function eliminarTarea(index) {
    if (tareas[index].completada) {
        tareasCompletadas--;
    } else {
        tareasIncompletas--;
    }
    tareas.splice(index, 1);
    totalTareas--;
    actualizaContadores();
    muestraTareas();
}
// contador
function actualizaContadores() {
    totalElement.innerText = `Total: ${totalTareas}`;
    completadasElement.innerText = `Completadas: ${tareasCompletadas}`;
    incompletasElement.innerText = `Incompletas: ${tareasIncompletas}`;
}