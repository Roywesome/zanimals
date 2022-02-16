class Animal{
    constructor(id, nombre, nombreCientifico, orden, familia, promVida, img){
        this.id = id;
        this.nombre = nombre;
        this.nombreCientifico = nombreCientifico;
        this.orden = orden;
        this.familia = familia;
        this.promVida = promVida;
        this.img = img;
    }
}

//Evento
document.addEventListener('DOMContentLoaded', () => showAnimals());

//Evento submit
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const idAnimal = document.getElementById('idAnimal').value;
    const nombreCientifico = document.getElementById('nombreCientifico').value;
    const orden = document.getElementById('orden').value;
    const familia = document.getElementById('familia').value;
    const promVida = document.getElementById('promVida').value;
    const img = document.getElementById('img').value;

    const animal = new Animal(idAnimal, nombre, nombreCientifico, orden, familia, promVida, img);
    //Validar
    
    if(idAnimal === ''|| nombre === '' || nombreCientifico === '' || orden === '' || familia === '' || promVida === '' || img === ''){
        showAlerta('Por favor ingrese todos los campos.', 'danger')
    }else{
        let animals = getAnimals(); 
        animals.push(animal);
        localStorage.setItem('animals', JSON.stringify(animals));
        showAlerta('Se guardo correctamente.', 'success')
        showAnimals();
        Reseat();
    };

});



//Guardar y obtener datos
function getAnimals(){
    let animals;
    let datos = localStorage.getItem('animals');
    if(datos === null){
        animals = [];
    }else{
        animals = JSON.parse(datos);
    }
    return animals
};

//Reset
function Reseat(){
    document.getElementById('nombre').value = "";
    document.getElementById('idAnimal').value = "";
    document.getElementById('nombreCientifico').value= "";
    document.getElementById('orden').value = "";
    document.getElementById('familia').value = "";
    document.getElementById('img').value = "";
    document.getElementById('promVida').value = "";
}

//Mostrar animals
function showAnimals(){
    let animals = getAnimals();
    let div = '';
    animals.forEach( (animal, pos) => {
    const card = document.getElementById('card');
    div += `
    <div class="col">
    <div class="card h-100">
    <img src="${animal.img}" class="card-img-top">
    <div class="card-body">
    <h5 class="card-title">${animal.nombre}</h5>
    <div class="d-grid gap-2">
    <!--<button onclick="btnDelete('${animal.id}')" class="btn btn-danger delete">Delete</button>-->
    <button type="button" onclick="btnEliminar(${pos})" class="btn btn-danger delete">Delete</button>
    <button  type="button" onclick="btnEditar(${pos})" class="btn btn-info edit" >Edit</button>
    </div>
    </div>
    </div>
    </div>
    `
    card.innerHTML = div;
    });

}


/*
//Método eliminar con id
function btnEliminar(id){
    let animals = getAnimals();

   const newAnimals = animals.filter( (animal) => animal.id !== id);
   localStorage.setItem('animals', JSON.stringify(newAnimals));
   showAnimals();

}
*/

//Método para eliminar con posición
function btnEliminar(pos){
    let animals = getAnimals();
    const newAnimals = animals.filter( (animal, index) => index !== pos);
    localStorage.setItem('animals', JSON.stringify(newAnimals));
   showAnimals();
}

//Método para eliminar
function btnDelete(id){
    let animals = getAnimals();
    let passed = [];

    for(let i = 0; i<animals.length; i++){
        if(animals[i].id !== id){
            
            passed.push(animals[i]);
            localStorage.setItem('animals', JSON.stringify(passed));
            showAnimals();
        }
    }
}


/*
function btnEdit(id){
    //console.log(id)
    const animals = getAnimals();
    console.log(animals)
    animals.forEach( (animal, index) => {
        if(animal.id === id){
            document.getElementById('idAnimal').value = animal.id;
            document.getElementById('nombre').value = animal.nombre;
            document.getElementById('nombreCientifico').value = animal.nombreCientifico;
            document.getElementById('orden').value = animal.orden;
            document.getElementById('familia').value = animal.familia;
            document.getElementById('promVida').value = animal.promVida;
            document.getElementById('img').value = animal.img;

            const buttonEdit = document.getElementById('btnForm');
            buttonEdit.type = 'button'
            buttonEdit.value = 'Actualizar'
            buttonEdit.className = 'btn btn-success update'
            buttonEdit.onclick = () => {
                const nombre = document.getElementById('nombre').value;
                const idAnimal = document.getElementById('idAnimal').value;
                const nombreCientifico = document.getElementById('nombreCientifico').value;
                const orden = document.getElementById('orden').value;
                const familia = document.getElementById('familia').value;
                const promVida = document.getElementById('promVida').value;
                const img = document.getElementById('img').value;

                const animalEditado = new Animal(idAnimal, nombre, nombreCientifico, orden, familia, promVida, img);
                
                const newAnimals = animals.map( (animal, index) => {
                    if(animal.id === id){
                        return animalEditado;
                    }
                    return animal;
                });
                localStorage.setItem('animals', JSON.stringify(newAnimals));
                showAnimals();
                
            }


        }
    });

    
}
*/

function showAlerta(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    /*Visualizacion de las posiciones
    beforebegin
    afterend
     */
    const h1 = document.querySelector('.texto');
    h1.insertAdjacentElement("afterend", div);

    setTimeout(() => document.querySelector('.alert').remove(), 3000)
}

function btnEditar(pos){
    let animals = getAnimals();
    console.log(animals)
    const animal = animals[pos];
    
    if(animal){
        document.getElementById('idAnimal').value = animal.id;
        document.getElementById('nombre').value = animal.nombre;
        document.getElementById('nombreCientifico').value = animal.nombreCientifico;
        document.getElementById('orden').value = animal.orden;
        document.getElementById('familia').value = animal.familia;
        document.getElementById('promVida').value = animal.promVida;
        document.getElementById('img').value = animal.img;

        const buttonUpdate = document.getElementById('btnForm');
        buttonUpdate.type = 'button';
        buttonUpdate.className = 'btn btn-outline-success my-3';
        buttonUpdate.value = 'Update';
        buttonUpdate.onclick = () => {
            const nombre = document.getElementById('nombre').value;
            const idAnimal = document.getElementById('idAnimal').value;
            const nombreCientifico = document.getElementById('nombreCientifico').value;
            const orden = document.getElementById('orden').value;
            const familia = document.getElementById('familia').value;
            const promVida = document.getElementById('promVida').value;
            const img = document.getElementById('img').value;

            const newAnimal = new Animal(idAnimal, nombre, nombreCientifico, orden, familia, promVida, img);

            animals[pos] = newAnimal;
            console.log(animals);
            localStorage.setItem('animals', JSON.stringify(animals));
            showAnimals();
            Reseat();
        }
    }
}


