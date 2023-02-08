import axios from "../config/axios";
import styled from "styled-components";
import { Form, Input, notification } from 'antd';
import {useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 80vh;
  background-color: #F8F9FA;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const FormAntd = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  font-family: inherit;
`;

const InputAntd = styled(Form.Item)`
  font-family: inherit;
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  outline: none;
`;

const Button = styled.button`
  width: 40%;
  margin: 20px 0px;
  border: none;
  padding: 12px 20px;
  background-color: #004764;
  border-radius: 25px;
  color: white;
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;
  
  &:active {
    color: #004764;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const onFinish = values => {
    // console.log('Received values of form: ', values);
    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNum: values.phoneNum,
      email: values.email,
      password: values.password,
    };

    axios.post("/auth/register", body)
      .then(() => {
        notification.success({
            message:`คุณ ${values.firstName} ${values.lastName} สมัครสมาชิกสำเร็จ`
        });
        navigate("/login");
      })
      .catch(err => {
        notification.error({
          message: `การสมัครสมาชิกล้มเหลว`
        });
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>สมัครสมาชิก BOOKSTORE</Title>
        <FormAntd onFinish={onFinish}>
          <InputAntd
            name="firstName"
            rules={[{ required: true, message: 'โปรดระบุชื่อ!', whitespace: true }]}
          >
            <Input size='large' placeholder="ชื่อ" />
          </InputAntd>
          <InputAntd
            name="lastName"
            rules={[{ required: true, message: 'โปรดระบุนามสกุล!', whitespace: true }]}
          >
            <Input size='large' placeholder="นามสกุล" />
          </InputAntd>
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
            <Input size='large' placeholder="อีเมล" />
          </InputAntd>
          <InputAntd
            name="phoneNum"
            rules={[
              { required: true, message: 'โปรดระบุเบอร์โทรศัพท์!', whitespace: true},
              {min:10, message: "ต้องมี 10 หลัก"},
              {pattern: /^[0-9]+$/, message: "เป็นเลข 0-9 เท่านั้น"},
            ]}
            
          >
            <Input showCount maxLength={10} size='large' placeholder="เบอร์โทรศัพท์" />
          </InputAntd>
          <InputAntd
            name="password"
            rules={[
              {
                required: true,
                message: 'รหัสผ่าน!',
              },
              {min:6, message: "ความยาวอย่างน้อย 6 ตัว"},
            ]}
            hasFeedback
          >
            <Input.Password size='large' placeholder="รหัสผ่าน" />

          </InputAntd>
          <InputAntd
            name="confirmPassword"
            hasFeedback
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: 'โปรดยืนยันรหัสผ่าน!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("ไม่ตรงกับรหัสผ่าน")

                }
              })
            ]}
          >
            <Input.Password size='large' placeholder="Confirm password" />
          </InputAntd>
          <Button htmlType="submit">สร้างบัญชี</Button>
        </FormAntd>
      </Wrapper>
    </Container>
  );
};

export default Register;