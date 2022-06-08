//该文件用于创建reducer函数

export default function LoadReducer(preState = { isLoading :true},action){

   
    let {type,data} = action
   
    switch (type) {

        case 'IsLoading':
            
         let newdata = {...preState}
          newdata.isloading = data
          return newdata
        default:
           return preState
    }
} 