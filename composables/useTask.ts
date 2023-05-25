import {onMounted, Ref} from "vue";

export const useTask = () => {
  const taskList = useState<TaskItemType[]>('taskList', () => [])
  const TASK_KEY = 'tasks'

  onMounted(() => {
    taskList.value = localStorage.getItem(TASK_KEY)
      ? JSON.parse(localStorage.getItem(TASK_KEY) as string)
      : []
  })

  const onDeleteTask = (id: string) => {
    taskList.value = taskList.value.filter((item) => item.id !== id)
    updateLocalstorage()
  }

  const changeStatusTask = (id: string, status: TaskItemStatusType) => {
    const task = taskList.value.find((item) => item.id === id)
    if (!task) return

    task.status = status
    localStorage.setItem(TASK_KEY, JSON.stringify(taskList.value))
  }

  const updateLocalstorage = () => {
    localStorage.setItem(TASK_KEY, JSON.stringify(taskList.value))
  }

  const createOrUpdateTask = (taskObj: TaskItemType) => {
    if (!taskObj.name) return

    if (!taskObj.id) {
      // ADD
      const newTask: TaskItemType = {
        ...taskObj,
        id: new Date().getTime().toString(),
        createdAt: new Date()
      }
      taskList.value = [newTask, ...taskList.value]
    } else {
      const index = taskList.value.findIndex((item) => item.id === taskObj.id)
      if (index !== -1) {
        taskList.value[index] = {
          ...taskObj
        }
      }
    }
    // resetTask()
    updateLocalstorage()
  }

  const onClearTasks = () => {
    taskList.value = []
    updateLocalstorage()
  }


  return {
    taskList,
    onClearTasks,
    onDeleteTask,
    changeStatusTask,
    createOrUpdateTask
  }
}