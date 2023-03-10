import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"
import { useState } from "react";
import { sliderItems } from "../data";
import styled from "styled-components"

const Container = styled.div`
    margin: 0px 50px;
    width: auto;
    height: 40vh;
    display: flex;
    /* background-color: coral; */
    position: relative;
    overflow: hidden;
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #f7e7e7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`;

const Wrapper = styled.div`
    height: 100%;
    /* border: 1px solid red; */
    display: flex;
    transform: translateX(${props => props.slideIndex * -100}vw);
    transition: all 1.5s ease;
`
const Slide = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100%;
    background-color: #${props => props.bg};
`
const ImgContainer = styled.div`
    flex: 1 ;
    /* border: 1px solid red; */
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Image = styled.img`
    /* border: 1px solid; */
    height: 80%;
`
const InfoContainer = styled.div`
    /* border: 1px solid red; */
    flex: 3;
    /* padding: 50px; */
`
const Title = styled.h1`
    font-size: 40px;
`
const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)

    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    }
    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map(item => (
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button>SHOW NOW</Button>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider