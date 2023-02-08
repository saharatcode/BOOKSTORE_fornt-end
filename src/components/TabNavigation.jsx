import styled from "styled-components"

const Container = styled.div`
    height: 40px;
    border: 0.5px solid #eee;
    padding: 0px 150px;
`
const Warpper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`

const TabNavigation = () => {
  return (
    <Container>
        <Warpper>
            <span style={{margin:"0px 6px"}}>หนังสือขายดี</span>
            <span style={{margin:"0px 6px"}}>item</span>
            <span style={{margin:"0px 6px"}}>item</span>
            <span style={{margin:"0px 6px"}}>ลดราคา</span>
        </Warpper>
    </Container>
  )
}

export default TabNavigation
