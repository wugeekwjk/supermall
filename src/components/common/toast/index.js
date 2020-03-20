import Toast from './Toast'

const obj = {}
obj.install = function(Vue){
    //1.创建组件构造器
    const totalContrustor = Vue.extend(Toast)
    //2.new 的方式，根据组件构造器，可以创建一个组件对象
    const toast = new totalContrustor()
    //3.将组件对象手动挂在到某一个元素上
    toast.$mount(document.createElement('div'))
    //4.toast.$el就是对应的div
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = toast
}

export default obj
