//该文件用于创建reducer函数

export default function LoadReducer(preState = {isloading :false},action){

   
    let {type} = action
   
    switch (type) {

        case 'IsLoading':
            
         let newdata = {...preState}
          newdata.isloading = !newdata.isloading
          return newdata
        default:
           return preState
    }
} 