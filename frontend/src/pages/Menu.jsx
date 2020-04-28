import React, { Fragment } from 'react';
import Header from '../layout/Header';
import Layout from '../layout/Layout';
import Footer from '../layout/Footer'

class Menu extends React.Component {
    render(){
        return(

            <div style={ {textAlign: 'center'} }>
                <Fragment>
                <Header />
                <Layout />
                <Footer />
                </Fragment>
            </div>
        )
    }
}


export default Menu;