import CategoryNavBar from '../components/CategoryNavBar'
import Slider from '../components/Slider'
import Products from '../components/Products'
const Home = () => {
    return (
        <div>
            {/* <CategoryNavBar/> */}
            {/* <Slider/>
            <div style={{height:"50px",display:"flex", alignItems:"center", justifyContent:"center"}}>
                <h2>----- Best saler -----</h2>
            </div> */}
            <Products/>
            <div style={{height:"100px",display:"flex", alignItems:"center", justifyContent:"center"}}>
                <h2 style={{border:"1px solid teal", padding:"10px 60px"}}>Loading</h2>
            </div>
        </div>
    )
}

export default Home
