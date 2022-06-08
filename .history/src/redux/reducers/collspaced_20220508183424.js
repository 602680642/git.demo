//该文件用于创建reducer函数

export default function collReducer(preState = false,action){

   console.log(pres);
    const {type,data} = action

    switch (type) {

        case 'iscollapsed':
            
          return !data
    
        default:
           return preState
    }
} 