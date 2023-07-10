console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // hotel_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombre:"", 
        imagen:"",
        pais:"",
        habitaciones:"",
        dias:"",
        petfriendly:"",
        precio:0,
        url:'https://mrominapereyra.pythonanywhere.com/hoteles/' + id,
       };  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.id=data.id
                    this.nombre=data.nombre
                    this.imagen=data.imagen
                    this.pais=data.pais
                    this.habitaciones=data.habitaciones
                    this.dias=data.dias
                    this.petfriendly=data.petfriendly
                    this.precio=data.precio                    
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let hotel = {
                nombre:this.nombre,
                pais:this.pais,
                habitaciones:this.habitaciones,
                dias:this.dias,
                petfriendly:this.petfriendly,
                precio: this.precio,
                imagen:this.imagen
            }
            var options = {
                body: JSON.stringify(hotel),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "/hoteles.html"; // navega a hoteles.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
