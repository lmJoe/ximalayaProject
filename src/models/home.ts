import {Model, Effect} from 'dva-core-ts';
import { Reducer } from 'redux';
export interface HomeState {
    num:number;
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
    effects: {
        asyncAdd:Effect,
    };
    // subscriptions?: SubscriptionsMapObject;
}
const initialState = {
    num:1,
}
//模拟一个异步函数的方法
function delay(timeout:number){
    return new Promise(resolve => {
        setTimeout(resolve,timeout)
    })
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
        },
    },
    //所有异步相关操作放置在effects对象中
    effects:{
        //asyncAdd有两个参数 第一个为action，第二个参数使用来处理异步操作的,此处asyncAdd的作用就是等待3秒调用add函数进行相加
        *asyncAdd({payload},{call,put}){
            yield call(delay,3000);
            //put的作用和pages文件夹中home文件的dispatch功能一样，如果是当前的model,则不用写home
            yield put({
                type:'add',
                payload,
            });
        }
    }
}
export default homeModel;