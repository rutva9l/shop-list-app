import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterShop } from '../store/reducer';
import Modal from 'react-bootstrap/Modal';

const Filter = () => {
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
    const [data, setData] = useState()

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        console.log(data)
        event.preventDefault()
        dispatch(filterShop(data))
        setShow(false)
        setData({})
    }

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    // const [areaChecked, setAreaChecked] = useState(
    //     new Array(area.length).fill(false)
    // );
    // const [categoryChecked, setCategoryChecked] = useState(
    //     new Array(area.length).fill(false)
    // );

    // const handleOnChange = (position, type) => {
    //     if (type == 'area') {
    //         const updatedAreaChecked = areaChecked.map((item, index) =>
    //             index === position ? !item : item
    //         );

    //         setAreaChecked(updatedAreaChecked);
    //     }

    //     if (type == 'category') {
    //         const updatedCategoryChecked = categoryChecked.map((item, index) =>
    //             index === position ? !item : item
    //         );

    //         setCategoryChecked(updatedCategoryChecked);
    //     }
    // };

    return <>
        <button onClick={handleOpen}>Filter</button>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div class="row">
                        <div class="six columns">
                            <label>Area</label>
                            <select className="u-full-width" id="area" name='area' onChange={handleChange}>
                                {area.map((el, index) => <option key={index} value={el}>{el}</option>)}
                            </select>
                        </div>
                        <div class="six columns">
                            <label for="category">Category</label>
                            <select className="u-full-width" id="category" name='category' onChange={handleChange}>
                                {category.map((el, index) => <option key={index} value={el}>{el}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div class="six columns">
                            <label for="openStatus">Open Status</label>
                            <select className="u-full-width" id="openStatus" name='openStatus' onChange={handleChange}>
                                <option value='default'>Open Status</option>
                                <option value='Open'>Open</option>
                                <option value='Closed'>Closed</option>
                            </select>
                        </div>
                    </div>
                    <input className="button-primary" type="submit" value="Submit" />
                </form>
            </Modal.Body>
        </Modal>
    </>
}

export default Filter