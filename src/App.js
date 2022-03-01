//#region App.js intial
// App.js initial
// import './App.css';
// import Product from "./Products";
// import styled from "styled-components";
// function App() {
//     return (
//         <AppFrame className="App">

//                 <Product></Product>

//          </AppFrame>
//     );
// }
// const AppFrame = styled.div `
//  text-align: center;
//  display: flex;
// `;
// export default App;

//End App.js initial
//#endregion

//#region Routing

/* App.js after rooting */
/* We added the “BrowserRouter” with default path of “/” 
We added a switch that will contain all our routes. 
We have three types of routes here: 
 Normal route like « /welcome » it has a path, and the render function which will determine 
what to render on that specific route. 
 A route with a path param that we will use to get a product by it’s name 
 A default route which will be our fallback route, if a user writes down a page that doesn’t exist 
our page will render <p>Default rendered page!</p>*/
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import "./App.css";
// import styled from "styled-components";
// import Products from "./Products";
// import ProductDetails from "./components/ProductDetails";
// function App() {
//  return (

//  <AppFrame className="App">
//  <BrowserRouter basename="/">
//  <Switch>

//  <Route
//  path="/products"
//  render={(props) => <Products {...props} />}
//  ></Route>
//  <Route
//  path="/product/:name"
//  render={(props) => <ProductDetails {...props} />}
//  ></Route>
//  <Route exact render={() => <p>Default rendered page!</p>}></Route>
//  </Switch>
//  </BrowserRouter>
//  </AppFrame>

//  );
// }
// const AppFrame = styled.div`
//  text-align: center;
//  display: flex;
//  flex-direction: column;
// `;
// export default App;

//#endregion

//#region Lazy Loading and suspense
//. Apply lazy loading

import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Navbar";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/slices/productsSlice";
/*This will automatically apply lazy loading on the component. Note that we can use the same logic inside 
the pages if we have a lot of conditional rendering. */
const Home = React.lazy(() => import("./Home"));
const Products = React.lazy(() => import("./Products"));
const ProductDetails = React.lazy(() => import("./components/ProductDetails"));
const AddProduct = React.lazy(() => import("./components/AddProduct"));
const UpdateProduct = React.lazy(() => import("./components/UpdateProduct"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <Header></Header>
      <AppFrame className="App">
        <BrowserRouter basename="/">
          {/* We also added a “Suspense” tag, this well tell our app to render the “fallback” while loading our 
component. Most use case of this is to render a loading screen or something similar.  */}
          <Suspense fallback={<p>...Loading page please wait</p>}>
            <Switch>
              {/* We added the “BrowserRouter” with default path of “/” 
We added a switch that will contain all our routes. 
We have three types of routes here: 
 Normal route like « /welcome » it has a path, and the render function which will determine 
what to render on that specific route. 
 A route with a path param that we will use to get a product by it’s name 
 A default route which will be our fallback route, if a user writes down a page that doesn’t exist 
our page will render <p>Default rendered page!</p> */}

              <Route
                path="/"
                exact
                render={(props) => <Home {...props} />}
              ></Route>
              <Route
                path="/products"
                render={(props) => <Products {...props} />}
              ></Route>
              <Route
                path="/product/:id"
                render={(props) => <ProductDetails {...props} />}
              ></Route>
              <Route
                path="/addProduct"
                render={(props) => <AddProduct {...props} />}
              ></Route>
              <Route
                path="/updateProduct/:id"
                render={(props) => <UpdateProduct {...props} />}
              ></Route>
              <Route exact render={() => <p>Page not found!</p>}></Route>
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AppFrame>
    </>
  );
}
const AppFrame = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;
export default App;
//#endregion
