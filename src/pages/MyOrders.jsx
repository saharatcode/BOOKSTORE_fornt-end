import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from "../config/axios"
import PaginationComponent from '../components/Pagination';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { date, dateOfReceipt } from '../services/Date';

const Container = styled.div``;
const Warpper = styled.div`
    margin-bottom: 6px;
    background-color: white;
    padding: 16px;
`;
const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    height: 40px;
`;
const OrderTop = styled.div`
  display: flex;
  justify-content: space-between;
`
const Text = styled.span`
  font-size: ${(props) => props.fz ?? "14px"};
  font-weight: ${(props) => props.fw ?? "none"};
  color: ${(props) => props.color ?? "black"};
  text-decoration: ${(props) => props.td ?? "none"};
  background-color: ${(props) => props.bgc ?? "none"};
  border-radius: ${(props) => props.br ?? "none"};
  padding: ${(props) => props.pd ?? "none"};
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px;
`
const Logo = styled.div``
const Status = styled.div``
const PaymentNow = styled.div`
  cursor: pointer;
  background-color: #F5FEFD;
  padding: 0px 10px;
  border-radius: 25px;
  height: fit-content;

  & :hover{
    text-decoration: underline;
    color: blue;
  }

`

const ProductDetail = styled.div`
  flex: ${(props) => props.flex};
`;
const InfomationOrder = styled.div`
  margin: 10px 0px;
`;

const Image = styled.img`
  width: 50px;
  border: 1px solid #eee;
`;

const Details = styled.div`
display: flex;
`;
const Total = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
`;
const StyleLink = styled(Link)`
  font-family: inherit;
  color: inherit;
  text-decoration: inherit;
`;

const MyOrders = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const qPage = location.search.split("?")[1]
  const userId = useSelector(state => state.user.currentUser._id)
  const [orders, setOrders] = useState()
  const numberOfPage = orders?.numberOfPage
  const currentPage = orders?.currentPage
  // console.log(orders)

  const getOrders = async () => {
    try {
      const res = await axios.get(`/orders/find/${userId}?limit=3&${qPage}`)
      setOrders(res.data)
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getOrders()
  }, [qPage]);

  const handleChang = (e, page) => {
    navigate(`/account/orders?page=${page}`)
  };

  const handleCancel = async (orderId) => {
    try {
      await axios.put(`/orders/${orderId}`, { status: "Cancel" })
      getOrders()
    } catch (err) {
      alert("Error...")
      console.log(err.message)
    }
  };

  return (
    <Container>
      <Title>รายการคำสั่งซื้อ</Title>
      {orders?.data?.length === 0 && "ไม่มีรายการคำสั่งซื้อ"}
      {
        orders?.data?.map((item, inx) => (
          <Warpper key={inx}>
            <OrderTop>
              <Logo>
                <Text><b>Order&nbsp;{"#"}{item._id}</b></Text>&nbsp;

                {
                  item?.paymentStatus &&
                  <>
                    {
                      item?.status === "Successful delivery"
                        ? <Text color='#004764'>ส่งสินค้าเรียบร้อย</Text>
                        : item?.status === "Cancel"
                          ? <Text color='#004764'>ยกเลิกสำเร็จ ระบบได้ทำการคืนเงิน</Text>
                          : <Text color='#004764'>ได้รับสินค้าภายใน 3 วัน&nbsp;{dateOfReceipt(item.createdAt)}</Text>
                    }
                  </>

                }
                <br />
                {/* ----> Top information */}
                <InfomationOrder>
                  <Text fz="14px">&nbsp;ส่งที่:&nbsp;{item.address}</Text><br />
                  <Text fz="14px">&nbsp;วันที่สั่งซื้อ&nbsp;{date(item.createdAt)}</Text><br />
                  <Text fz="14px">&nbsp;ขนส่งโดย {item?.transportBy}</Text><br />
                  {item?.status === "In delivery" && <Text>&nbsp;เลขพัสดุ: {item?.trackNumber}</Text>}
                </InfomationOrder>
              </Logo>

              {/* ----> Status Order */}
              {
                !item?.paymentStatus
                  ? <PaymentNow onClick={() => { window.location.href = item.paymentUrl }}>
                      <b>Payment Now</b>
                  </PaymentNow>
                  :
                  <Status>
                    {
                      item?.status === "Pack by saller" &&
                      <>
                        <Text pd="0px 6px" onClick={() => { handleCancel(item._id) }} style={{ cursor: "pointer" }}>ยกเลิก</Text>
                        <Text pd="0px 10px" bgc="#61cef9" br="25px">{item?.status}
                        </Text>
                      </>
                    }
                    {item?.status === "In delivery" && <Text pd="0px 10px" bgc="orange" br="25px">{item?.status}</Text>}
                    {item?.status === "Successful delivery" && <Text pd="0px 10px" bgc="#98FF98" br="25px">{item?.status}</Text>}
                    {item?.status === "Cancel" && <Text pd="0px 10px" bgc="yellow" br="25px">{item?.status}</Text>}
                  </Status>
              }
            </OrderTop>
            {
              item?.products.map((product, inx) => (
                <Product key={inx}>
                  <ProductDetail flex="2">
                    <Details>
                      <Image src={product.img} />
                      <span>
                        <Text>&nbsp;{product.name}</Text><br />
                      </span>
                    </Details>
                  </ProductDetail>
                  <ProductDetail flex="1">
                    <Text>ราคา</Text><br />
                    <Text>{(product.price - ((product.price * (product.discount / 100)))).toFixed(2) * product.quantity}&nbsp;บาท</Text>
                  </ProductDetail>
                  <ProductDetail flex="1">
                    <Text>จำนวน</Text><br />
                    <Text>{product.quantity}&nbsp;เล่ม</Text>
                  </ProductDetail>

                </Product>

              ))
            }
            <Total>
              <Text>ค่าส่ง {item?.deliveryFee} บาท</Text>
              <Text>รวม&nbsp;{item.products.length}&nbsp;รายการ {item.netPrice} บาท</Text>
            </Total>
          </Warpper>
        ))
      }

      {
        orders?.data?.length > 0 &&
        <PaginationComponent
          handleChang={handleChang}
          currentPage={currentPage ?? 1}
          numberOfPage={numberOfPage ?? 1}
        />
      }

    </Container>
  )
}

export default MyOrders
