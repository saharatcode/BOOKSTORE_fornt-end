import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    background-color: #405E79;
    color: #eee;
`;
const Left = styled.div`
    flex: 1;
    direction: flex;
    flex-direction: column;
    padding: 20px;
`;
const Logo = styled.h1``
const Desc = styled.p`
    margin: 20px 0px;
`;
const SocialContainer = styled.div`
    display: flex;
`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;
const Center = styled.div`
    flex: 1;
    padding: 20px;
`;
const Title = styled.h3`
    margin-bottom: 30px;
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;
const Right = styled.div`
    flex: 1;
    padding: 20px;
`;
const ContactItem = styled.div`
    margin-bottom: 20px;
    display:flex;
    align-items: center;
`;
const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>BOOKSTORE</Logo>
                <Desc>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>All Product</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>หนังสือการพัฒนาตนเอง</ListItem>
                    <ListItem>หนังสือทางธุรกิจ</ListItem>
                    <ListItem>หนังสืออัตชีวประวัติ</ListItem>
                    <ListItem>นิยายญี่ปุ่น</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{ marginRight: "10px" }} /> 777 Doremon , Thailand 
                </ContactItem>
                <ContactItem>
                    <Phone style={{ marginRight: "10px" }} /> 0957777777
                </ContactItem>
                <ContactItem>
                    <MailOutline style={{ marginRight: "10px" }} /> project@bookstore.dev
                </ContactItem>
                <Payment src="https://support.mywifinetworks.com/hc/article_attachments/360055906133/5e1cce2c96d1d.png" />
            </Right>
        </Container>
    )
}

export default Footer