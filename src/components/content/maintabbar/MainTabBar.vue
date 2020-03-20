<template>
    <tabbar>
      <item path="/home">
        <img  slot="icon" src="~assets/img/tabbar/home.svg" />
        <img  slot="active-icon" src="~assets/img/tabbar/home_active.svg" />
        <div slot="text">首页</div>
      </item>
      <item path="/category">
        <img  slot="icon" src="~assets/img/tabbar/category.svg" />
        <img  slot="active-icon" src="~assets/img/tabbar/category_active.svg" />
        <div slot="text">分类</div>
      </item>
      <item path="/cart">
        <img  slot="icon" src="~assets/img/tabbar/cart.svg" />
        <img  slot="active-icon" src="~assets/img/tabbar/cart_active.svg" />
        <div slot="text">购物车</div>
      </item>
      <item path="profile">
        <img  slot="icon" src="~assets/img/tabbar/profile.svg" />
        <img  slot="active-icon" src="~assets/img/tabbar/profile_active.svg" />
        <div slot="text">我的</div>
      </item>
    </tabbar>
</template>
<script>
import Tabbar from 'components/common/tabbar/tabbar'
import Item from 'components/common/tabbar/tabbar-item'
export default {
    components:{
    Tabbar,
    Item
  }
}
</script>