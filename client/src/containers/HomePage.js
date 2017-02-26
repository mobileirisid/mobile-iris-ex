import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Segment} from 'semantic-ui-react';
import MainNavbar from '../components/MainNavbar';
import MainContent from '../components/MainContent';
import ValidateButtons from '../components/ValidateButtons/index';
import {requestCheck, cancelCheck} from '../redux/modules/irisValidation';

class HomePage extends Component {
    render() {
        return (
            <div>
                <Segment attached>
                    <MainContent/>
                </Segment>
                <ValidateButtons
                    onClick={this.props.onValidate}
                    onCancel={this.props.onCancel}
                    loading={this.props.loading}/>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    return {loading: state.irisValidation.loading};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onValidate: () => {
            dispatch(requestCheck());
        },
        onCancel: () => {
            dispatch(cancelCheck());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)