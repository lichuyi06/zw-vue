export enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive',
}
export const mutableHandler: ProxyHandler<any> = {
    get(target, key, receiver) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return true
        }
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value,receiver) {
        // 这里可以添加一些逻辑
       return Reflect.set(target, key, value,receiver)
    }
}