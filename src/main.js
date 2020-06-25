// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

// -------------------------

//异步加载vue全家桶
async function appInit() {
  const [
    { default: Vue },
    { default: router },
    { default: store },
    { default: App },
  ] = await Promise.all([
    import('vue'),
    import('@/routes/router'),
    import('@/store'),
    import('@/App'),
  ]);

  return { Vue,router, store,App};

}

appInit()
  .then(obj => {
    const [store, Vue, router,App] = [obj.store, obj.Vue,obj.router,obj.App];
    
    Vue.config.productionTip = false;
       
    new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app');
    
  })
  .catch(err => alert(err));