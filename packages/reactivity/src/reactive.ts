import { isObject } from "@zw/shared";
import { mutableHandler,ReactiveFlags } from "./baseHandler";
const reactiveMap = new WeakMap()

function createReactiveObject(target){
    // 不需要对象才能做响应式对象
    if(!isObject(target)) return target

    if(target[ReactiveFlags.IS_REACTIVE]){
        return target
    }

    const exitsProxy = reactiveMap.get(target)
    if(exitsProxy) return exitsProxy
    // 创建响应式对象
   let proxy =  new Proxy(target,mutableHandler)
   // 根据对象缓存代理后的结果
   reactiveMap.set(target,proxy)
   return proxy
}

export function reactive(target){
    return createReactiveObject(target)
}