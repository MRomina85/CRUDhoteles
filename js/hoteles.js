const { createApp } = Vue
  createApp({
    data() {
      return {
        hoteles:[],
        url:'https://mrominapereyra.pythonanywhere.com/hoteles',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombre:"", 
        imagen:"",
        pais:"",
        habitaciones:"",
        dias:"",
        petfriendly:"",
        precio:0,
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.hoteles=data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			        alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){
            let hotel = {
                nombre: this.nombre,
                pais: this.pais,
                habitaciones: this.habitaciones,
                dias: this.dias,
                petfriendly: this.petfriendly,
                precio: this.precio,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(hotel),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                   window.location.href= "./hoteles.html";  // recarga hoteles.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
