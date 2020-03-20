<template>
    <div class="cart">
        <nav-bar class="car-nav"><div slot="center" >购物车({{cartCount}})</div></nav-bar>
        <cart-list></cart-list>
        <bottom-bar></bottom-bar>
    </div>
</template>
<script>
import NavBar from 'common/navbar/NavBar'
import CartList from './childComps/CartList'
import BottomBar from './childComps/BottomBar'
import {mapGetters} from 'vuex'
export default {
    components:{
       NavBar,
       CartList,
       BottomBar
    },
    computed:{
        ...mapGetters(['cartCount'])
    }
}
</script>
<style scoped>
.car-nav{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
}
</style>
