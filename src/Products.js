import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Product from "./components/Product";
import { deleteProduct, selectProducts } from "./redux/slices/productsSlice";
import { queryApi } from "./utils/queryApi";
export default function Products(props) {
  const dispatch = useDispatch();
  const [products] = useSelector(selectProducts);

  const deleteProductComponent = async (id) => {
    const [, err] = await queryApi("product/" + id, {}, "DELETE");
    if (err) {
      console.log(err);
    } else dispatch(deleteProduct(id));
  };
  return (
    <>
      <Footer>
        <Button onClick={() => props.history.push("/addProduct")}>
          Add new product
        </Button>
      </Footer>
      <ProductsWrapper>
        {" "}
        {products &&
          products.map((product, index) => (
            <Product
              product={product}
              key={index}
              deleteProduct={deleteProductComponent}
            ></Product>
          ))}{" "}
      </ProductsWrapper>
    </>
  );
}
const ProductsWrapper = styled.div`
  text-align: center;
  display: flex;
`;
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1.5em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const Footer = styled.footer`
  background: transparent;
  grid-area: footer;
  padding: 0.15rem;
  text-align: right !important;
`;
