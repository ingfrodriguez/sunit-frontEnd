<template>
  <div  class="container">
    <header class="jumbotron"  v-if="!BanderaSeguridad">
      <h3>{{content}}</h3>
    </header>
    <div class="card mt-3 card-container" v-if="BanderaSeguridad" >
        <header >
        <b-row class="mb-4" align-v="center">
          <b-col md="1" ><b-avatar variant="primary" icon="people-fill"></b-avatar></b-col>
          <b-col md="11"><h1  class="text-primary ">{{titulo}}</h1></b-col>
        </b-row>
        </header>
        <form name="form" @submit.prevent="handle">
          <div v-if="!successful">          
            <div class="form-group">
              <b-container class="bv-example-row">
              <b-row>
                <b-col md="6">
                  <b-input-group prepend="Nombre" class="mb-2">
                  <input
                    v-model="Vendedor.Nombre"
                    v-validate="'required|min:3|max:70'"
                    type="text"
                    class="form-control"
                    name="Nombre"
                    :disabled =BanderaVer
                  />
                  </b-input-group>
                  <div
                    v-if="submitted && errors.has('Nombre')"
                    class="alert-danger"
                  >{{errors.first('Nombre')}}</div>
                </b-col>
                <b-col md="6">
                 <b-input-group prepend="Teléfono" class="mb-2">
                  <input
                    v-model="Vendedor.Telefono"
                    v-validate="'required|numeric'"
                    type="tel"
                    class="form-control"
                    name="Telefono"
                    :disabled =BanderaVer
                  />
                 </b-input-group>
                  <div
                    v-if="submitted && errors.has('Telefono')"
                    class="alert-danger"
                  >{{errors.first('Telefono')}}</div>
                </b-col>
                <b-col md="6">
                 <b-input-group prepend="Celular" class="mb-2">
                  <input
                    v-model="Vendedor.Celular"
                    type="number"
                    class="form-control"
                    name="Celular"
                    :disabled =BanderaVer
                  />
                 </b-input-group>
                </b-col>
                <b-col md="6">
                 <b-input-group prepend="Domicilio" class="mb-2">
                  <input
                    v-model="Vendedor.Domicilio"
                    v-validate="'required'"
                    type="tel"
                    class="form-control"
                    name="Domicilio"
                    :disabled =BanderaVer
                  />
                 </b-input-group>
                  <div
                    v-if="submitted && errors.has('Domicilio')"
                    class="alert-danger"
                  >{{errors.first('Domicilio')}}</div>
                </b-col>
                <b-col md="6">
                  <b-input-group prepend="Correo Electrónico" class="mb-2">
                  <input
                    v-model="Vendedor.Email"
                    type="Email"
                    class="form-control"
                    name="Email"
                    :disabled =BanderaVer
                  />
                  </b-input-group>
                </b-col>
              
                <b-col md="6">
                  <b-input-group prepend="Horario Laboral" class="mb-2">
                  <b-form-input
                    v-model="Vendedor.HorarioLaboral"
                    type="text"
                    class="form-control"
                    name="HorarioLaboral"
                    :disabled =BanderaVer
                  ></b-form-input>
                  </b-input-group>
                </b-col>
                
                <b-col md="6">
                 <b-input-group prepend="Comisión Asignada" class="mb-2">
                  <input
                    v-model="Vendedor.ComisionAsignada"
                    v-validate="'required|decimal:2'"
                    type="number"
                    class="form-control"
                    name="ComisionAsignada"
                    :disabled =BanderaVer
                  />
                 </b-input-group>
                  <div
                    v-if="submitted && errors.has('ComisionAsignada')"
                    class="alert-danger"
                  >{{errors.first('ComisionAsignada')}}</div>
                </b-col>
                
                <b-col md="6">
                  <b-input-group prepend="Comentarios" class="mb-2">
                  <b-form-textarea
                    v-model="Vendedor.Comentarios"
                      rows="2"
                      max-rows="6"
                      :disabled =BanderaVer
                  ></b-form-textarea>
                  </b-input-group>
                </b-col>
                
                
              </b-row>
              <b-row class="mt-4">
                <b-col>
                  <h2>Contactos</h2><b-icon  v-if="!BanderaVer" font-scale="1" icon="person-plus" class="mr-2"></b-icon>
                  <b-link v-if="!BanderaVer" class="colorx" v-on:click="agregar">Agregar Contacto</b-link >
                </b-col>
              </b-row>
              
              
              <b-row class="mt-1 pt-1">
                <b-col md="6" v-for="item in Contactos" :key="item.Nombres"  class="mt-1 pt-1">
                  <b-card  class="mt-1 pt-1 mb-1">
                    <b-card-text>
                      <b-input-group prepend="Nombre" class="mb-2">
                      <b-form-input
                        v-model="item.Nombre"
                        v-validate="'required|min:3|max:70'"
                        type="text"
                        :name="item.id_Nombre"
                        :disabled =BanderaVer
                      ></b-form-input>
                      </b-input-group>
                      <div
                        v-if="submitted && errors.has(item.id_Nombre)"
                        class="alert-danger"
                      >{{errors.first(item.id_Nombre)}}</div>
                      <b-input-group prepend="Teléfono" class="mb-2">
                      <b-form-input
                        v-model="item.Telefono"
                        type="tel"
                        v-validate="'required|numeric'"
                        :name="item.id_Tel"
                        :disabled =BanderaVer
                      ></b-form-input>
                      </b-input-group>
                      <div
                        v-if="submitted && errors.has(item.id_Tel)"
                        class="alert-danger"
                      >{{errors.first(item.id_Tel)}}</div>
                      <b-input-group prepend="Correo Electrónico" class="mb-2">
                      <b-form-input
                        v-model="item.Email"
                        type="email"
                        :disabled =BanderaVer
                      ></b-form-input>
                      </b-input-group>
                      <b-input-group prepend="Notas" class="mb-2">
                      <b-form-input
                        v-model="item.Notas"
                        type="text"
                        :disabled =BanderaVer
                      ></b-form-input>
                      </b-input-group>
                    </b-card-text>
                  </b-card>
                  <b-row>
                    <b-col cols="10">
                    </b-col>
                    <b-col cols="2">
                      <b-icon v-if="!BanderaVer" font-scale="0" icon="trash" v-on:click="borrar(item.numero)"></b-icon>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>


              <b-row>
                <b-col>
                  <button class="btn btn-primary mt-4" v-if="!BanderaVer">Modificar</button>
                </b-col>
              </b-row>
              </b-container>
            </div>
          </div>
        </form>
        <div
          v-if="mensaje"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >{{mensaje}}</div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserService from '../../services/user.service';
import authHeader from '../../services/auth-header';
export default {
  data() {
    return {
      content:'',
      idContacto:0,
      BanderaSeguridad:false,
      BanderaVer:false,
      submitted: false,
      successful: false,
      mensaje:'',
      titulo:'Modificar Vendedor',
      Categorias: [],
      Vendedor: {
        id:null,
        Nombre: null,
        Telefono: null,
        Celular: null,
        Domicilio: null,
        Email: null,
        Comentarios:'',
        HorarioLaboral:'Lunes a Viernes de 8:00 A.m. a 5:00 p.m.',
        ComisionAsignada:null
      },
      Contactos:[
      
      ]
    };
  },
  computed: {
  },
  mounted() {     
    this.BanderaVer= this.$route.params.ver
    if (this.BanderaVer) this.titulo ='Ver Vendedor' 
    axios
      .get(this.$IPServidor + '/api/VerVendedor', {
        params: {
          id: this.$route.params.id,
        },
        headers: authHeader(),
      })
      .then((response) => {
        this.Vendedor = response.data;
        this.Contactos= this.Vendedor.Contactos
      })


    UserService.getAdminBoard().then(
      response => {
        this.content = response.data;
        this.BanderaSeguridad=true;
      },
      error => {
        this.BanderaSeguridad=false;
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {    
    agregar(){
      this.idContacto++
      this.Contactos.push(
        {
          numero:this.idContacto,
          id_Nombre:'Nombre del Contacto '+this.idContacto,
          id_Tel:'Telefono del Contacto '+this.idContacto,
          Nombre:'',
          Telefono:0,
          Email:'',
          Notas:''
        }
      )
    },
    borrar(numeroborrar){
      var removeIndex = this.Contactos.map(function(item) { return item.numero; }).indexOf(numeroborrar);
      this.Contactos.splice(removeIndex, 1);
    },
    handle() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          axios({
            method:'POST',
            headers: authHeader(),
            url:this.$IPServidor + '/api/ModificarVendedor',
            data:{
              Vendedor:this.Vendedor,
              Contactos:this.Contactos
            }
          })
          .then(response => {
            this.mensaje=response.data.message;
            this.successful = true;
            this.$router.push('/Vendedores/ListarVendedores');
          })
          .catch( error => {
              this.mensaje=error.response.data.message;
              this.successful = false;
          });
        }
      });
    }
  }
};
</script>
