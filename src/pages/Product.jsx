import { Add, Remove } from "@material-ui/icons";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { addToCart } from "../redux/cartRedux"
import styled from "styled-components";
import axios from "../config/axios";
import { useDispatch } from "react-redux"

const Container = styled.div``;
const Wrapper = styled.div`
  margin: 40px auto;
  width: 800px;
  display: flex;
`;
const ImgContainer = styled.div``;
const Image = styled.img`
  border: 0.5px solid #eee;
  width: 350px;
  height: auto;
`;
const InfoContainer = styled.div`
  padding: 0px 50px;
`;
const Text = styled.span`
  font-size: ${(props) => props.fz ?? "16px"};
  color: ${(props) => props.color ?? "black"};
`;
const IntroductionBook = styled.div`
  color: black;
  font-size: 16px;
  line-height: 18px;
`;
const AddContainer = styled.div`
  margin: 36px 0px;
  display: flex;
  align-items: center;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #0D2137;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  margin: 0px 40px;
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #D9381E;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;

  &:active{
      color: #D9381E;
  }
`;

const Product = () => {

  const location = useLocation();
  const dispatch = useDispatch()
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) { console.log(err) }
    }
    getProduct();
  }, [])

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      quantity < product.amount && setQuantity(quantity + 1);
    }
  };

  //update state ใน cart redux
  //ข้อมูลใน cart 
  const handleClick = () => {
    // console.log({ ...product, quantity })
    dispatch(
      // addProduct({ product, quantity, price: product.price*quantity })
      addToCart({ ...product, quantity })
      //{ ...product, quantity, color, size}  ==> quantity, color, size มันเป็น key ซ้ำใน ocj product 
    )
  };

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Text fz="30px"><b>{product.name}</b></Text><br />
          <Text fz="26px">{product.secondName}</Text><br />
          <Text fz="16px" >ผู้เขียน: {product.author}</Text><br />
          <Text fz="16px" >ผู้แปล: {product.publishedTranslator}</Text><br />
          <br />
          <Text fz="30px">{(product.price - ((product.price * (product.discount / 100)))).toFixed(2)}<Text> บาท</Text></Text><br />
          <Text fz="16px">ราคาปก {product.price}<Text> บาท</Text></Text><br />
          <Text fz="16px" color="">ลดลง {(product.price * (product.discount / 100)).toFixed(2)} บาท ({product.discount}%)</Text>
          <br />
          {product.amount === 0
            ? <AddContainer>
              <Text fz="16px" color="red">สินค้าหมดชั่วคราว</Text>
            </AddContainer>
            : <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleQuantity("dec")} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity("inc")} />
              </AmountContainer>
              <Button onClick={handleClick}><LocalMallIcon /> เพิ่มสินค้า</Button>
            </AddContainer>
          }
        </InfoContainer>
      </Wrapper>
      <Wrapper>
        <IntroductionBook>
          <Text fz="16px"><b>{product.name}</b></Text>
          <pre style={{ fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
            {product.desc}
          </pre>
        </IntroductionBook>
      </Wrapper>
    </Container>
  );
};

export default Product;