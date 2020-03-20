<template>
<div id="home">
    <div class="nav-bar"><nav-bar><div slot="center">购物街</div></nav-bar></div>
    <tab-control 
        class="tab-control1" 
        :titles="['流行', '新款', '精选']"
         @tabClick="itemClick"
         ref="tabcontrol1"
         v-show="tabControlIsShow"
        ></tab-control>
    <scroll class="content" ref="scroll" @onscroll="scrollPosition" :probeType="3" @pullingUp="loadMore()">
        <home-swiper :banners="banner"></home-swiper>
        <recommend :recommends="recommend"></recommend>
        <feature></feature>
        <tab-control 
        class="tab-control" 
        :titles="['流行', '新款', '精选']"
         @tabClick="itemClick"
         ref="tabcontrol2"
        ></tab-control>
        <goods-list :goodsList="goodlist[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>
</div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper'
import Recommend from './childComps/RecommendView'
import Feature from './childComps/Feature'

import NavBar from 'common/navbar/NavBar'
import TabControl from 'content/tabcontrol/TabControl'
import GoodsList from 'content/goodslist/GoodsList'
import Scroll from 'common/scroll/Scroll'


import {itemListenerMixin, backTopMixin} from '../../common/mixin'
import {getHomeMultidata, getHomeGoods} from 'network/home'
export default {
   components:{
       HomeSwiper,
       Recommend,
       Feature,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
   },
   data(){
       return {
           banner:[],
           recommend:null,
           currentType:'pop',
           goodlist:{
               'pop':{page:1, list:[]},
               'new':{page:1, list:[]},
               'sell':{page:1, list:[]},
           },
           tabcontrolOffset:587,
           tabControlIsShow:false,
           saveY:0
       }
   },
   mixins:[itemListenerMixin, backTopMixin],
   created(){
       this.getHomeMultidata()
       this.getHomeGoods('pop')
       this.getHomeGoods('new')
       this.getHomeGoods('sell')
       
   },
   mounted(){
    //    console.log(this.$refs.tabcontrol)
    //    console.log(this.$refs.tabcontrol.$el.offsetTop)
    //    this.tabcontrolOffset = this.$refs
       
   },
   activated(){
       this.$refs.scroll.backTop(0, this.saveY)
       this.$refs.scroll.refresh()
   },
   deactivated(){
       this.saveY = this.$refs.scroll.scroll.y
       this.$bus.$off('imgLoad',this.itemImgListener)
    //    console.log(this.saveY)
   },
   methods:{
       
       itemClick(index){
        //    console.log(index)
        switch(index){
            case 0:
                this.currentType = 'pop'
                break
            case 1:
                this.currentType = 'new'
                break
            case 2:
                this.currentType = 'sell'
        }
        this.$refs.tabcontrol1.currentIndex = index
        this.$refs.tabcontrol2.currentIndex = index
        this.$refs.scroll.backTop(0,-515)
       },
       scrollPosition(position){
           this.isShowBackTopfun(position)
           this.tabControlIsShow = (-position.y) > this.tabcontrolOffset
       },
       /**
        * 请求数据相关
        */
       loadMore(){
           this.getHomeGoods(this.currentType)
        //    this.$refs.scroll.refresh()
       },
       getHomeMultidata(){
           getHomeMultidata().then( res => {
        //    console.log(res)
           this.banner = res.data.banner.list
           this.recommend = res.data.recommend.list
       })
       },
       getHomeGoods(type){
           getHomeGoods(type, this.goodlist[type].page).then(res => {
               const goodlist = res.data.list
               this.goodlist[type].list.push(...goodlist)
               this.goodlist[type].page += 1
               this.$refs.scroll.finishPullUp()
            //    console.log(res)
           })
       }
   }
}
</script>
<style scoped>
#home{
    height: 100vh;   
}
.nav-bar{
    background-color: var(--color-tint);
    font-weight: 700;
    color:#fff;

    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
    /* margin-bottom: 44px; */
}
.tab-control1{
    position: fixed;
    top: 44px;
    z-index: 9;
}
.content{
    height: calc(100% - 93px);
    overflow: hidden;
}
</style>