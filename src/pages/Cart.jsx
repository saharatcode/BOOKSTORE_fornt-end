import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import ClearIcon from '@mui/icons-material/Clear';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { addToCart, decreaseProduct, deleteProduct } from "../redux/cartRedux";
import { Link, useNavigate } from "react-router-dom"

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px 150px;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: 300;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
`;
const TopButton = styled.button`
  font-family: inherit;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  background-color: white;
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px;
  border: 0.5px solid #eee;
  border-radius: 5px;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 100px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const Text = styled.span`
  font-size: ${(props) => props.fz ?? "16px"};
  color: ${(props) => props.color ?? "black"};
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 0.5px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
  background-color: white;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  font-family: inherit;
  width: 100%;
  padding: 10px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  background-color: #004764;
  color: white;
  border: none;
  transition: 0.5s;
  
  &:hover{
      background-color: #37C6FF;
      color: #070000;
      border: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
const StyledLink = styled(Link)`
     text-decoration: none;
     color: inherit;
`;
const Delete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #eee;
  cursor: pointer;
  height: 20px;
  width: 20px;
  margin: 10px 10px 0px 0px;
`;

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const navigate = useNavigate()
  const user = useSelector((state) => state.user?.currentUser)
  const dispatch = useDispatch();
  const netPrice = Number(cart.total.toFixed(2))

  const handleDelete = (product) => {
    dispatch(
      deleteProduct(product)
    )
  };

  const handleClick = (e) => {
    navigate("/checkout")
  };

  return (
    <Container>
      <Wrapper>
        <Title><LocalMallIcon style={{ fontSize: "40px" }} />กระเป้าสินค้า</Title>
        <Top>
          <StyledLink to="/"><TopButton>เลือกสินค้าต่อ</TopButton></StyledLink>
          <TopTexts>
            <TopText>สินค้าในกระเป้า({cart.quantity})</TopText>
            <TopText>สินค้าที่ชอบ (0)</TopText>
          </TopTexts>
          <TopButton type="filled">ชำระเงิน</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <Text>{product.name}</Text>
                    <Text>ราคาปก {product.price} บาท</Text>
                    <Text>ลด {product.discount}% ประหยัด {(product.price * (product.discount / 100)).toFixed(2)} บาท</Text>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={() => product.quantity > 1 && dispatch(decreaseProduct({ ...product, quantity: 1 }))} />
                  </ProductAmountContainer>
                  <ProductPrice>฿ {((product.price - (product.price * (product.discount / 100)).toFixed(2)) * product.quantity).toFixed(2)}</ProductPrice>
                </PriceDetail>
                <Delete onClick={() => handleDelete(product)}>
                  <ClearIcon />
                </Delete>
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>สรุปการสั่งซื้อ</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>รวม</SummaryItemText>
              <SummaryItemPrice>฿ {cart.total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>ค่าขนส่ง</SummaryItemText>
              <SummaryItemPrice>฿ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>รวมทั้งหมด</SummaryItemText>
              <SummaryItemPrice>฿ {cart.quantity ? netPrice.toFixed(2) : 0}</SummaryItemPrice>
            </SummaryItem>
            {user ?
              <Button onClick={handleClick} disabled={!cart.products?.length}>ขั้นตอนถัดไป</Button> :
              <StyledLink to="/login"><Button>เข้าสู่ระบบ</Button></StyledLink>
            }
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;