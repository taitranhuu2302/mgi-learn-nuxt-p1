import { todoList } from '../../data/fake';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);
  
  const index = todoList.findIndex(item => item.id === id);
  
  if (index <= -1) throw createError({
    message: 'Not found',
  });
  
  
  todoList[index] = {
    ...body
  };
  
  return {
    data: body
  };
});
