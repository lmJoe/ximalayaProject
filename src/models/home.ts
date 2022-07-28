import {Model} from 'dva-core-ts';
import { Reducer } from 'redux';
export interface HomeState {
    num:number
}
/**声明一个接收参数的方法 */
interface homeModel extends Model{
    namespace: 'home';
    state: HomeState;
    //reducers在此处就是一个action的处理器，处理同步动作，用来得出最新的state
    reducers: {
        add:Reducer<HomeState>
    };
    //effects和reducers一样都是action处理器，不同的是处理异步动作，如接口请求或本地数据库操作
    // effects: {
    //     asyncAdd:Effect;
    // };
    // subscriptions?: SubscriptionsMapObject;
}
const initialState = {
    num:0,
}
const homeModel:homeModel = {
    namespace: 'home',
    state:initialState,
    reducers:{
        //两个参数 第一个是当前model最新的state,第二个就是type对象
        add(state = initialState,{payload,type}){
            //此处的payload会返回一个新对象
            return{
                ...state,//旧的对象
                num:state.num+payload.num,
            }
        }
    }
}
export default homeModel;