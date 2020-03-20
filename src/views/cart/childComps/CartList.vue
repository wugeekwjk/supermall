<template>
    <div class="cart-list">
        <scroll class="content">
            <cart-list-item v-for="(item, index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
        </scroll>        
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Scroll from 'common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
    components:{
       Scroll ,
       CartListItem
    },
    computed:{
        ...mapGetters(['cartList'])
    }
}
</script>
<style scoped>
.cart-list{
    height: calc(100vh - 93px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>