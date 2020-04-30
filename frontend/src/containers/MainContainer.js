import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from '../components/'
import { add, remove } from '../store/modules/shopping';

class MainContainer extends Component {
    
    render() {
        return <Main />
    }
}