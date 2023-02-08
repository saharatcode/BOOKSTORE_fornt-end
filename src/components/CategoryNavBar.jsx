import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from "styled-components"
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Container = styled.div`
    /* background-color: #2E77AE; */
`
const CategoryList = styled.div`
    margin: auto;
    display: block;
    height: 30px;
    display: flex;
    width: 800px;
    align-items: center;
    justify-content: space-between;
`
const Category = styled.div`
    cursor: pointer;
    font-size: 16px;
`
const Dropdown = styled.div`
    /* overflow: hidden; */
`
const DropdownItem = styled.div`
    display: none;
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    padding: 20px 350px;
    background-color: #000000;
    
    ${Dropdown}:hover & {
    display: block;
  }
`
const Item = styled.div`
    color: white;
`

const CategoryNavBar = () => {
    const [value, setValue] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container>
            <CategoryList>
                <Dropdown>
                    <Category>สินค้าทั้งหมด</Category>
                    <DropdownItem>
                        <Link to="?literature"><Item>วรรณกรรม</Item></Link>
                        <Item>จิตวิทยา พัฒนาตัวเอง</Item>
                        <Item>นิยาย</Item>
                        <Item>มังงะ ไลฟ์โนเวล</Item>
                        <Item>ความรู้ทั่วไป</Item>
                    </DropdownItem>

                </Dropdown>


                <Category>วรรณกรรม </Category>
                <Category>จิตวิทยา พัฒนาตัวเอง</Category>
                <Category>นิยาย</Category>
                <Category>มังงะ ไลฟ์โนเวล</Category>
                <Category>ความรู้ทั่วไป</Category>
            </CategoryList>
        </Container>
    )
}

export default CategoryNavBar