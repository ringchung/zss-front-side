import '../common/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, hashHistory, IndexRoute,useRouterHistory} from 'react-router';
import { createHistory } from 'history'
import App from '../component/App';
import Signin from 'module/signin';
import home from '../module/home';
import NotFound from 'module/404notfound'
import auth from 'common/auth'


const history = useRouterHistory(createHistory)({basename: '/'});

const Index = React.createClass({
    getInitialState(){
        return {
            isLoggedIn: false
        }
    },
    /*登录校验*/
    requireAuth(nextState, replace){
        if (!auth.verifyAuth()) {
            replace({
                pathname: '/signin',
                state: {nextPathname: nextState.location.pathname}
            })
        }
    },
    render(){
        /*路由配置*/
        const routes = [{
            path: '/',
            component: App,
            indexRoute: {component: home},
            ignoreScrollBehavior: true,
            breadcrumbName: '首页',
            onEnter: this.requireAuth,
            childRoutes: [
                /* 模块预加载方式
                 { path: '/gn1(/)', component: gn1 },
                 */

                /* 模块懒加载方式 */
                //机构管理
                require('../module/xtgnsz/mkgl'),
                require('../module/jggl/swscx'),
                require('../module/cwbb/lrb')

                //人员管理
                /*       require('../module/rygl/rycx'),

                 //系统功能设置
                 require('../module/xtgnsz/mkgl'),

                 //业务管理
                 require('../module/ywgl/ywbbgl'),
                 require('../module/ywgl/ywzlgl/sfjeyjgl'),
                 require('../module/ywgl/ywzlgl/ndbtyjgl'),
                 require('../module/ywgl/ywzlgl/ywwtyjgl'),
                 require('../module/ywgl/ywzlgl/cxbgyjgl'),

                 //会员会费管理
                 require('../module/hyhfgl/hfjlqk'),
                 require('../module/hyhfgl/grhyhfgl'),
                 require('../module/hyhfgl/fzyhyhfgl'),

                 //财务报表
                 require('../module/cwbb/lrfpb'),
                 require('../module/cwbb/xjllb'),
                 require('../module/cwbb/zcmxb'),
                 require('../module/cwbb/lrb'),
                 require('../module/cwbb/zcfzb'),
                 require('../module/cwbb/wsbbb'),


                 //手动上报报表
                 require('../module/sdsbbb/jzywtjb'),
                 require('../module/sdsbbb/jygmtjb'),
                 require('../module/sdsbbb/swsjbqkb'),
                 require('../module/sdsbbb/hyryqktj'),
                 require('../module/sdsbbb/jysrqktj'),
                 require('../module/sdsbbb/wsbbbcx'),


                 //历史记录查询
                 require('../module/lsjlcx/swslsjl/bglsjl'),
                 require('../module/lsjlcx/swslsjl/yhbsws'),
                 require('../module/lsjlcx/swslsjl/yzxsws'),
                 require('../module/lsjlcx/zyswslsjl/snbgjl'),
                 require('../module/lsjlcx/zyswslsjl/snzsjl'),
                 require('../module/lsjlcx/zyswslsjl/snzzfjl'),
                 require('../module/lsjlcx/zyswslsjl/snzjjl'),
                 require('../module/lsjlcx/zyswslsjl/snzxjl'),
                 require('../module/lsjlcx/zyswslsjl/snbdjl'),
                 require('../module/lsjlcx/fzyzjjl'),
                 require('../module/lsjlcx/fzyzxjl'),
                 require('../module/lsjlcx/fzyzzyjl'),


                 //监督检查
                 require('../module/jdjc/zyswsnjb'),
                 require('../module/jdjc/swsnj')*/
            ]
        }, {
            path: '/signin',
            component: Signin
        }, {
            path: '*',
            component: NotFound
        }];
        return <Router history={history} routes={routes}/>
    }
});
ReactDOM.render(<Index/>, document.getElementById('app'));



