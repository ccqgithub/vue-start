import {mutationType} from '../../lib/utils';

// user
export const USER_ADD = mutationType();
export const USER_DELETE = mutationType();

// food
export const FOOD_ADD = mutationType('FOOD_ADD');
export const FOOD_DELETE = mutationType('FOOD_DELETE');
