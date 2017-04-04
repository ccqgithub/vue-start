// 生成值唯一的 vuex types
let vuexUniqueId = 0
export function vuexTypes(types=[], module='default') {
  let result = {}
  vuexUniqueId ++
  types.forEach(type => {
    result[type] = `vuex/type/${module}/${type}/${vuexUniqueId}`
  })
  return result
}
