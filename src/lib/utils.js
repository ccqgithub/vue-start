// generate unique mutatin type string
// mutationTypes.js:
// const USER_ADD_NEW = mutationType()
// const USER_ADD_NEW = mutationType('USER_ADD_NEW')
let vuexMutationId = 0
export function mutationType(name) {
  vuexMutationId ++
  return name ?
    `mutation-type-${vuexMutationId}` :
    `mutation-type-${name}-${vuexMutationId}`
}

// generate unique mutatin type string
// actionTypes.js:
// const USER_ADD_NEW = actionType()
// const USER_ADD_NEW = actionType('USER_ADD_NEW')
let vuexActionId = 0
export function actionType(name) {
  vuexActionId ++
  return name ?
    `action-type-${vuexActionId}` :
    `action-type-${name}-${vuexActionId}`
}
