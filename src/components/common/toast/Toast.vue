<template>
    <div class="toast" v-show="isShow">{{message}}</div>
</template>
<script>
export default {
    data(){
        return {
            message:'',
            isShow:false
        }
    },
    methods:{
        show(message, duration = 1500){{
            this.isShow = true
            this.message = message
            setTimeout(()=>{
                this.isShow = false
                this.message = ''
            },duration)
        }}
    }
}
</script>
<style scoped>
.toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: white;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 8px 10px;
    z-index: 999;
}
</style>