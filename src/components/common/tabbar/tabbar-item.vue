<template>
<div class="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-if="!isActive"><slot name="icon"></slot></div>
    <div class="item-active-icon" v-else><slot name="active-icon"></slot></div>
    <div class="item-text" :style="activeColor"><slot name='text'></slot></div>
</div>
</template>
<script>
export default {
    props:{
        path:String,
        linkColor:{
            type:String,
            default:'red'
        }
    },
    data(){
        return{
            // isActive:false
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path)  !== -1
        },
        activeColor(){
            return this.isActive ? {"color": this.linkColor} : {}
        }
    },
    methods:{
        itemClick(){
            this.$router.push(this.path).catch(error => {})
        }
    }
}
</script>
<style scoped>
.tab-bar-item{
    flex: 1;
}

.item-icon img, .item-active-icon img {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }

.item-text{
    font-size: 12px;
    margin-top: 3px;
    color: #333;
}
</style>