import Redis from "ioredis"
import {todoList} from "../../data/fake";

export default defineEventHandler(async () => {

  return {
    data: todoList
  }
})