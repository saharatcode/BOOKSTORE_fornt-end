import { useState } from "react";
import { Form, Input} from 'antd';
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { handleLoginError } from "../redux/userRedux";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  background-color: #F8F9FA;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
 
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const FormAntd = styled(Form)`
  display: flex;
  flex-direction: column;
  font-family: inherit;
  margin-bottom: 30px;
`;

const InputAntd = styled(Form.Item)`
  flex: 1;
`;

const Button = styled.button`
  font-family: inherit;
  width: 40%;
  border: none;
  padding: 12px 20px;
  background-color: #004764;
  border-radius: 25px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;

  &:active{
    color: #004764;
  }
`;

const LinkContainer = styled.span`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
`;
const Info = styled.span`
    display: flex;
    justify-content: flex-start;
`;
const StyledLink = styled(Link)`
     text-decoration: none;
     color: inherit;
`;

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  // console.log(error)

  useEffect(()=>{
    dispatch(handleLoginError())
  },[]);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>เข้าสู่ระบบ</Title>
        <FormAntd>
          <InputAntd
            name="email"
            rules={[
              {
                type: 'email',
                message: 'โปรดระบุอีเมลให้ถูกต้อง เช่น bookstore@email.com',
              },
              {
                required: true,
                message: 'โปรดระบุอีเมล!',
              },
            ]}
          >
            <Input onChange={(e)=>{setEmail(e.target.value)}} size='large' placeholder="อีเมล" />
          </InputAntd>
          <InputAntd
            name="password"
            rules={[
              {
                required: true,
                message: 'รหัสผ่าน!',
              },
            ]}
            hasFeedback
          >
            <Input.Password onChange={(e)=>{setPassword(e.target.value)}} size='large' placeholder="รหัสผ่าน" />
          </InputAntd>
          <Button onClick={handleClick}>เข้าสู้ระบบ</Button>
          {error && <Error>อีเมลหรือรหัสผ่าน ไม่ถูกต้อง</Error>}
        </FormAntd>
          <Info>
            <StyledLink><LinkContainer>ลืมรหัสผ่าน?</LinkContainer></StyledLink>&nbsp;
            <StyledLink to="/register"><LinkContainer>สร้างบัญชี BOOKSRORE</LinkContainer></StyledLink>
          </Info>
      </Wrapper>
    </Container>
  );
};

export default Login;