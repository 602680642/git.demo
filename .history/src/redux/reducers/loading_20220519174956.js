//该文件用于创建reducer函数

export const LoadReducer = (preState = {isloading :false},action)=>{

   
    let {type,dat} = action
   
    switch (type) {

        case 'IsLoading':
            
         let newdata = {...preState}
          newdata.isloading = payload
          return newdata
        default:
           return preState
    }
} 