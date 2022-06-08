//该文件用于创建reducer函数

export default function LoadReducer(preState = {isloading :true},action){

   
    const {type,data} = action
   
    switch (type) {

        case 'IsLoading':
            
          return  !data
    
        default:
           return preState
    }
} 