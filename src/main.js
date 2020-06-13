// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

// -------------------------

//动态加载各个模块
async function appInit() {
  const [
    { default: Vue },
    { default: store },
    { default: App },
  ] = await Promise.all([
    import('vue'),
    import('@/store'),
    import('@/App'),
  ]);

  return { Vue, App, store };

}

appInit()
  .then(obj => {
    const [store, Vue, App] = [obj.store, obj.Vue, obj.App];
    Vue.config.productionTip = false;
    // let vmRoot = new Vue({
    //   store,
    //   render: h => h(App)
    // })
    // vmRoot.$mount('#app');
    console.log(store.state);
    
    new Vue({
      store,
      render: h => h(App)
    }).$mount('#app');
  })
  .catch(err => alert(err));