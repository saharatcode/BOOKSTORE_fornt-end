import React, { useState } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { addAdress } from '../redux/apiCalls';
import { useNavigate } from 'react-router-dom';

const Container = styled.div``;
const Warpper = styled.div`
    background-color: white;
    padding: 16px;
    line-height: 40px;
`;
const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    height: 40px;
`;
const Bottom = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
`;
const Button = styled.button`
    border: 0.5px solid lightgray;
    padding: 10px 60px;
    cursor: pointer;
    background-color: ${(props) => props.bgc};
    color: ${(props) => props.color};
`;

const NewAdress = () => {

    const navigate = useNavigate()
    const userId = useSelector(state => state.user.currentUser._id)
    const [adress, setAdress] = useState({})
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        addAdress(dispatch, { ...adress, userId })
        // console.log({...adress, userId})
        navigate("/account/adress")
    }
    const handleChang = (e) => {
        setAdress(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    };

    return (
        <Container>
            <Title>เพิ่มที่อยู่</Title>
            <Warpper>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '40%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            label="ชื่อ-นามสกุล"
                            id="outlined-size-small"
                            size="small"
                            name='fullName'
                            onChange={handleChang}
                        />
                        <TextField
                            label="เบอร์โทรศัพท์"
                            id="outlined-size-small"
                            size="small"
                            name='tel'
                            onChange={handleChang}
                            onInput={(e) => {
                                e.target.value = e.target.value.slice(0, 10);
                            }}
                            type="number"
                        />
                    </div>
                    <div>
                        <TextField
                            label="ที่อยู่"
                            id="outlined-size-small"
                            size="small"
                            name='village'
                            onChange={handleChang}
                        />
                        <TextField
                            label="ตำบล"
                            id="outlined-size-small"
                            size="small"
                            name='subDistrict'
                            onChange={handleChang}
                        />
                    </div>
                    <div>
                        <TextField
                            label="อำเภอ"
                            id="outlined-size-small"
                            size="small"
                            name='district'
                            onChange={handleChang}
                        />
                        <TextField
                            label="จังหวัด"
                            id="outlined-size-small"
                            size="small"
                            name='province'
                            onChange={handleChang}
                        />
                        <TextField
                            label="รหัสไปรษณีย์"
                            id="outlined-size-small"
                            size="small"
                            name='postalCode'
                            onChange={handleChang}
                        />
                    </div>
                </Box>
                <Bottom>
                    <Button onClick={handleClick} bgc="green" color="white">บันทึก</Button>
                    <Button onClick={() => { navigate("/account/adress") }} bgc="white">ยกเลิก</Button>
                </Bottom>
            </Warpper>
        </Container>
    )
}

export default NewAdress
