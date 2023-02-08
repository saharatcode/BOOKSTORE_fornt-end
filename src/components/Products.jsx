import styled from "styled-components"
import Product from "./Product"
import { useEffect, useState, } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router";
import Pagination from "../components/Pagination";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;
const PaginationContainer = styled.div`
  margin: 80px 0px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const Products = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const qPage = location.search.split("&")[1]
    let query = location.search.split("&")[0]
    const [products, setProducts] = useState([]);
    const numberOfPage = products?.numberOfPage
    const currentPage = products?.currentPage

    const handleChang = (e, page) => {
        query.match(/category*/)
        ? navigate(`/products${query}&page=${page}`)
        : navigate(`/products?page=${page}`)
    }
    
    useEffect(() => {
        const getProducts = async () => {
          try {
            const res = await axios.get(
              query.match(/category*/)
                ? `/products${query}&${qPage}&limit=12`
                : query.match(/page*/)
                  ? `/products${query}&limit=12`
                  : `/products?page=1&limit=12`
            )
            setProducts(res.data)
          } catch (err) {
            console.log(err)
          }
        };
        getProducts()
      }, [query, qPage]);

    return (
        <Container>
            {products.data?.map((item) => (<Product product={item} />))} 
            <PaginationContainer>
                <Pagination handleChang={handleChang} currentPage={currentPage} numberOfPage={numberOfPage} />
            </PaginationContainer>
        </Container>

    )
}

export default Products