import styled from 'styled-components';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userRedux';
import { clearAdress } from '../redux/adressRedux';

const Container = styled.div`
    flex: 1;
    /* background-color: #eee; */
`
const Title = styled.li`
    margin: 4px;
`
const Logout = styled.div`
    display: flex;
    align-items: center;
`

const SideBar = () => {
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleLogout = () => {
        // localStorage.removeItem('persist:root')
        dispatch(logout())
        dispatch(clearAdress())
    }

    return (
        <Container>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <Link style={{ color: 'inherit', textDecoration: "none" }} to="/account">
                        <ListItemButton
                        // selected={selectedIndex === 0}
                        // onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <Title>บัญชีของฉัน</Title>
                        </ListItemButton>
                    </Link>
                    <Link style={{ color: 'inherit', textDecoration: "none" }} to="/profile">
                        <ListItemButton
                        // selected={selectedIndex === 1}
                        // onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <Title>ข้อมูลส่วนตัว</Title>
                        </ListItemButton>
                    </Link>
                    <Link style={{ color: 'inherit', textDecoration: "none" }} to="/adress">
                        <ListItemButton
                        // selected={selectedIndex === 2}
                        // onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <Title>สมุดที่อยู่</Title>
                        </ListItemButton>
                    </Link>
                    <ListItemButton
                    // selected={selectedIndex === 3}
                    // onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <Title>บัตรเครดิตของฉัน</Title>
                    </ListItemButton>
                    <ListItemButton
                    // selected={selectedIndex === 4}
                    // onClick={(event) => handleListItemClick(event, 4)}
                    >
                        <Title>รายการที่ชอบ</Title>
                    </ListItemButton>
                </List>
                <Divider />
                <List component="nav" aria-label="secondary mailbox folder">
                    <ListItemButton
                    // selected={selectedIndex === 5}
                    // onClick={(event) => handleListItemClick(event, 5)}
                    >
                        <Title>การสั่งซื้อของฉัน</Title>
                    </ListItemButton>
                    <ListItemButton
                    // selected={selectedIndex === 6}
                    // onClick={(event) => handleListItemClick(event, 6)}
                    >
                        <Title>การคืนสินค้า</Title>
                    </ListItemButton>
                </List>
                <Divider />
                <List component="nav" aria-label="secondary mailbox folder">
                    <ListItemButton
                    // selected={selectedIndex === 7}
                    // onClick={(event) => handleListItemClick(event, 7)}
                    >
                        <Title>เปลี่ยนรหัสผ่าน</Title>
                    </ListItemButton>
                    <ListItemButton
                        onClick={handleLogout}
                    >
                        <Title>
                            <Logout>
                                ออกจากระบบ
                                <LogoutIcon style={{ marginLeft: "6px" }} />
                            </Logout>

                        </Title>
                    </ListItemButton>
                </List>
            </Box>
        </Container>
    )
}

export default SideBar
