<template>
  <div class="content-category">
      <div class="item" v-for="(item, index) in showSubcategory.list" :key="index">
          <a :href="item.link">
              <img class="item-img" :src="item.image">
              <div class="item-text">{{item.title}}</div>
           </a>
      </div>
  </div>  
</template>
<script>
export default {
    props:{
        showSubcategory:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>
.content-category{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    overflow: hidden;
}
.item{
    text-align: center;
    font-size: 12px;
    width: 30%;
    margin-top: 20px;
}
.item-img{
    width: 80%;
}
.item-text{
    margin-top: 15px;
}
</style>