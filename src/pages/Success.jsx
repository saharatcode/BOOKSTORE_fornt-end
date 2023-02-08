import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
// import { clearCart } from "../redux/cartRedux";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "../config/axios"
import styled from "styled-components";

const Component = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Warpper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Text = styled.div`
  font-size: 30px;
  font-weight: 700;
`
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`


const Success = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const qCheckoutSessionId = location.search
  const checkoutSessionId = qCheckoutSessionId?.split("=")[1]

  useEffect(() => {
    const getCheckout = async () => {
      try {
        const res = await axios.get(`/checkout/checkout-session/${qCheckoutSessionId}`)
        if(res.data.payment_status === "paid"){
          await axios.put(`/orders/${checkoutSessionId}`, {paymentStatus: true, status: "Pack by saller"})
        }
      } catch (err) {
        console.log(err)
      }
    }
    getCheckout()
    // dispatch(clearCart())
  }, [checkoutSessionId]);

  return (
    <Component>
      <Warpper>
        <Box>
        <CheckCircleIcon style={{fontSize:"36px", color:"#A7F432"}}/>
        <Text>Payment Successfull</Text>
        </Box>
        <Text>ขอบคุณที่ใช้บริการ</Text>
      </Warpper>
    </Component>
  )
}

export default Success