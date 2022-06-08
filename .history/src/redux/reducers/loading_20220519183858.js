//该文件用于创建reducer函数

export const LoadReducer = (preState = false,action)=>{

   
    let {type,data} = action
    //console.log(type,data);
    switch (type) {

        case 'IsLoading':
         // 
         let newdata = {...preState}
          newdata.isloading = data
         
          return newdata
        default:
           return preState
    }
} 