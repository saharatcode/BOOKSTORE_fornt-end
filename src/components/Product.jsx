import { Link } from "react-router-dom"
import styled from "styled-components"
import { addToCart } from "../redux/cartRedux"
import { useDispatch } from "react-redux"
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PlusOneIcon from '@mui/icons-material/PlusOne';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
    width: 200px;
    height: 450px;
`;
const Image = styled.img`
    height: 280px;
    width: 100%;
    border: 0.5px solid #eee;
`;
const Info = styled.div`
    padding: 0px 8px;
`;
const Text = styled.span`
  font-size: ${(props) => props.fz ?? "14px"};
  font-weight: ${(props) => props.fw ?? "none"};
  color: ${(props) => props.color ?? "black"};
  text-decoration: ${(props) => props.td ?? "none"};
`;
const Button = styled.button`
  padding: 5px;
  width: 100%;
  border: none;
  border-radius: 25px;
  background-color: #004764;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: 0.5s;
  &:hover{
      background-color: #37C6FF;
      color: #ffffff;
      border: none;
  }
`;
const Icon = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Stock = styled.p`
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: red;
`;
const StyledLink = styled(Link)`
     text-decoration: none;
     color: inherit;
`; 

const Product = ({ product }) => {

    const dispatch = useDispatch();
    const handleClick = () => {
        // console.log({ ...product, quantity: 1 })
        dispatch(
            addToCart({ ...product, quantity: 1 })
        );
    };

    return (
        <Card>
            <StyledLink to={"/product/" + product._id}>
                <Image src={product.img} />
                <Info>
                    <Text fz="16px">{product.name}</Text><br />
                    <Text fz="12px" td="line-through">ราคาปก {product.price}บาท</Text>
                    <Text> ลด {product.discount}%</Text><br />
                    <Text fz="18px" fw="600">{(product.price - ((product.price * (product.discount / 100)))).toFixed(2)} บาท</Text>
                    {product.amount === 0 && <Text fz="14px" color="red">&nbsp;สินค้าหมด</Text>}
                </Info>
            </StyledLink>
            {product.amount === 0 ? <Button disabled onClick={handleClick}>สินค้าหมด</Button> :
                <Button onClick={handleClick}>
                    <Icon><PlusOneIcon /><LocalMallIcon /></Icon>
                </Button>}
        </Card>
    )
}

export default Product