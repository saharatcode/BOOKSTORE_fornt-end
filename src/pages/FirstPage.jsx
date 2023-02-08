import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { categories } from "../categories";

const Container = styled.div`
    margin-top: 10px;
    min-height: 100vh;
    padding: 0px 150px;
    display: flex;
`;
const Warpper = styled.div`
    flex: 1;
`;
const CategoriesContainer = styled.ul`
    padding-left: 30px;
`;
const Categories = styled.li`
    margin: 10px 0px;
    list-style-type: none;
    font-size: 14px;
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
const Title = styled.span`
  font-size: 20px;
  margin: 0px 10px;
`;
const OutletTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
`;
const BookList = styled.div`
  min-height: 80vh;
`;
const OutletContainer = styled.div`
    flex: 3;
`
const FirstPage = () => {

    const location = useLocation();
    const cat = location.search.split("=")[1]
    const categoryName = categories.find((e) => e.value === cat)?.name

    return (
        <Container>
            <Warpper>
                <Title>หมวดหมู่สินค้า</Title>
                <CategoriesContainer>
                    <StyledLink to={`/`}>
                        <Categories>ทั้งหมด</Categories>
                    </StyledLink>
                    {categories.map((item, inx) => (
                        <StyledLink key={inx} to={`/products?category=${item.value}`}>
                            <Categories>{item.name}</Categories>
                        </StyledLink>
                    ))}
                </CategoriesContainer>
            </Warpper>
            <OutletContainer>
                <OutletTitle>
                    <Title>{categoryName ?? null}</Title>
                </OutletTitle>
                <BookList>
                    <Outlet />
                </BookList>
            </OutletContainer>
        </Container>
    )
}

export default FirstPage