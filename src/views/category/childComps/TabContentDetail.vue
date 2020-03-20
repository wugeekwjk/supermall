<template>
<div class="detail">
        <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goodsListItem="item"></goods-list-item>
</div>
</template>

<script>
  import GoodsListItem from 'content/goodslist/GoodsListItem'

  export default {
    name: "TabContentDetail",
    components: {
      GoodsListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
.detail{
     display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    overflow: hidden;
}
.item{
    width: 50%;
}
</style>
