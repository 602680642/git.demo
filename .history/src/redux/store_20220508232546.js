//该文件是创建整个redux中最为核心的store对象
//引入createStore函数，用于创建store对象
import { legacy_createStore as createStore ,combineReducers} from 'redux'
//引入redux开发者工具
import {composeWithDevTools} from 'redux-devtools-extension'

//引入为组件服务的reducer
import collReducer   from './reducers/collspaced'

const allReducers = combineReducers({

    collpaced :collReducer 
})
//创建并暴露store
export default createStore(allReducers,composeWithDevTools())
