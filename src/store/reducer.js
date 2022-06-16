import { createAction } from '@reduxjs/toolkit';

export const addShop = createAction('add_shop')
export const removeShop = createAction('remove_shop')
export const filterShop = createAction('filter_shop')

let lastId = 0;

const reducer = (state = [], action) => {
    switch (action.type) {
        case addShop.type:
            return [
                ...state,
                {
                    id: ++lastId,
                    shopDetails: action.payload
                }
            ]
        case removeShop.type:
            return state.filter(item => item.id != action.payload)
        case filterShop.type:
            const arr = []
            state.map(item => {
                if (item.shopDetails.area == action.payload.area) arr.push(item)
                if (item.shopDetails.category == action.payload.category) if (!arr.includes(item)) arr.push(item)      
                if (item.shopDetails.openStatus == action.payload.openStatus) if (!arr.includes(item)) arr.push(item)
            })
            console.log(arr)
            return [...arr]
        default: return state;
    }
};

export default reducer