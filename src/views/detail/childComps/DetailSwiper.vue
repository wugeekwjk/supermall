<template>
   <swiper v-if="topImages.length" class="detail-swiper">
       <swiper-item v-for="(item, index) in topImages" :key="index" class="item">
         <img :src="item">
       </swiper-item>
    </swiper> 
</template>
<script>
import { Swiper, SwiperItem} from 'common/swiper'
export default {
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
      Swiper,
      SwiperItem
  }  
}
</script>
<style scoped>
/* .detail-swiper{
  height: 300px;
  overflow: hidden;
} */
 .item {
    text-align: center;
    height: 300px;
  }
</style>