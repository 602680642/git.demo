//该文件用于创建reducer函数

export function collReducer(preState = false,action){

   
    const {type,data} = action

    switch (type) {

        case 'Iscollapsed':
            
          return !data
    
        default:
            break;
    }
} 