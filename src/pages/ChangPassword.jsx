import React, { useState } from 'react'
import styled from 'styled-components'
import SideBar from '../components/SideBar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const Container = styled.div`
  display: flex;
  margin: 50px;
`
const AccountContainer = styled.div`
  flex: 4;
  padding: 0px 50px;

`
const Top = styled.div`

`
const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
`
const Middle = styled.div`
    margin-top: 20px;
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

const ChangPassword = () => {

    return (
        <Container>
            <SideBar />
            <AccountContainer>
                <Top>
                    <Title>เปลี่ยนรหัสผ่าน</Title>
                </Top>
                <Middle>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            label="รหัสผ่าน"
                            id="outlined-size-small"
                            size="small"
                        />
                        <TextField
                            label="รหัสผ่านใหม่"
                            id="outlined-size-small"
                            size="small"
                        />
                        <TextField
                            label="ยืนยันรหัสผ่านใหม่"
                            id="outlined-size-small"
                            size="small"
                        />
                    </Box>
                </Middle>
                <Bottom>
                    <Button bgc="green" color="white">บันทึก</Button>
                </Bottom>
            </AccountContainer>
        </Container>
    )
}

export default ChangPassword
