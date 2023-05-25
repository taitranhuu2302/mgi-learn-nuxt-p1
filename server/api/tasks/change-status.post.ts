import { todoList } from '../../data/fake';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const index = todoList.findIndex(item => item.id === body.id);
  
  if (index <= -1) throw createError({
    message: 'Not found',
  });
  
  
  todoList[index].status = body.status;
  
  return {
    data: body
  };
});
