import {todoList} from "../../data/fake";

export default defineEventHandler(async (event) => {
  const body: TaskItemType = await readBody(event);
  todoList.splice(0, 0, body)
  return {
    data: body
  }
})