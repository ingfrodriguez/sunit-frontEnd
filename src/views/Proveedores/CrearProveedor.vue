<template>
  <div  class="container">
    <header class="jumbotron"  v-if="!BanderaSeguridad">
      <h3>{{content}}</h3>
    </header>
    <div class="card mt-3 card-container" v-if="BanderaSeguridad" >
        <header >
        <b-row class="mb-4" align-v="center">
          <b-col md="1" ><b-avatar variant="primary" icon="people-fill"></b-avatar></b-col>
          <b-col md="11"><h1  class="text-primary ">Crear Proveedores</h1></b-col>
        </b-row>
        </header>
        <form name="form" @submit.prevent="handle">
          <div v-if="!successful">          
            <div class="form-group">
              <b-container class="bv-example-row">
              <b-row>
                <b-col  md="6">
                  <b-input-group prepend="NIT" class="mb-2">
                  <input
                    v-model="Proveedor.NIT"
                    v-validate="'required|min:3|max:70'"
                    class="form-control"
                    name="NIT"
                    placeholder="Ingreselo tal y como saldrá en la factura"
                  />
                  </b-input-group>
                  <div
                    v-if="submitted && errors.has('NIT')"
                    class="alert-danger"
                  >{{errors.first('NIT')}}</div>
                </b-col>
                <b-col md="6">
                  <b-input-group prepend="Razón Social" class="mb-2">
                  <input
                    v-model="Proveedor.RazonSocial"
                    v-validate="'required|min:3|max:70'"
                    class="form-control"
                    name="RazonSocial"
                    placeholder="Ingreselo tal y como saldrá en la factura"
                  />
                  </b-input-group>
                  <div
                    v-if="submitted && errors.has('RazonSocial')"
                    class="alert-danger"
                  >{{errors.first('RazonSocial')}}</div>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col md="6">
                  <b-input-group prepend="Dirección Comercial" class="mb-2">
                  <input
                    v-model="Proveedor.DireccionComercial"
                    v-validate="'required|min:3|max:70'"
                    type="text"
                    class="form-control"
                    name="DireccionComercial"
                  />
                  </b-input-group>
                  <div
                    v-if="submitted && errors.has('DireccionComercial')"
                    class="alert-danger"
                  >{{errors.first('DireccionComercial')}}</div>
                </b-col>
                <b-col md="6">
                  <b-input-group prepend="Nombre" class="mb-2">
                  <input
                    v-model="Proveedor.Nombre"
                    v-validate="'required|min:3|max:70'"
                    type="text"
                    class="form-control"
                    name="Nombre"
                  />
                  </b-input-group>
                  <div
                    v-if="submitted && errors.has('Nombre')"
                    class="alert-danger"
                  >{{errors.first('Nombre')}}</div>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col md="6">
                  <b-input-group prepend="Comentarios" class="mb-2">
                  <b-form-textarea
                    v-model="Proveedor.Comentarios"
                      rows="2"
                      max-rows="6"
                  ></b-form-textarea>
                  </b-input-group>
                </b-col>
                <b-col md="6">
                 <b-input-group prepend="Teléfono Principal" class="mb-2">
                  <input
                    v-model="Proveedor.TelefonoPrincipal"
                    v-validate="'required|numeric'"
                    type="tel"
                    class="form-control"
                    name="TelefonoPrincipal"
                  />
                 </b-input-group>
                  <div
                    v-if="submitted && errors.has('TelefonoPrincipal')"
                    class="alert-danger"
                  >{{errors.first('TelefonoPrincipal')}}</div>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col md="6">
                  <b-input-group prepend="Horario Laboral" class="mb-2">
                  <b-form-input
                    v-model="Proveedor.HorarioLaboral"
                    type="text"
                    class="form-control"
                    name="HorarioLaboral"
                  ></b-form-input>
                  </b-input-group>
                </b-col>
                <b-col md="6">
                  <b-input-group prepend="Maneja Crédito" class="mb-2">
                  <b-form-checkbox
                    v-model="Proveedor.ManejaCredito"
                    type="checkbox"
                    name="Activo"
                    class="ml-2"
                  ></b-form-checkbox>
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col md="6">
                  <b-input-group prepend="Correo Electrónico" class="mb-2">
                  <input
                    v-model="Proveedor.Email"
                    type="Email"
                    class="form-control"
                    name="Email"
                  />
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row class="mt-4">
                <b-col>
                  <label>Seleccione Categorias</label>
                  <b-form-checkbox-group
                  v-model="Proveedor.categoriasproveedor"
                  :options="Categorias"
                  class="mb-3"
                  value-field="id"
                  text-field="Nombre"
                  switches
                ></b-form-checkbox-group>
                </b-col>
              </b-row>
              <b-row class="mt-4">
                <b-col>
                  <h2>Contactos</h2><b-icon font-scale="1" icon="person-plus" class="mr-2"></b-icon>
                  <b-link class="colorx" v-on:click="agregar">Agregar Contacto</b-link >
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
                      ></b-form-input>
                      </b-input-group>
                      <b-input-group prepend="Notas" class="mb-2">
                      <b-form-input
                        v-model="item.Notas"
                        type="text"
                      ></b-form-input>
                      </b-input-group>
                    </b-card-text>
                  </b-card>
                  <b-row>
                    <b-col cols="10">
                    </b-col>
                    <b-col cols="2">
                      <b-icon font-scale="0" icon="trash" v-on:click="borrar(item.numero)"></b-icon>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>


              <b-row>
                <b-col>
                  <button class="btn btn-primary mt-4">Crear</button>
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
      submitted: false,
      successful: false,
      mensaje:'',
      Categorias: [],
      Proveedor: {
        NIT: '',
        RazonSocial:'',
        DireccionComercial:'',
        Nombre: '',
        Email: '',
        ManejaCredito:false,
        Comentarios:'',
        TelefonoPrincipal:0,
        HorarioLaboral:'Lunes a Viernes de 8:00 A.m. a 5:00 p.m.',
        categoriasproveedor:[]
      },
      Contactos:[
      
      ]
    };
  },
  computed: {
  },
  mounted() {     
    axios
    .get(this.$IPServidor + '/api/ListarCategoriasProveedores',{ headers: authHeader()})
    .then((response) => {
      this.Categorias = response.data;
    }); 
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
            url:this.$IPServidor + '/api/CrearProveedor',
            data:{
              Proveedor:this.Proveedor,
              Contactos:this.Contactos
            }
          })
          .then(response => {
            this.mensaje=response.data.message;
            this.successful = true;
            setTimeout(()=>{this.$router.push('/Proveedores/ListarProveedores');}, 2000);
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
