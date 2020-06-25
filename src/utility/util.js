export const debug= process.env.NODE_ENV === "development";

export async function asyFetch(url, opt = {}) {
  let typeArr = ["blob", "text", "json", "formData"];
  //js原生fetch()方法的第二参数
  let optDefault = {
    method: "GET", // *GET, POST, PUT, DELETE, etc
    //mode: 'no-cors', // no-cors, cors, *same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'omit', // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      //    //'Content-Type': 'application/x-www-form-urlencoded',
    },
    //redirect: 'follow', // manual, *follow, error
    //referrer: 'no-referrer', // no-referrer, *client
    //body:JSON.stringify({zz:11}), // body data type must match "Content-Type" header while method=='POST' or 'PUT'
    type: "json"
  };
  let res = { ok: false };
  let result = {
    ok: false,
    cont: {}
  };

  opt = Object.assign({}, optDefault, opt);

  // console.log(url, opt);

  if (url && typeArr.includes(opt.type)) {
    res = await fetch(url, opt);
  }

  if (res.ok) {
    result.ok = true;
    switch (opt.type) {
      case "blob":
        result.cont = await res.blob();
        break;
      case "text":
        result.cont = await res.text();
        break;
      case "formData":
        result.cont = await res.formData();
        break;
      default:
        result.cont = await res.json();
        break;
    }
  } else {
    // result.cont=await res.blob();
    // result.cont = res;
    // console.log(res.status);
    // console.log(res.statusText);
    result.cont.data=[{result:res.ok,status:res.status,statusText:res.statusText}];
    // result.cont=res;
    // console.log(result);
    // console.log(res.headers)
  }
  //console.log(result)
  //async函数返回的是Promise对象
  return result;
}

export function getServUrl(){
  const str=window.location.href;
  const hasHash=str.indexOf('#')>0;
  const url=hasHash?new URL(str.slice(0,str.indexOf('#'))):new URL(str);
  
  debug?url.port=20000:'';
  
  return url;

}



// export {asyFetch };
export default {};