import styled from "styled-components";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useState } from 'react';
import { userRequest } from "../requestMethods"
import { Link, useNavigate } from "react-router-dom"
import { clearCart } from '../redux/cartRedux';

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
    flex: 3;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
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
const Adress = styled.div`
    padding: 20px;
`;
const DeliveryOption = styled.div`
    padding: 0px 20px;
`;
const Checkout = () => {

    const cart = useSelector(state => state.cart)
    const navigate = useNavigate()
    const user = useSelector((state) => state.user?.currentUser)
    const adressList = useSelector(state => state.adress.adress);
    const mainAdress = adressList?.find(e => e.isMainAdress === true);
    const shippingAddress = `${mainAdress?.fullName} (${mainAdress?.tel}) ${mainAdress?.village} ${mainAdress?.subDistrict}/${mainAdress?.district}/${mainAdress?.province}/${mainAdress?.postalCode}`
    const dispatch = useDispatch();
    const [delivery, setDerivery] = useState({ deliveryOption: "พัสดุไปรษณีย์ด่วนพิเศษ(EMS),EMS,87" })
    const deliveryFee = delivery.deliveryOption && delivery.deliveryOption.split(",")[2]
    const transportBy = delivery.deliveryOption && delivery.deliveryOption.split(",")[0]
    const netPrice = Number(cart.total.toFixed(2)) + Number(deliveryFee)

    const handleChang = (e) => {
        setDerivery(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    };

    //to backend Chechout
    const hadleClick = async () => {
        if (!mainAdress) {
            alert("โปรดระบุที่อยู่สำหรับจัดส่ง")
            return navigate("/account/adress-new")
        }

        await userRequest.post("/checkout/payment", {
            userId: user._id,
            email: user.email,
            deliveryFee,
            transportBy,
            shippingAddress,
            cart: cart.products,
            netPrice: netPrice,
        })
            .then(async (res) => {
                if (res.data) {
                    await userRequest.post("/orders", {
                        userId: res.data.order.userId,
                        email: res.data.order.email,
                        products: res.data.order.cart,
                        netPrice: res.data.order.netPrice,
                        address: res.data.order.shippingAddress,
                        paymentUrl: res.data.session.url,
                        sessionId: res.data.session.id,
                        deliveryFee: res.data.order.deliveryFee,
                        transportBy: res.data.order.transportBy,
                    });

                    await res.data.order.cart?.map((item, index) => (
                        userRequest.put(`/products/${item._id}`, {
                            quantity: item.quantity
                        })
                    ))
                    dispatch(clearCart())
                    window.location.href = await res.data.session.url;
                }
            })
            .catch((err) => console.log(err.message))
    }
    return (
        <div>

            <Container>
                <Wrapper>
                    <Title><LocalMallIcon style={{ fontSize: "40px" }} />Checkout</Title>
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
                            <Adress>
                                <h3>จัดส่งตามที่อยู่บุคคล Shipping to Address</h3>
                                <h4>{mainAdress ? shippingAddress : "-"}</h4>
                                <Link to="/account/adress" style={{ color: "inherit", textDecoration: "inherit" }}><p style={{ color: "red" }}>เปลียนที่อยู่จัดส่ง</p></Link>
                            </Adress>
                            <DeliveryOption>
                                <form name="deliveryOption" defaultValue="thailandPost,50" onChange={handleChang}>
                                    <h3>รูปแบบการจัดส่งสินค้า Delivery</h3>
                                    <input type="radio" id="thailandPost" name="deliveryOption" value="พัสดุไปรษณีย์ธรรมดา,thailandPost,50" />
                                    <label htmlFor="thailandPost">พัสดุไปรษณีย์ธรรมดา ค่าจัดส่ง 50.00 บาท</label><br></br>
                                    <input defaultChecked type="radio" id="EMS" name="deliveryOption" value="พัสดุไปรษณีย์ด่วนพิเศษ(EMS),EMS,87" />
                                    <label htmlFor="EMS">พัสดุไปรษณีย์ด่วนพิเศษ(EMS) ค่าจัดส่ง 87.00 บาท</label><br></br>
                                </form>
                            </DeliveryOption>
                        </Info>
                        <Summary>
                            <SummaryTitle>สรุปการสั่งซื้อ</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>รวม</SummaryItemText>
                                <SummaryItemPrice>฿ {cart.total.toFixed(2)}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>ค่าขนส่ง<br /> {cart.quantity ? transportBy : "-"}
                                </SummaryItemText>
                                <SummaryItemPrice>฿ {cart.quantity ? deliveryFee : 0}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem type="total">
                                <SummaryItemText>รวมทั้งหมด</SummaryItemText>
                                <SummaryItemPrice>฿ {cart.quantity ? netPrice.toFixed(2) : 0}</SummaryItemPrice>
                            </SummaryItem>
                            {user ?
                                <Button onClick={hadleClick} disabled={!cart.products?.length}>ดำเนินการชำระเงิน</Button> :
                                <StyledLink to="/login"><Button>เข้าสู่ระบบ</Button></StyledLink>
                            }
                        </Summary>
                    </Bottom>
                </Wrapper>
            </Container>
        </div>
    )
}

export default Checkout