import {Plugin} from 'vue'

export type  SFCWithInstall<T> = T & Plugin   // 约束插件的泛型类型
export function withInstall<T>(comp:T) {
  (comp as SFCWithInstall<T>).install = function(app:any){
    const {name} = comp as unknown as {name:string}
    app.component(name, comp) //将组件 全局注册
  }
  return comp as SFCWithInstall<T>
}