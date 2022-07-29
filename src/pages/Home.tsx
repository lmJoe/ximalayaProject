import React from 'react';
import { View, Text,Button } from 'react-native';
import { RootStackNavigation } from '../navigator';
/**使用connect获取到models文件中home文件中定义的num */
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';

/**
 * connect本身是一个函数，可以接收一个函数，同时也返回一个函数，用来帮我们
 * 把models文件夹home文件中定义的state映射到当前组件中，使用mapStateToProps参数
 * 该参数就是一个函数
 */
/**connect函数会将整个dva的仓库作为参数传递到mapStateToProps函数中 
 * connect函数获取dva仓库来源是通过在index.tsx文件中使用Provider组件
 * Provider组件通过store属性，这个store就是通过dva创建的仓库
 * 通过react中的connect可以让处于Provider组件里面的任何一个层级的子组件都能够
 * 拿到store,所以从home组件中可以拿到仓库，所以connect就能知道store里面的state属性
 * state类型就是在models里index中定义的RootState的类别
*/
const mapStateToProps = ({home,loading}:RootState) =>({
    num:home.num,
    loading:loading.effects['home/asyncAdd'],//次数的effects为models文件夹中home文件的effects对象里所有定义的方法
})

const connector = connect(mapStateToProps);
/**通过ConnectProps方法得到导入对象的类型 */

type modelState = ConnectedProps<typeof connector>
/**
 * IProps为给this.props定义一个类型
 * navigation为导航器传递过来的一个参数
 */
interface IProps extends modelState{
    navigation:RootStackNavigation,
}
class Home extends React.Component<IProps>{
    onPress = () => {
        const {navigation} = this.props;
        /**使用navigate()方法进行跳转 */
        navigation.navigate("Detail",{
            id:100,
        });
    }  
    handleadd = () => {
        const { dispatch } = this.props;
        //调用到在models文件夹中home文件中的add方法
        /**如何找到：通过 namespace+调用的函数方法名称*/
        dispatch({
            type:'home/add',
            payload:{
                num:10,
            }
        })
    } 
    asyncAdd = () => {
        const { dispatch } = this.props;
        //调用到在models文件夹中home文件中的add方法
        /**如何找到：通过 namespace+调用的函数方法名称*/
        dispatch({
            type:'home/asyncAdd',
            payload:{
                num:2,
            }
        })
    } 
    render (){
        const {num,loading} = this.props;
        /**
         * this.props;在此处使用this.props可以获取从其他组件传过来的参数
         * onPress 为点击按钮触发的时间
         */
        return (
            <View>
                <Text>Home{num}</Text>
                <Text>{loading?'正在努力加载':''}</Text>
                <Button title="跳转到详情页" onPress={this.onPress}/>
                <Button title="同步加" onPress={this.handleadd}/>
                <Button title="异步加" onPress={this.asyncAdd}/>
            </View>
        )
    }
}
/**connector最终为一个函数，这个函数会接收一个Home组件的参数
 * connector(Home)最终返回了一个新的组件，帮我们把Home组件重新加工
 * 给Home组件的props属性注入了导出来的对象num,如：
 * const mapStateToProps = ({home}:RootState) =>({
    num:home.num,
    })
    所以可以从props得到num
 */
export default connector(Home);