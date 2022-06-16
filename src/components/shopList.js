import { useDispatch, useSelector } from "react-redux"
import { removeShop } from "../store/reducer";
import { MdCancel } from 'react-icons/md'

const ShopList = () => {
    const dispatch = useDispatch()
    const shops = useSelector(state => {
        console.log(state)
        return state
    });

    const handleRemove = (index) => dispatch(removeShop(index))

    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Area</th>
                <th>Category</th>
                <th>Opening Date</th>
                <th>Closing Date</th>
                <th>Open Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {shops.map((item) => <tr>
                <td>{item.shopDetails.name}</td>
                <td>{item.shopDetails.area}</td>
                <td>{item.shopDetails.category}</td>
                <td>{item.shopDetails.openingDate}</td>
                <td>{item.shopDetails.closingDate}</td>
                <td>{item.shopDetails.openStatus}</td>
                <td><MdCancel style={{ cursor: 'pointer', width: 20, height: 20 }} onClick={() => handleRemove(item.id)} /></td>
            </tr>)}
        </tbody>
    </table>
}

export default ShopList