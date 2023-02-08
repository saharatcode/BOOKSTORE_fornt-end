import React, { useState } from 'react'
import styled from 'styled-components'
import { updateUser } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Container = styled.div``;
const Warpper = styled.div`
    display: flex;
    background-color: white;
    padding: 16px;
    line-height: 40px;
`;
const WarpperColumn = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    height: 40px;
`;

const AccountContainer = styled.div`
    background-color: white;
    padding: 16px;

`
const Bottom = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
`
const Button = styled.button`
    border: 0.5px solid lightgray;
    padding: 10px 60px;
    cursor: pointer;
    background-color: ${(props) => props.bgc};
    color: ${(props) => props.color};
    
`
const Input = styled.input`
    width: 90%;
    font-family: inherit;
  border: 0.5px solid #eee;
  border-radius: 8px;
  margin: 10px 0;
  padding: 10px;
`;

const Text = styled.span`
  font-size: ${(props) => props.fz ?? "14px"};
  font-weight: ${(props) => props.fw ?? "none"};
  color: ${(props) => props.color ?? "black"};
  text-decoration: ${(props) => props.td ?? "none"};
`;

const Profile = () => {
    const [inputProfile, setInputProfile] = useState({})
    const [genderValue, setGenderValue] = useState('');
    const { firstName, lastName, phoneNumber, birthday, gender, _id } = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(_id)

    const handleChange = (e) => {
        setGenderValue(e.target.value);
        setInputProfile(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    };

    const handleClick = async () => {
        await updateUser(dispatch, inputProfile, _id)
        navigate("/account")
    };

    return (
        <Container>
            <Title>แก้ไขข้อมูลส่วนตัว</Title>
            <Warpper>
                <WarpperColumn>
                    <label htmlFor='firstName'>ชื่อ:</label>
                    <Input
                        id='firstName'
                        name='firstName'
                        defaultValue={firstName}
                        size="small"
                        onChange={handleChange}
                    />
                    <label htmlFor='lastName'>นามสกุล:</label>
                    <Input
                        id='lastName'
                        name='lastName'
                        defaultValue={lastName}
                        size="small"
                        onChange={handleChange}
                    />
                </WarpperColumn>
                <WarpperColumn>

                    <label htmlFor='phoneNumber'>เบอร์โทรศัพท์:</label>
                    <Input
                        id='phoneNumber'
                        name='phoneNumber'
                        defaultValue={phoneNumber}
                        size="small"
                        onChange={handleChange}
                        onInput={(e)=>{
                            e.target.value = e.target.value.slice(0, 10);
                        }}
                        type="number"
                    />

                    <label htmlFor='birthday'>วันเกิด เดือน/วัน/ปี คศ. :</label>
                    <Input
                        type="date"
                        defaultValue={birthday}
                        id="birthday"
                        name="birthday"
                        placeholder='ตัวอย่าง ด/ว/ป(พ.ศ), 01/31/2000'
                        size="small"
                        onChange={handleChange}
                    />
                </WarpperColumn>
            </Warpper>
                <Bottom>
                    <Button onClick={handleClick} bgc="green" color="white">บันทึก</Button>
                    <Button onClick={() => { navigate("/account") }} bgc="white">ยกเลิก</Button>
                </Bottom>
        </Container>
    )
}

export default Profile
