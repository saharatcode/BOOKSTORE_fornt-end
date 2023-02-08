import styled from "styled-components";
const Container = styled.div`
    height: 25px;
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 14px;
    font-weight: bold;
    padding: 0px 50px;
    font-size: 12px;

`
const Announcement = () => {
  return (
    <Container>
        ติดตามสถานะคำสั่ง
    </Container>
  )
}

export default Announcement