import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Product from '../components/Product';
import axios from '../config/axios';

const Container = styled.div``;
const Warpper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;
const Text = styled.span`
    margin: 0px 10px;
    font-size: ${(props) => props.fz ?? "14px"};
    color: ${(props) => props.color ?? "black"};
`;

const Search = () => {
    const location = useLocation()
    const search = location.search.split("?")[1];
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`/products?${search}`)
                setProducts(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        getProducts()
    }, [search]);

    return (
        <Container>
            <Text><b>ค้นพบ:&nbsp;{products.data?.length}&nbsp;รายการ</b></Text><br/><br/>
                {products.data?.length === 0 && <Text fz="18px" color='red'><b>ไม่พบหนังสือ</b></Text>}
            <Warpper>
                {products.data?.map((item) => (<Product product={item} />))}
            </Warpper>
        </Container>
    )
}

export default Search
