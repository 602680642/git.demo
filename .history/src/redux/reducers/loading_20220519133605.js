//该文件用于创建reducer函数

export default function LoadReducer(preState = {isloading :true},action){

   
    let {type,data} = action
   
    switch (type) {

        case 'IsLoading':
            
         letnew
          return  !data
    
        default:
           return preState
    }
} 