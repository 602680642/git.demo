//该文件用于创建reducer函数
const iscollapsed = 
export default function collReducer(preState = false,action){

   console.log(preState);
    const {type,data} = action

    switch (type) {

        case 'iscollapsed':
            
          return !data
    
        default:
           return preState
    }
} 