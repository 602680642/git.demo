//该文件用于创建reducer函数

export default function LoadReducer(preState = {true,action){

   
    const {type,data} = action
   
    switch (type) {

        case 'Iscollapsed':
            
          return  !data
    
        default:
           return preState
    }
} 