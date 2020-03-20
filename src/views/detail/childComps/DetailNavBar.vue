<template>
    <nav-bar>
        <div slot="left">
            <img src="~assets/img/common/back.svg" class="nav-img" @click="goBack()">
        </div>
        <div slot="center" class="title">
            <div v-for="(item, index) in titles" 
            :key="index" class="titleItem" 
            :class="{active: index === currentIndex}"
            @click="navClick(index)"
            >
                {{item}}
            </div>
        </div>
    </nav-bar>
</template>
<script>
import NavBar from 'common/navbar/NavBar'
export default {
    components:{
        NavBar
    },
    data(){
        return{
            titles:['商品', '参数', '评论', '推荐'],
            currentIndex:0
        }
    },
    methods:{
        navClick(index){
            this.currentIndex = index
            this.$emit('indexChange', index)
        },
        goBack(){
            this.$router.back()
        }
    }
}
</script>
<style scoped>
.title{
    display: flex;
    font-size: 14px;
}
.titleItem{
    flex:1
}
.active{
    color:var(--color-high-text);
}
.nav-img{
    margin-top: 12px;
}
</style>