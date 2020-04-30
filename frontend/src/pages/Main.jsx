import React, { Fragment } from 'react';
import Header from '../layout/Header';
import Layout from '../layout/Layout';
import Footer from '../layout/Footer'

class Main extends React.Component {
    render(){
        return(
            <Fragment>
            <Header />
            <Layout />
            <Footer />
            </Fragment>
        )
    }
}


export default Main;