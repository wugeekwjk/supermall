<template>
    <div>
        <scroll class="tab-content">
            <div v-for="(item, index) in categories"
             :key="index" 
             class="tab-item"
             :class="{itemactive:index === currentIndex}"
             @click="itemClick(index)"
             >
             <div>{{item.title}}</div></div>
        </scroll>
    </div>
</template>
<script>
import Scroll from 'common/scroll/Scroll'
export default {
    props:{
        categories:{
            tyep:Array,
            default(){
                return []
            }
        }
    },
    components:{
        Scroll
    },
    data(){
        return{
            currentIndex:0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index
            this.$emit('selectItem', index)
        }
    }
}
</script>
<style scoped>
.tab-content{
    height: 100%;
    overflow: hidden;
    font-size: 16px;
    font-weight: 500;
    background-color: #F6F6F6;
}
.tab-item{
    padding: 17px 25px;
}
.itemactive{
    color: var(--color-high-text);
    font-weight: 700;
    border-left: 3px solid var(--color-high-text);
    background-color: #fff;
}
</style>