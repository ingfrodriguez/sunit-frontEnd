import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        title: 'Registro'
      }
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue'),
      meta: {
        title: 'Perfil'
      }
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue'),
      meta: {
        title: 'Tablero Admin'
      }
    },
    {
      path: '/superadmin',
      name: 'superadmin',
      // lazy-loaded
      component: () => import('./views/BoardSuperAdmin.vue'),
      meta: {
        title: 'Tablero SuperAdmin'
      }
    },
    {
      path: '/ventas',
      name: 'ventas',
      // lazy-loaded
      component: () => import('./views/BoardVentas.vue'),
      meta: {
        title: 'Tablero Ventas'
      }
    },
    {
      path: '/productos/crear',
      name: 'crearproducto',
      // lazy-loaded
      component: () => import('./views/Productos/Crear.vue'),
      meta: {
        title: 'Crear Producto'
      }
    },
    {
      path: '/productos/modificar:id',
      name: 'modificarproductos',
      // lazy-loaded
      component: () => import('./views/Productos/Modificar.vue'),
      meta: {
        title: 'Modificar Producto'
      }
    },
    {
      path: '/productos/listar',
      name: 'listarproductos',
      // lazy-loaded
      component: () => import('./views/Productos/Listar.vue'),
      meta: {
        title: 'Listado Productos'
      }
    },
    {
      path: '/categorias/crear',
      name: 'crearcategoria',
      // lazy-loaded
      component: () => import('./views/Categorias/Crear.vue'),
      meta: {
        title: 'Crear Categoria Producto'
      }
      
    },
    {
      path: '/categorias/listar',
      name: 'listarcategorias',
      // lazy-loaded
      component: () => import('./views/Categorias/Listar.vue'),
      meta: {
        title: 'Listado Categorias Productos'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  document.title =  (to.meta.title ? 'SUnit | '+ to.meta.title : 'SUnit') ;
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});