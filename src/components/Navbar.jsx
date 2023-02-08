import styled from "styled-components"
import { Person, Search, ShoppingCartOutlined } from "@material-ui/icons"
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Badge } from '@material-ui/core'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'


const Container = styled.div`
    /* height: 60px; */
    background-color: #0D2137;
    color: white;
`
const Warpper = styled.div`
    height: 70px;
    padding: 0px 50px;
    display:flex;
    align-items: center;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Lauguage = styled.div`
   font-size: 14px;
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    background-color: #EEE;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    height: 30px;
    width: 800px;
`
const Input = styled.input`
    border: none;
    margin-left: 15px;
    font-size: 16px;
    width: 100%;
    height: 25px;
    background: transparent;
`
const Center = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`
const Logo = styled.span`
    font-size: 34px;
    font-weight: bold;
    color: #FFBE00;
`
const Rigth = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`
const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector((state) => state.user.currentUser)

    return (
        <Container>
            <Warpper>
                <Left>
                    <Link style={{ color: 'inherit', textDecoration: "none" }} to="/">
                        <Logo>B2Ok SHOP</Logo>
                    </Link>

                </Left>
                <Center>
                    <SearchContainer>
                        <Search style={{ color: "gray", fontSize: "25px", color: "#FFBE00 " }} />
                        <Input placeholder="ค้นหา..." />
                    </SearchContainer>
                </Center>
                <Rigth>
                    <Link style={{ color: 'inherit', textDecoration: "none" }} to="/account">
                        <PersonPinIcon style={{ width: "50px", height: "50px", marginLeft:"20px" }} />
                    </Link>
                    {user ? <>{user.firstName} {user.lastName}</> :
                        <>
                            <Link style={{ color: 'inherit', textDecoration: "none" }} to="/register"><MenuItem>ลงทะเบียน</MenuItem></Link>
                            <Link style={{ color: 'inherit', textDecoration: "none" }} to="/login"><MenuItem>เข้าสู่ระบบ</MenuItem></Link>
                        </>
                    }
                    <Link style={{ color: 'inherit', textDecoration: "none" }} to="/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Rigth>
            </Warpper>
        </Container>
    )
}

export default Navbar
