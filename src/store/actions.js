import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'
export default {
    addCart(context, payload){
        return new Promise((resolve, reject) => {
            let oldProduct = null
        for(let item of context.state.cartList){
            if(item.iid === payload.iid){
                oldProduct = item
            }
        }
        if(oldProduct){
            // oldProduct.count +=1
            context.commit(ADD_COUNTER, oldProduct)
            resolve('商品数量加一')
        }else{                
            context.commit(ADD_TO_CART, payload)
            resolve('商品加入购物车')
        }
        })
    }
}