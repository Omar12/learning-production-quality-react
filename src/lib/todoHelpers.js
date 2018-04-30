// export const addTodo = (list, item) => list.concat(item);
export const addTodo = (list, item) => [item, ...list];

export const generateId = () => Math.floor(Math.random() * Date.now());
