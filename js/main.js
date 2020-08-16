/* Construya un calendario donde pueda ver el año completo actual, separado por meses en columnas de a tres pero que estas sean colapsables para poder visualizarla desde un telefono, debe existir un listado de categorias, estos inicialmente deben ser vacaciones y trabajo, debes poder agregar categorias a este listado y tambien poder eliminarlas, las categorias deben ser seleccionables y cuando la seleccione y pinche en un dia de este calendario, ese dia se debe marcar con la categoria indicada, en el caso de que el dia ya tenga una categoria debe indicar que tiene las dos categorias, si vuelvo a pinchar en algun dia debe quitar la categoria que se encuentra seleccionada. */

//Variables array fechas
var mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var dias = ["Dom", "Lun", "Mar", "Mie", "Juv", "Vie", "Sab"]



//Titulo del calendario con año dinamico
let fechaActual = new Date();

let agnoActual = fechaActual.getFullYear();

let titulo_calendario = document.getElementById('calendario_fecha');

titulo_calendario.textContent = 'Calendario Laboral ' + agnoActual.toString();



//Llamado de funciones
calendario();
numerar();
categorias();
crearCategoria();




//Crear cuerpo calendario con tablas
function calendario() {

    for (let i = 0; i <= 11; i++) {

        //Div Mes
        let meses = document.createElement("div");

        meses.className = "mes";

        document.body.appendChild(meses);

        //Tabla Mes
        let tabla_mes = document.createElement("table");

        tabla_mes.className = "tabla_mes";

        meses.appendChild(tabla_mes);

        //Título Mes
        let titulo = document.createElement("caption");

        titulo.className = "titulo";

        titulo.innerText = mes[i];

        tabla_mes.appendChild(titulo);

        //Cabecera Dia
        let cabecera = document.createElement('thead');

        tabla_mes.appendChild(cabecera);

        //Fila Dia
        let fila = document.createElement('tr');
        cabecera.appendChild(fila);

        //Insertar Nombre Dias en fila
        for (let i = 0; i < 7; i++) {

            let dia = document.createElement('th');

            dia.innerText = dias[i];

            fila.appendChild(dia);

        }

        //Insertar Nº Dias
        let cuerpo = document.createElement('tbody');

        tabla_mes.appendChild(cuerpo);

        for (let i = 0; i < 6; i++) {

            let fila = document.createElement('tr');

            cuerpo.appendChild(fila);

            for (let j = 0; j < 7; j++) {

                let dia = document.createElement('td');

                dia.innerText = "";

                fila.appendChild(dia);
                if (!dia.innerHTML == "") {
                    dia.style.border = '1px solid #ccc';
                }
            }
        }


    }


}



//Asignar dias reales al calendario
function numerar() {

    for (let i = 1; i < 366; i++) {

        let fecha = fechaPorDia(2020, i);

        let mes = fecha.getMonth();

        let select_tabla = document.getElementsByClassName("tabla_mes")[mes];

        let dia = fecha.getDate();

        let dia_semana = fecha.getDay();

        if (dia == 1) { var sem = 0; }

        select_tabla.children[2].children[sem].children[dia_semana].innerText = dia;

        if (dia_semana == 6) { sem = sem + 1; } 

    }



}


//Definir la fecha del dia
function fechaPorDia(agno, dia) {

    var date = new Date(agno, 1);

    return new Date(date.setDate(dia));

}



//Asignar categorias al calendario
function categorias() {

    let flag_vaca = false;
    let flag_trab = false;
    let flag_nueva_categoria = false;
    let vacaciones = document.getElementById('content');
    let trabajo = document.getElementById('content');
    let categoria_creada = document.getElementById('content');


    //Introduce Categoria vacaciones
    vacaciones.addEventListener('click', e => {

        let evento = e.target;

        if (evento.value == 'vaca') {
            return flag_vaca = true, flag_trab = false, flag_nueva_categoria = false;;



        } else if (flag_vaca == true) {
            for (let i = 1; i < 32; i++) {
                if (evento.innerHTML == i.toString()) {

                    evento.innerHTML = evento.textContent + '<br><button class="vacas eliminar" value="Vacaciones">Vacaciones</button>';


                } else if (evento.innerHTML == i.toString() + evento.innerHTML.substring(2).trim() && evento.innerHTML.indexOf('<button class="vacas eliminar" value="Vacaciones">Vacaciones</button>') === -1) {

                    evento.innerHTML += '<button class="vacas eliminar" value="Vacaciones">Vacaciones</button>';

                } else if (evento.innerHTML == i.toString() + evento.innerHTML.substring(1).trim() && evento.innerHTML.indexOf('<button class="vacas eliminar" value="Vacaciones">Vacaciones</button>') === -1) {

                    evento.innerHTML += '<button class="vacas eliminar" value="Vacaciones">Vacaciones</button>';
                }
            }

            //Elimina la categoria vacaciones
            if (evento.classList.contains('eliminar')) {

                evento.remove();
            }

        }

    });

    //Introduce Categoria trabajo
    trabajo.addEventListener('click', e => {

        let evento = e.target;

        if (evento.value == 'trab') {

            return flag_trab = true, flag_vaca = false, flag_nueva_categoria = false;;


        } else if (flag_trab == true) {

            for (let i = 1; i < 32; i++) {

                if (evento.innerHTML == i.toString()) {

                    evento.innerHTML = evento.textContent + '<br><button class="trab eliminar" value="Trabajo">Trabajo</button>';

                } else if (evento.innerHTML == i.toString() + evento.innerHTML.substring(2).trim() && evento.innerHTML.indexOf('<button class="trab eliminar" value="Trabajo">Trabajo</button>') === -1) {

                    evento.innerHTML += '<button class="trab eliminar" value="Trabajo">Trabajo</button>';

                } else if (evento.innerHTML == i.toString() + evento.innerHTML.substring(1).trim() && evento.innerHTML.indexOf('<button class="trab eliminar" value="Trabajo">Trabajo</button>') === -1) {

                    evento.innerHTML += '<button class="trab eliminar" value="Trabajo">Trabajo</button>';

                }
            }


            //Elimina la categoria trabajo
            if (evento.classList.contains('eliminar')) {

                evento.remove();
            }

        }

    });

    //Introduce Categoria creada
    categoria_creada.addEventListener('click', e => {

        let evento = e.target;
        let valor = evento.value;
        let datos = localStorage.getItem('datos');
        let colores = localStorage.getItem('colores');

        if (evento.value == e.toElement.className) {

            localStorage.setItem('datos', JSON.stringify(valor));

            return flag_vaca = false, flag_trab = false, flag_nueva_categoria = true;

        } else if (flag_nueva_categoria == true) {

            for (let i = 1; i < 32; i++) {
                if (evento.innerHTML == i.toString()) {

                    evento.innerHTML = evento.textContent + '<br><button style="background:' + JSON.parse(colores) + '" class="' + JSON.parse(datos) + ' eliminar" value="' + JSON.parse(datos) + '">' + JSON.parse(datos) + '</button>';

                } else if (evento.innerHTML == i.toString() + evento.innerHTML.substring(2).trim() && evento.innerHTML.indexOf('<button style="background:' + JSON.parse(colores) + '" class="' + JSON.parse(datos) + ' eliminar" value="' + JSON.parse(datos) + '">' + JSON.parse(datos) + '</button>') === -1) {


                    evento.innerHTML += '<button style="background:' + JSON.parse(colores) + '" class="' + JSON.parse(datos) + ' eliminar" value="' + JSON.parse(datos) + '">' + JSON.parse(datos) + '</button>';

                } else if (evento.innerHTML == i.toString() + evento.innerHTML.substring(1).trim() && evento.innerHTML.indexOf('<button style="background:' + JSON.parse(colores) + '" class="' + JSON.parse(datos) + ' eliminar" value="' + JSON.parse(datos) + '">' + JSON.parse(datos) + '</button>') === -1) {

                    evento.innerHTML += '<button style="background:' + JSON.parse(colores) + '" class="' + JSON.parse(datos) + ' eliminar" value="' + JSON.parse(datos) + '">' + JSON.parse(datos) + '</button>';
                }
            }

            //Elimina la categoria creada
            if (evento.classList.contains('eliminar')) {

                evento.remove();
            }

        }

    });

    //Habilitar zona de categorias
    for (let i = 0; i < document.getElementsByTagName("td").length; i++) {

        if (!document.getElementsByTagName("td")[i].textContent == "") {

            document.getElementsByTagName("td")[i].classList.add("evento", i.toString());

            document.getElementsByTagName("td")[i].style.border = '1px solid #ccc';
        }
        



    }
}



//Crear categoria
function crearCategoria() {

    let crear = document.getElementById('crear');

    crear.addEventListener('click', (e) => {

        let nueva_categoria = document.getElementById('categoria');

        let boton = document.createElement("button");



        if (!nueva_categoria.value == "") {

            let color = document.getElementById('color');

            localStorage.setItem('colores', JSON.stringify(color.value));

            let colores = localStorage.getItem('colores');

            boton.style.backgroundColor = JSON.parse(colores);

            boton.className = nueva_categoria.value;

            boton.value = nueva_categoria.value;

            boton.textContent = nueva_categoria.value;

            document.getElementById('categorias').append(boton);

            nueva_categoria.value = "";
        }

    });
}



