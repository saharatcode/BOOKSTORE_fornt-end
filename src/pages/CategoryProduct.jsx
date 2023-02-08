import styled from "styled-components"
import Product from "../components/Product"
import { popularProducts } from "../data"
import { useEffect, useState, } from "react"
import axios from "axios"
import { useLocation } from "react-router";
import {useParams } from 'react-router-dom';


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px 100px;
`

const CategoryProduct = () => {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/products/วรรณกรรม")
                setProducts(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        getProducts()
    }, []);
    return (
        <Container>
            {products.slice(0, 15).map((item) => (<Product product={item} />))}
        </Container>
    )
}

export default CategoryProduct
