import React, {Component} from 'react'
import {connect} from 'react-redux';
import CenterColumn from '../components/CenterColumn';
import MainNavbar from '../components/MainNavbar';

class AuthenticatedContainer extends Component {
    render() {
        const {currentUser} = this.props;

        return (
            <div>
                <MainNavbar subscribers={this.props.subscribers} onClick={this.props.onClick}/>
                <CenterColumn>
                    {this.props.children}
                </CenterColumn>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.session
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            console.log('hello world');
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedContainer)