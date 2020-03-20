<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    props:{
        probeType:{
            type:Number,
            default:0
        },
        data: {
		    type: Array,
        default: () => {
          return []
        }
      },
    },
    data(){
        return{
            scroll:null
        }
    },
    watch: {
		  data() {
        setTimeout(this.refresh, 20)
      }
    },
    mounted(){
        this._initScroll()
    },
    methods:{
        backTop(x, y, time = 500){
            this.scroll.scrollTo(x, y, time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            // console.log('refresh')
            this.scroll.refresh()
        },
        _initScroll(){
            this.scroll = new BScroll(this.$refs.wrapper, {
            click:true,
            probeType:this.probeType,
            pullUpLoad:true
        })
            this.scroll.on('scroll', (position) => {
                this.$emit('onscroll', position)
            })
            this.scroll.on('pullingUp', () => {
                // console.log('pullingUp')
                this.$emit('pullingUp')
            })
        }

    }
}
</script>
<style scoped>

</style>