export function effect(fn, option){
    const _effect = new ReactiveEffect(fn,() => {
        _effect.run()
    })
    _effect.run()

    return _effect
}
class ReactiveEffect{
    public active = true // 代表当前的effect是否激活
    // fn 用户传入的函数, fn中依赖发生变化会重新执行
    constructor(public fn, public scheduler){

    }
    run(){
        if(!this.active) return this.fn()
        // 做依赖收集
        return this.fn()
    }
}