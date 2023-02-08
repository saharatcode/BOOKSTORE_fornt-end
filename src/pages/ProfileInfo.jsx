import styled from "styled-components";
import { useSelector } from 'react-redux'

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
const Text = styled.span`
  font-size: 16px;
`;

const ProfileInfo = () => {

    const { firstName, lastName, email, phoneNumber, birthday } = useSelector((state) => state.user.currentUser);
    const adressList = useSelector(state => state.adress.adress)
    const mainAdress = adressList?.find(e => e.isMainAdress === true)
    const currentAdress = `${mainAdress?.fullName} (${mainAdress?.tel}) ${mainAdress?.village} ${mainAdress?.subDistrict}/${mainAdress?.district}/${mainAdress?.province}/${mainAdress?.postalCode}`;

    return (
        <Container>
            <Title>ข้อมูลส่วนตัว</Title>
            <Warpper>
                <Text>
                    ชื่อ-นามสกุล: {firstName} {lastName}<br />
                    อีเมล: {email}<br />
                    เบอร์โทรศัพท์: {phoneNumber}<br />
                    วันเกิด: {birthday}<br />
                    ที่อยู่หลัก: {mainAdress ? currentAdress : "-"}
                </Text>
            </Warpper>
        </Container>
    )

}

export default ProfileInfo
