import React, { useState } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Container = styled.div``
const Warpper = styled.div`
    margin-bottom: 6px;
    background-color: white;
    padding: 16px;
`;
const Top = styled.div``
const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    height: 40px;
`;
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
const ChangePassword = () => {
    return (
        <Container>
            <Title>เปลี่ยนรหัสผ่าน</Title>
            <Warpper>
                <Middle>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '50%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            label="รหัสผ่านเก่า"
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
            </Warpper>
        </Container>
    )
}

export default ChangePassword