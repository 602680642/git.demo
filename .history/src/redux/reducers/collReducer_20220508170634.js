//该文件用于创建reducer函数

export  collReducer(preState = false,action){

   
    const {type,data} = action

    switch (type) {

        case 'iscollapsed':
            
          return !data
    
        default:
           return preState
    }
} 