// root mutations



//只能通过commit mutations中的函数才能修改state中的数据
export default {
  setShowPage:function (state, name = 'index') {
    const obj = state.showPage;
    // name = Object.keys(obj).indexOf(name)>-1 ? name : 'index';


    for (let page in obj) {
      obj[page] = page === name;
    }
  },

}