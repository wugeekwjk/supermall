<template>
<div id="detail">
    <detail-nav-bar class="detail-nav-bar" @indexChange="indexChange" ref="nav"></detail-nav-bar>
    <scroll class="nav-content" ref="scroll" @onscroll="onscroll">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
        <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goodsList="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :isShow="isShow"></toast> -->
</div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
// import Toast from 'common/toast/Toast'

import GoodsList from 'content/goodslist/GoodsList'
import Scroll from 'common/scroll/Scroll'
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {itemListenerMixin, backTopMixin} from '../../common/mixin'
import {debounce} from '../../common/utils'
export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        // Toast
    },
    data(){
        return{
            itemId:'',
            topImages: [],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeYs:[],
            getYdebounce:null,
            currentIndex:0,
        }
    },
    mixins:[itemListenerMixin, backTopMixin],
    created(){
        this.itemId = this.$route.params.id
        this.getDetail(this.itemId)
        // this.$bus.$on('idChange',(id) => {
        //     this.getDetail(id)
        // })
        getRecommend().then( res => {
            this.recommends = res.data.list
        })

        this.getYdebounce = debounce( () =>{
            this.themeYs.push(0)
            this.themeYs.push(this.$refs.params.$el.offsetTop)
            this.themeYs.push(this.$refs.comment.$el.offsetTop)
            this.themeYs.push(this.$refs.recommend.$el.offsetTop)
        },200)
    },
    destroyed(){
        this.$bus.$off('imgLoad',this.itemImgListener)
        
    },
    methods:{
        imgLoad(){
            this.$refs.scroll.refresh()
            this.getYdebounce()
        },
        onscroll(position){
            this.isShowBackTopfun(position)
            const positionY = ((-position.y) +44)
            for(let i =0;i<this.themeYs.length;i++){
                // console.log(i,this.themeYs[i])
                // this.themeYs[i] = ((-this.themeYs[i])+44)
                // console.log(positionY)
                if(
                    (i < this.themeYs.length-1 && positionY >= this.themeYs[i] && positionY < this.themeYs[i+1]) ||
                    (i == this.themeYs.length-1 && positionY >= this.themeYs[i])){
                        if(i!== this.currentIndex){
                            this.currentIndex = i
                        this.$refs.nav.currentIndex = this.currentIndex
                        }
                    }
            }
        },
        indexChange(index){
            this.$refs.scroll.backTop(0,((-this.themeYs[index])+44))
            // console.log(index)
            this.currentIndex = index
        },
        addToCart(){
            // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.itemId;
        obj.image = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.price = this.goods.nowPrice;
        // 3.添加到Store中
        this.$store.dispatch('addCart', obj).then((res) => {
            this.$toast.show(res)
        })
        },
        getDetail(id){
            getDetail(id).then(res => {
            const data = res.result;
            // console.log(data)
          // 2.2.获取顶部信息
          this.topImages = data.itemInfo.topImages;

          // 2.3.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          //获取店铺信息
          this.shop = new Shop(data.shopInfo)

          //获取商品详细信息
          this.detailInfo = data.detailInfo

          //获取商品参数信息
           this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //    console.log(this.paramInfo)

        if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })
        }
    }
}
</script>
<style scoped>
#detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}
.detail-nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.nav-content{
    height:calc(100% - 44px);
    
}
</style>