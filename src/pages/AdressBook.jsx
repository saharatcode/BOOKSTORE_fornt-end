import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdress } from '../redux/apiCalls';
import { updateAdress } from '../redux/apiCalls';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddHomeIcon from '@mui/icons-material/AddHome';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Container = styled.div``;
const Warpper = styled.div`
    background-color: white;
    padding: 16px;
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
const TableRow = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const TableColumn = styled.div`
    display: flex;
    align-items: center;
`;
const CurrentAdress = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 25px;
`;
const Advice = styled.span`
    display: flex;
    align-items: center;
`;
const Text = styled.span`
  font-size: ${(props) => props.fz ?? "14px"};
  font-weight: ${(props) => props.fw ?? "none"};
  color: ${(props) => props.color ?? "black"};
  text-decoration: ${(props) => props.td ?? "none"};
`;
const StyledLink = styled(Link)`
     text-decoration: none;
     color: inherit;
     & :hover{
        text-decoration: underline;
        color: #37C6FF;
     }
`;

const AdressBook = () => {

    const dispatch = useDispatch();
    const adressList = useSelector(state => state.adress.adress)
    const userId = useSelector(state => state.user.currentUser._id)
    const mainAdress = adressList?.find(e => e.isMainAdress === true)
    const currentAdress = `${mainAdress?.fullName} (${mainAdress?.tel}) ${mainAdress?.village} ${mainAdress?.subDistrict}/${mainAdress?.district}/${mainAdress?.province}/${mainAdress?.postalCode}`

    useEffect(() => {
        getAdress(dispatch, userId);
    }, [userId, mainAdress])

    const handleMainAdress = (item) => {
        updateAdress(dispatch, { isMainAdress: true }, item._id)
    }

    return (
        <Container>
            <Title>สมุดที่อยู่</Title>
            <Warpper>
                <CurrentAdress>
                    <LocalShippingIcon style={{ margin: "0px 8px" }} />
                    <Text fz="18px">
                        ส่งที่: {
                            mainAdress
                                ? currentAdress
                                : 
                                <Advice>
                                    <Text color='red'>โปรดเลือกที่อยู่จัดส่งของคุณ Click!</Text>
                                    < CheckCircleIcon style={{ color: "#e2e5f4" }} />
                                     <ArrowRightAltIcon />
                                    < CheckCircleIcon style={{ color: "#37C6FF" }} />
                                </Advice>
                        }
                    </Text>
                </CurrentAdress>
                {adressList?.length === 0 && <Text>ไม่มีข้อมูลที่อยู่</Text>}
                {adressList?.map((item, inx) => (
                    <TableRow key={inx}>
                        <TableColumn>
                            <CheckCircleIcon
                                onClick={() => {
                                    handleMainAdress(item)
                                }}

                                style={
                                    {
                                        margin: "0px 8px",
                                        cursor: "pointer",
                                        color: item?.isMainAdress === true ? "#37C6FF" : "#e2e5f4"
                                    }
                                }
                            />
                            <Text>{`${item?.fullName} (${item?.tel}) ${item?.village} ${item?.subDistrict}/${item?.district}/${item?.province}/${item?.postalCode}`}</Text>
                        </TableColumn>
                        <TableColumn>
                            <StyledLink to={`/account/adress-edit/${item._id}`}><Text color='#00ABF0'>แก้ไข</Text></StyledLink>
                        </TableColumn>
                    </TableRow>
                ))
                }

                <Bottom>
                    <StyledLink to="/account/adress-new">
                        <AddHomeIcon style={{ fontSize: "30px" }} />
                    </StyledLink>
                </Bottom>
            </Warpper>
        </Container>
    )
}

export default AdressBook
