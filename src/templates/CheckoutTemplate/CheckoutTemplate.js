import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config";




export const CheckoutTemplate = (props) => {// props= path , exact , Component
    const { Component, ...restProps } = props;

    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login' />
    }

    return <Route {...restProps} render={(propsRoute) => { //props.location , props.match , props.history
        return <Fragment>

            <Component {...propsRoute} />


        </Fragment>
    }} />
}

export default CheckoutTemplate;