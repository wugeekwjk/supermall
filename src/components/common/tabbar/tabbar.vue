<template>
<div id="tab-bar">
<slot></slot>
</div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
#tab-bar{
    /* 自身的样式 */
    background-color: #f6f6f6;
    height: 49px;
    border-top: 1px solid #eee;
    box-shadow: 0px -1px 1px rgba(150,150,150,.08);

    /* 定位相关 */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    /* 利用flex布局 */
    display: flex;
    text-align: center;
    
}
</style>