import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./componen/Home/home";
import Product from "./componen/Product/product";
import SignIn from "./componen/ClientOnly/SignIn/signin";
import InputProduct from "./componen/AdminOnly/InputPoduct/inputproduct";
import Cart from "./componen/ClientOnly/Cart/cart";
import Invoice from "./componen/ClientOnly/Invoice/invoice";
import SignUp1 from "./componen/ClientOnly/SignUp/signup1";
import SignUp2 from "./componen/ClientOnly/SignUp/signup2";
import SignInAdmin from "./componen/AdminOnly/SignIn/signinadmin";
import NotMatch from "./componen/NotMatch/notmatch";
import ListProduct from "./componen/AdminOnly/ListProduct/listproduct";
import editproduct from "./componen/AdminOnly/EditProduct/editproduct";
import TransactionClient from "./componen/ClientOnly/Transaction/transactionclient";
import TransactionDetailClient from "./componen/ClientOnly/Transaction/transactiondetailclient";
import TransactionAdmin from "./componen/AdminOnly/Transaction/transactionadmin";
import TransactionDetailAdmin from "./componen/AdminOnly/Transaction/transactiondetailadmin";
import Wishlist from "./componen/ClientOnly/Wishlist/wishlist";
import ProfileClient from "./componen/ClientOnly/Profile/profile";
import EditProfile from "./componen/ClientOnly/Profile/editprofile";
import EditProfile2 from "./componen/ClientOnly/Profile/editprofile2";

const MainRoute = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/inputproduct" component={InputProduct} />
      <Route exact path="/listproduct" component={ListProduct} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup/1" component={SignUp1} />
      <Route exact path="/signup/2" component={SignUp2} />
      <Route exact path="/admin" component={SignInAdmin} />
      <Route path="/invoice/:id" component={Invoice} />
      <Route path="/product/:id" component={Product} />
      <Route path="/cart" component={Cart} />
      <Route path="/editproduct/:id" component={editproduct} />
      <Route path="/transaction/client" component={TransactionClient} />
      <Route path="/profile/client" component={ProfileClient} />
      <Route exact path="/profile/edit" component={EditProfile} />
      <Route exact path="/profile/edit/2" component={EditProfile2} />
      <Route path="/transaction/admin" component={TransactionAdmin} />
      <Route path="/wishlist" component={Wishlist} />
      <Route
        exact
        path="/transaction/detail/:id"
        component={TransactionDetailClient}
      />
      <Route
        exact
        path="/transaction/detail/admin/:id"
        component={TransactionDetailAdmin}
      />

      <Route component={NotMatch} />
    </Switch>
  );
};

export default MainRoute;
