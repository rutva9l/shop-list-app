import { useState } from 'react';
import { useDispatch } from "react-redux"
import { addShop } from "../store/reducer"
import Modal from 'react-bootstrap/Modal';

const AddShopBtn = () => {
    const area = ['Area', 'Thane',
        'Pune',
        'Mumbai Suburban',
        'Nashik',
        'Nagpur',
        'Ahmednagar',
        'Solapur']
    const category = ['Category', 'Grocery',
        'Butcher',
        'Baker',
        'Chemist',
        'Stationery shop']

    const [show, setShow] = useState(false);
    const [data, setData] = useState();

    const dispatch = useDispatch()

    const getOpenStatus = (openingDate, closingDate) => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        let d1 = openingDate.split("-");
        let d2 = closingDate.split("-");

        let from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);  // -1 because months are from 0 to 11
        let to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
        let check = new Date(yyyy, mm - 1, dd);

        return check >= from && check < to ? 'Open' : 'Closed'
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setShow(false)
        dispatch(addShop({ ...data, openStatus: getOpenStatus(data.openingDate, data.closingDate) }))
        console.log('submitted', data)
        setData({})
    }


    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    return <>
        <button className="button-primary" onClick={handleOpen}>Add Shop</button>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="six columns">
                            <label for="name">Name*</label>
                            <input className="u-full-width" pattern='^[a-zA-Z ]*$' name='name' type="text" placeholder="Name" id="name" onChange={handleChange} required />
                        </div>
                        <div className="six columns">
                            <label for="area">Area*</label>
                            <select className="u-full-width" id="area" name='area' onChange={handleChange} required>
                                {area.map((el, index) => <option key={index} value={el == 'Area' ? '' : el}>{el}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="six columns">
                            <label for="category">Category*</label>
                            <select className="u-full-width" id="category" name='category' onChange={handleChange} required>
                                {category.map((el, index) => <option key={index} value={el == 'Category' ? '' : el}>{el}</option>)}
                            </select>
                        </div>
                        <div className="six columns">
                            <label for="openingDate">Opening Date*</label>
                            <input className="u-full-width" type="date" name='openingDate' placeholder="Opening Date" id="openingDate" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="six columns">
                            <label for="closingDate">Closing Date*</label>
                            <input className="u-full-width" type="date" min={data ? data.openingDate : ''} name='closingDate' placeholder="Closing Date" id="closingDate" onChange={handleChange} required />
                        </div>
                    </div>
                    <input className="button-primary" type="submit" value="Submit" />
                </form>
            </Modal.Body>
        </Modal>
    </>
}

export default AddShopBtn;