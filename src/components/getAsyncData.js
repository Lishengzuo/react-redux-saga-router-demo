import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import UserDetail from './userDetail.js';

class GetAsyncData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contrleVal: true
		}
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.props.dispatch({ type: 'request_data' });
	}

	toDetaiInfor(userName) {
		this.setState({
			contrleVal: false
		});
		const pathValue = {
			pathname: `/${userName}`,
			query: {
				handleClick: this.handleClick
			}
		}
		this.props.history.push(pathValue);
	}

	handleClick(visible) {
		this.setState({
			contrleVal: visible
		})
	}

	render() {
		const { contrleVal } = this.state;
		return (
			<div className="async-cont">
				{
					contrleVal ? <div className="user-name-list">
						<h1>用户名列表</h1>
						<ol>
							{ 
								this.props.userNameList.map((temp, index) => {
									return (
										<li onClick={ this.toDetaiInfor.bind(this, index + 1) } key={ index }>{ temp }</li>
									);
								}) 
							}
						</ol>
					</div> : 
					<Route path="/:id" component={ UserDetail } />
				}
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