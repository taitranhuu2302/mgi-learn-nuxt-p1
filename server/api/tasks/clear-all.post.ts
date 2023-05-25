import {todoList} from "../../data/fake";

export default defineEventHandler(async (event) => {
  todoList.splice(0)
  return {
    data: []
  }
})