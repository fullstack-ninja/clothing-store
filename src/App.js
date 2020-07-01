import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selectors";

import "./App.css";

import HomePage from "./pages/homepage/hompage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignUpAndSignInPage from "./pages/sign-in-and-sign-up/sign-up-and-sign-in.component";
import CheckoutPage from "./components/checkout/checkout.component";
import { checkUserSession } from "./redux/user/user.actions";

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }
  render() {
    const { currentUser } = this.props;
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignUpAndSignInPage />
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);