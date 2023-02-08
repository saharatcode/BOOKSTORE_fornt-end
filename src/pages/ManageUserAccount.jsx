import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userRedux';
import { clearAdress } from '../redux/adressRedux';

const Container = styled.div`
    min-height: 80vh;
    background-color: #eff0f4;
    padding: 0px 150px;
    display: flex;
`;
const Warpper = styled.div`
    flex: 1;
    margin-top: 40px;
`;
const CategoriesContainer = styled.ul`
    padding-left: 30px;
`;
const Categories = styled.li`
    margin: 10px 0px;
    list-style-type: none;
    font-size: 16px;
    font-weight: 500;
`;
const StyledLink = styled(Link)`
     text-decoration: none;
     color: inherit;

     & :hover{
        text-decoration: underline;
     }

     & :active{
        color: blue;
     }
`;
const OutletContainer = styled.div`
    flex: 4;
    margin: 40px 0px;
    background-color: #eff0f4;
`;

const ManageUserAccount = () => {

  const dispatch = useDispatch();

  //Logout
  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearAdress())
  };

  return (
    <Container>
      <Warpper>
        <CategoriesContainer>
          <StyledLink to={`/account`} >
            <Categories >บัญชีของฉัน</Categories>
          </StyledLink>
          <StyledLink to={`profile`} >
            <Categories>แก้ไขข้อมูลส่วนตัว</Categories>
          </StyledLink>
          <StyledLink to={`adress`} >
            <Categories>สมุดที่อยู่</Categories>
          </StyledLink>
          <StyledLink to={`orders`} >
            <Categories>การสั่งซื้อของฉัน</Categories>
          </StyledLink>
          <StyledLink to={`change-password`}>
            <Categories>เปลี่ยนรหัสผ่าน</Categories>
          </StyledLink>
          <StyledLink to={null} onClick={handleLogout}>
            <Categories>ออกจากระบบ</Categories>
          </StyledLink>
        </CategoriesContainer>
      </Warpper>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Container>
  )
}

export default ManageUserAccount
