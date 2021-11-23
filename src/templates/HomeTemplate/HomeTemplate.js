import { Fragment } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";



export const HomeTemplate = (props) => {// props= path , exact , Component
    const { Component, ...restProps } = props;

    return <Route {...restProps} render={(propsRoute) => { //props.location , props.match , props.history
        return <Fragment>
            <Header {...propsRoute} />



            <Component {...propsRoute} />

            <hr />
            <Footer />
        </Fragment>
    }} />
}
