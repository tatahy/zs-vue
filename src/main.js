// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

// -------------------------

//动态加载各个模块,vue全家桶
async function appInit() {
  const [
    { default: Vue },
    { default: router },
    { default: store },
    { default: Home },
  ] = await Promise.all([
    import('vue'),
    import('@/routes/router'),
    import('@/store'),
    import('@/Home'),
  ]);

  return { Vue,router, Home, store };

}

appInit()
  .then(obj => {
    const [store, Vue, router,Home] = [obj.store, obj.Vue,obj.router,obj.Home];
    
    Vue.config.productionTip = false;
       
    new Vue({
      store,
      router,
      render: h => h(Home)
    }).$mount('#app');
    
  })
  .catch(err => alert(err));