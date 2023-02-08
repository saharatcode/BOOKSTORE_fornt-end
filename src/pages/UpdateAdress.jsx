import React, { useState } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdress } from '../redux/apiCalls';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import { deleteAdress } from '../redux/apiCalls';
import axios from '../config/axios';
import { deleteAdressSuccess } from '../redux/adressRedux';

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

const Top = styled.div`
    display: flex;
    justify-content: space-between;
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
const Text = styled.span`
  font-size: ${(props) => props.fz ?? "14px"};
  font-weight: ${(props) => props.fw ?? "none"};
  color: ${(props) => props.color ?? "black"};
  text-decoration: ${(props) => props.td ?? "none"};
`;

const UpdateAdress = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const navigate = useNavigate()
    const addressList = useSelector(state => state.adress.adress)
    const addressTarget = addressList.find(e => e._id === id)
    const oldAdress = `${addressTarget?.fullName} (${addressTarget?.tel}) ${addressTarget?.village} ${addressTarget?.subDistrict}/${addressTarget?.district}/${addressTarget?.province}/${addressTarget?.postalCode}`
    // console.log(oleAdress)
    // console.log(id)
    const [adress, setAdress] = useState({ ...addressTarget })
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        updateAdress(dispatch, { ...adress }, id)
        // console.log({...adress}, id)
        navigate("/account/adress")
    };

    const handleChang = (e) => {
        setAdress(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    };

    const handleDelete = async (id) => {
        await axios.delete(`/address/${id}`)
        .then(()=>{ deleteAdressSuccess(id) })
        .then(()=>{navigate("/account/adress")})
        .catch((err)=>{console.log(err)})
    }

    return (
        <Container>
            <Title>แก้ไขที่อยู่</Title>
            <Warpper>
                <Top>
                <Text fz="16px"><b>แก้ไข</b>&nbsp;{oldAdress}</Text><br /><br />
                <Text fz="16px" color= "#004764" onClick={() => { handleDelete(id) }} style={{ cursor: "pointer"}} >ลบ</Text>
                </Top>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50%' },
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
                            defaultValue={addressTarget?.fullName}
                            onChange={handleChang}
                        />
                        <TextField
                            label="เบอร์โทรศัพท์"
                            id="outlined-size-small"
                            size="small"
                            name='tel'
                            defaultValue={addressTarget?.tel}
                            onChange={handleChang}
                        />
                    </div>
                    <div>
                        <TextField
                            label="ที่อยู่"
                            id="outlined-size-small"
                            size="small"
                            name='village'
                            defaultValue={addressTarget?.village}
                            onChange={handleChang}
                        />
                        <TextField
                            label="ตำบล"
                            id="outlined-size-small"
                            size="small"
                            name='subDistrict'
                            defaultValue={addressTarget?.subDistrict}
                            onChange={handleChang}
                        />
                    </div>
                    <div>
                        <TextField
                            label="อำเภอ"
                            id="outlined-size-small"
                            size="small"
                            name='district'
                            defaultValue={addressTarget?.district}
                            onChange={handleChang}
                        />
                        <TextField
                            label="จังหวัด"
                            id="outlined-size-small"
                            size="small"
                            name='province'
                            defaultValue={addressTarget?.province}
                            onChange={handleChang}
                        />
                        <TextField
                            label="รหัสไปรษณีย์"
                            id="outlined-size-small"
                            size="small"
                            name='postalCode'
                            defaultValue={addressTarget?.postalCode}
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

export default UpdateAdress