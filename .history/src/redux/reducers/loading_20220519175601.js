//该文件用于创建reducer函数

export const LoadReducer = (preState = {isloading :false},action)=>{

   
    let {type,data} = action
    console.log();
    switch (type) {

        case 'IsLoading':
            
         let newdata = {...preState}
          newdata.isloading = data
          console.log(newdata);
          return newdata
        default:
           return preState
    }
} 