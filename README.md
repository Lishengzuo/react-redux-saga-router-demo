# 基于create-react-app引入redux saga router的脚手架搭建
## 背景介绍
一个完整的项目往往缺少不了数据的管理、页面的跳转还有远程数据请求，单纯靠react是实现不了的，要想拥有这些功能就必须向react项目中引入拥有相应功能的库。下面就是在react项目中引入react-redux、redux-saga和react-router的过程。

## 二、向`react`项目中添加各种库


### 1、创建一个简单的`react`项目


在保存项目的文件夹中，在文件夹空白处按住`shirf`t键`+`鼠标右键弹出一个菜单，接着点击打开**此处打开命令窗口**，在窗口中输入指令
	

	create-react-app react-redux-demo	


空格之后的指令值得就是项目名称，此时项目的名称为`react-redux-demo`，然后按`enter`执行，之后就会自动创建一个简单的`react`项目。
创建完成之后，项目的文件结构如下：

	
	├── node_modules                  // 模块安装依赖包
	├── public                        //公共文件，可以不用管
	│   ├── favicon.ico               //图标
	│   ├── index.html                //入口html
	│   ├── manifest.json             //manifest配置文件，指定应用名称、图标等信息
	├── src 						  //编写自己代码的存放文件
	│   ├── App.css                   //app的引用css文件
	│   ├── App.js					  //组件js文件
	│   ├── App.test.js               //测试文件
	│   ├── index.css                 //idnex引用的css文件
	│   └── index.js				  //页面入口文件
	│   ├── logo.svg                  //页面图片
	│   ├── serviceWorker.js          //加速程序运行文件
	├──.gitignore                     //提交到远程代码库时要忽略的文件
	├──package.json                   //用来声明项目的各种模块安装信息，脚本信息等
	├──package-lock.json              //用来锁定模块安装版本的，确保安装的模块版本一致
	├──README.md					  //盛放关于这个项目的说明文件
	

### 2、打开新建的`react`项目


进入`react-redux-demo`这个项目的文件夹之中，打开命令窗口，输入

	npm start

运行一下项目，测试一下是否运行正常。如果正常运行就会自动在浏览器窗口中打开这个项目，效果如下：

![markdown](https://github.com/Lishengzuo/react-router-demo/raw/master/docimages/runresult.png "cnd")


### 3、在新建的`react`项目中安装依赖包

安装redux，使项目可以使用store统一管理项目数据，让数据的传递和储存变得更加方便。注意要想项目可以使用redux，就必须安装两个依赖包，分别是redux和react-redux。先安装redux，在命令窗口输入

	npm install redux --save-dev

接着安装react-redux

	npm install react-redux --save-dev

然后安装redux-saga，用来专门进行统一的数据请求方便维护，并且能让组件或者action变得更整洁，安装命令如下

	npm install redux-saga --save-dev

接着安装react-router，让项目可以实现页面的跳转和控制组件显示，安装命令如下

	npm install react-router-dom --save-dev

由于这个项目需要发起数据请求我们还需要引入`axios`，操作如下

	npm install axios --save-dev

到此就完成了框架环境的搭建。


## 三、在项目中使用redux-saga

## 1、创建两个自定义的组件
在`src`文件夹中创建一个`components`文件夹，用来存放自定义的组件。现在在`components`中新建一个需要请求数据的组件`getAsyncData.js`，在`componentDidMount`中`dispatch`一个`action`，并用`connect`方法让它和`store`树进行连接，并把`store`树的数据展示在组建之中，这些数据就是一个用户名的列表，点击相应的用户名就可以路由跳转到显示该用户详细信息的页面，并且传递了一个参数。它的代码如下
	
	import React, { Component } from 'react';
	import { connect } from 'react-redux';
	
	class GetAsyncData extends Component {
		componentDidMount() {
			this.props.dispatch({ type: 'request_data' });
		}
		toDetaiInfor(userName) {
			this.props.history.push(`/user_detail/${userName}`);
		}
		render() {
			return (
				<div className="async-cont">
					<div className="user-name-list">
						<h1>用户名列表</h1>
						<ol>
							{ 
								this.props.userNameList.map((temp, index) => {
									return (
										<li onClick={ this.toDetaiInfor.bind(this, index) } key={ index }>{ temp }</li>
									);
								}) 
							}
						</ol>
					</div>
				</div>
			);
		}
	}
	const mapStateToProps = (state) => {
		const userNameList = [];
		for(let obj of state.getUserInfor.data) {
			for(let key in obj) {
				if(key === "name") {
					userNameList.push(obj[key]);
				}
			}
		}
		return ({
			userNameList: userNameList
		});
	}
	export default connect( mapStateToProps )(GetAsyncData);

创建另一个用来显示用户详细信息的组件userDetail.js，这个组件同样发起了一个需要进行数据请求的一个action，是为了防止在使用当前组件的页面进行刷新的时候引起的数据丢失。

	import React, { Component } from 'react';
	import { connect } from 'react-redux';	
	class UserDetail extends Component {
		componentDidMount() {
			this.props.dispatch({ type: 'request_data' });
		}	
		render() {
			const { id } = this.props.match.params;
			const { data, history } = this.props;
			const userInfor = data[id];
			return (
				<div className="user-list">
					{
						userInfor && 
						(
							<div>
								<p>用户的详细信息</p>
								<table>
									<tbody>
										<tr>
											<td>用户名</td>
											<td>居住城市</td>
											<td>工作公司</td>
											<td>电话</td>
											<td>邮箱</td>
										</tr>
										<tr>
											<td> { userInfor.name }</td>
											<td> { userInfor.address.city } </td>
											<td> { userInfor.company.name } </td>
											<td> { userInfor.phone } </td>
											<td> { userInfor.email } </td>
										</tr>
									</tbody>
								</table>
								<div>
									<button onClick={ () => history.push("/") } >返回用户名列表</button>
								</div>
							</div>
						)
					}
				</div>
			);
		}
	}	
	const mapStateToProps = (state) => {
		return ({
			data: state.getUserInfor.data
		});
	}	
	export default connect( mapStateToProps )(UserDetail);

## 2、编写`saga.js`
在使用`saga`的项目中，组件触发的`action`，最先接受到这个`action`的就是`saga`，所以我们就先编写`saga.js`。

在`src`中创建一个`saga`文件夹，在其中新建一个`saga.js`的文件，用来专门编写`saga`代码。在`saga.js`我们要编写有两种功能的`generator`的方法，它们的叫法一般为`workersaga`和`watchsaga`，`watchsaga`是用来监听相应的`action`的，`workersaga`就是当`watchsaga`监听到相应的`action`的时候要执行的方法，所以具体代码如下

	import Axios from 'axios';
	import { call, put, takeEvery } from 'redux-saga/effects';
	function* getUserData() {
		const data = yield call(Axios.get, "https://jsonplaceholder.typicode.com/users");
		yield put({ type: 'request_success', data: data.data });
	}
	function* watchSaga() {
		yield takeEvery('request_data', getUserData);
	}
	export default watchSaga;

在这段代码中，当页面组件触发一个`{type: "request_data"}`的`action`时候，`watchSaga`监听到了这个`action`，就调用`getAsyncData`方法，就发起了一个异步请求，再把请求回来的数据存放到第二个`action{type: "request_success", data: data.data}`中，然后通过`put`方法把这个`action`发送给`reducer`。

## 3、编写`reducer`
在`src`中新建一个`reducers`文件夹，再新建一个`reducer.js`的文件，就在这个`reducer.js`文件中编写`reducer`，用来接收action传来的数据，具体代码如下

	import { combineReducers } from 'redux';
	const intailUserinf = {
		data: []
	}
	function getUserInfor(state = intailUserinf, action) {
		switch(action.type) {
			case 'request_success':
				return Object.assign({}, state, { data: action.data })
			default:
				return state;
		}
	}
	export default combineReducers({
		getUserInfor
	});

在这对代码中，当这个`reduer`就收到一个`{type: "request_success"}`的`action`的时候，就会把发送过来的`action`中的`data`属性的值赋值给了`state`对象中的`data`属性中。最终`redcer`返回的新的`state`，又会传给`store`，从而生成一个`store`树。

## 4、项目中注册路由
在入口文件中注册一个路由，并对相应的组件配置好相应的路径，代码如下

	<Router>
		<Route path="/" exact component={ GetAsyncData } />
		<Route path="/user_detail/:id" component={ UserDetail } />
	</Router>

## 5、创建`store`并引入中间件
在入口文件引入`createStore`、`createSagaMiddleware`和`applyMiddleware`方法，然后使用它们创建一个`store`和一个`saga`中间件,再把`reducer`当作参数传给`createStore`方法使之生成`store`树。

	const store = createStore(reducer);
	const sagaMiddleware = createSagaMiddleware();

把`saga`中间件当做参数传给`applyMiddleware`方法就会在`redux`中注册一个`saga`中间件。最后再把`applyMiddleware`方法当做参数传给`createStore`方法。所以完整代码如下

	import React from 'react';
	import ReactDOM from 'react-dom';
	
	import { createStore, applyMiddleware } from 'redux';
	import Reducer from './reducers/reducer.js';
	import { Provider } from 'react-redux';
	import Async from './components/Async.js';
	import createSagaMiddleware from "redux-saga";
	import saga from './saga/saga.js';
	
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
		Reducer,
		applyMiddleware(sagaMiddleware)
	);
	sagaMiddleware.run(saga);
	ReactDOM.render(
		<Provider store={ store }>
			<Async />
		</Provider>, 
		document.getElementById('root')
	);

最后把`store`赋值给`Provider`组件中的`store`属性，并调用一下`saga`中间件`sagaMiddleware`的`run`方法

	sagaMiddleware.run(saga);

用来启动`watchSaga`的监听。到此就完成了在`react`项目中引入`redux-saga`的脚手架搭建。