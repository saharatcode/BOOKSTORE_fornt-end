import styled from 'styled-components'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { Link } from 'react-router-dom';
import { Badge } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';


const Container = styled.div`
    height: 70px;
    background-color: white;
    border: 0.5px solid #eee;
    padding: 0px 150px;
`
const Warpper = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
`
const Left = styled.div`
    display: flex;
    /* align-items: center; */
`
const Logo = styled.span`
    font-size: 28px;
    font-weight: 700;
    margin: 0px 6px;
`
const Rigth = styled.div`
    display: flex;
    
`
const SearchContainer = styled.div`
    display: flex;
    margin-right: 32px;
`
const InputContainer = styled.div`
    /* width: 700px; */
    display: flex;
    align-items: center;
    color: #afafaf;
    border: 0.5px solid #eee;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 2px 10px;

`
const Input = styled.input`
    width: 200px;
    /* padding: 6px; */
    font-size: 14px;
    background-color: transparent;
    border: 0px solid;
    outline: none;
    font-family: inherit;
`
const StyledLink = styled(Link)`
     text-decoration: none;
     color: inherit;
`;
const CartItem = styled.div`
    cursor: pointer;
`;
const Button = styled.button`
    font-family: inherit;
    height: 100%;
    width: 80px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: black;
    border: 0.5px solid #eee;
    outline: none;
    cursor: pointer;

    & :active{
        color: black;
    }
`;

const Text = styled.span`
  font-size: ${(props) => props.fz ?? "14px"};
  font-weight: ${(props) => props.fw ?? "none"};
  color: ${(props) => props.color ?? "black"};
  text-decoration: ${(props) => props.td ?? "none"};
`;

const Navigation = () => {
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector((state) => state.user.currentUser)
    const [keyword, setKeyword] = useState("")
    const handleClick = async () => {
    }


    return (
        <Container>
            <Warpper>
                <Left>
                    <MenuBookIcon style={{ fontSize: "32px", color: "#00ABF0" }} />
                    <StyledLink to="/"><Logo>BOOKSTORE</Logo></StyledLink>
                    {/* <StyledLink to="/products?page=1"><Logo>BOOKSTORE</Logo></StyledLink> */}
                </Left>
                <Rigth>
                    <SearchContainer>
                        <InputContainer>
                            <SearchIcon />
                            <Input placeholder='ค้นหาหนังสือ' onChange={(e) => { setKeyword(e.target.value) }} />
                        </InputContainer>
                        <StyledLink to={keyword === "" ? "/" : `catalog?search=${keyword}`}>
                            <Button onClick={handleClick}><Text color="white">ค้นหา</Text></Button>
                        </StyledLink>
                    </SearchContainer>

                    <StyledLink to="/cart">
                        <CartItem>
                            <Badge badgeContent={quantity} color="primary" overlap="circular">
                                <LocalMallIcon style={{ fontSize: "32px", margin: "0px 6px", color: "#626262", }} />
                            </Badge>
                        </CartItem>
                    </StyledLink>
                    <StyledLink to={user ? "/account" : "/login"}>
                        <span><PermIdentityOutlinedIcon style={{ fontSize: "32px", margin: "0px 6px", color: "#626262" }} /></span>
                    </StyledLink>
                </Rigth>


            </Warpper>
        </Container>
    )
}

export default Navigation