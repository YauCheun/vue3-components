/*
 * @Author: YauCheun 1272125039@qq.com
 * @Date: 2024-11-14 07:58:55
 * @LastEditors: YauCheun 1272125039@qq.com
 * @LastEditTime: 2024-12-10 08:15:14
 * @FilePath: \vue3-components\packages\utils\create.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// block 代码块 element 元素    modifier 装饰   state 状态
// z-button
// z-button__element
// z-button__element--disabled
// is-checked is-enabeld

function _bem(prefixName: string, blockSuffix: string, element: string, modifier: string) {
  if (blockSuffix) {
    prefixName += `-${blockSuffix}`
  }
  if (element) {
    prefixName += `__${element}`
  }
  if (modifier) {
    prefixName += `--${modifier}`
  }
  return prefixName
}
function createBEM(prefixName: string) {
  const b = (blockSuffix = '') => _bem(prefixName, blockSuffix, '', '')
  const e = (element = '') => element ? _bem(prefixName, '', element, '') : ''
  const m = (modifier = '') => modifier ? _bem(prefixName, '', '', modifier) : ''
  const be = (blockSuffix = '', element = '') => blockSuffix && element ? _bem(prefixName, blockSuffix, '', '') : ''
  const bm = (blockSuffix = '', modifier = '') => blockSuffix && modifier ? _bem(prefixName, blockSuffix, '', modifier) : ''
  const em = (element = '', modifier = '') => element && modifier ? _bem(prefixName, '', element, modifier) : ''
  const bem = (blockSuffix = '', element = '', modifier = '') => blockSuffix && element && modifier ? _bem(prefixName, blockSuffix, element, modifier) : ""
  const is = (name:string,state:any)=>(state ? `is-${name}` : '')
  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is
  }
}

export function createNamespace(name: string) {
  const prefixName = `z-${name}`
  return createBEM(prefixName)
}

const bem = createNamespace('button')
console.log(bem.b('box'))
console.log(bem.e('element'))
console.log(bem.m('modifier'))
console.log(bem.bem('box','elemen','modifier'))
