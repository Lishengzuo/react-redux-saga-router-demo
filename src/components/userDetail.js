import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contrleVal: true
		};
	}

	handleClickChild(visible) {
		const { handleClick } = this.props.location.query;
		handleClick(visible);
	}

	componentDidMount() {
		this.props.dispatch({ type: 'request_data' });
		console.log(this.props);
	}

	render() {
		const { id } = this.props.match.params;
		const { data } = this.props;
		const userInfor = data[id - 1];
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
								<button onClick={ this.handleClickChild.bind(this, this.state.contrleVal) } >返回用户名列表</button>
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