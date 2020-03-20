<template>
    <div class="category">
        <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
        <div class="main-content">
            <tab-menu :categories="categories" class="menu" @selectItem="selectItem"></tab-menu>
            <scroll class="scroll" ref="scroll">
                <tab-content-category :showSubcategory="showSubcategory"></tab-content-category>
                <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"></tab-control>
                <tab-content-detail :categoryDetail="showCategoryDetail"></tab-content-detail>
            </scroll>
        </div>
    </div>
</template>
<script>
import NavBar from 'common/navbar/NavBar'
import Scroll from 'common/scroll/Scroll'
import TabControl from 'content/tabcontrol/TabControl'
import {tabControlMixin, itemListenerMixin} from "../../common/mixin";

import TabMenu from './childComps/TabMenu'
import TabContentCategory from './childComps/TabContentCategory'
import TabContentDetail from './childComps/TabContentDetail'


import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
export default {
    components:{
        NavBar,
        Scroll,
        TabControl,
        TabMenu,
        TabContentCategory,
        TabContentDetail
    },
    data(){
        return{
            categories:[],
            categoryData:{},
            currentIndex:-1,
            saveY:0
        }
    },
    mixins: [tabControlMixin, itemListenerMixin],
    created(){
        this._getCategory()
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
    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subCategorys
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods:{
        selectItem(index){
            this._getSubcategory(index)
        },
        _getCategory(){
            getCategory().then(res => {
            this.categories = res.data.category.list
            for(let i=0;i<this.categories.length;i++){
                this.categoryData[i]={
                    subCategorys:{},
                    categoryDetail:{
                        'pop':[],
                        'new':[],
                        'sell':[]

                    }
                }
            }
            this._getSubcategory(0)
        })
        },
        _getSubcategory(index){
            this.currentIndex = index
            const maitKey = this.categories[index].maitKey
            getSubcategory(maitKey).then(res => {
                this.categoryData[index].subCategorys = res.data
                this.categoryData = {...this.categoryData}
                this._getCategoryDetail('pop')
                this._getCategoryDetail('sell')
                this._getCategoryDetail('new')
            })
        },
        _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
    }
}
</script>
<style scoped>
.category{
    height: 100vh;
}
.main-content{
    height: calc(100% - 93px);
    display: flex;
    overflow: hidden;
}
.category-nav{
    color: #fff;
    font-weight: 700;
    background-color: var(--color-tint);
}
.menu{
    width: 32%;
}
.scroll{
    width: 68%;
}
</style>