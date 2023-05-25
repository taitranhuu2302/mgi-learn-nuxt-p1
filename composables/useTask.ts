import {onMounted} from "vue";
import {$fetch} from "ofetch";

export const useTask = () => {
  const taskList = useState<TaskItemType[]>('taskList', () => [])
  const TASK_KEY = 'tasks'

  onMounted(() => {
    $fetch('/api/tasks').then((response) => {
      taskList.value = response.data;
      console.log(response.data)
    })
  })

  const onDeleteTask = (id: string) => {
    taskList.value = taskList.value.filter((item) => item.id !== id)
  }

  const changeStatusTask = (id: string, status: TaskItemStatusType) => {
    const task = taskList.value.find((item) => item.id === id)
    if (!task) return

    task.status = status
  }

  const updateLocalstorage = () => {
    localStorage.setItem(TASK_KEY, JSON.stringify(taskList.value))
  }

  const createOrUpdateTask = async (taskObj: TaskItemType) => {
    if (!taskObj.name) return

    if (!taskObj.id) {
      // ADD
      const newTask: TaskItemType = {
        ...taskObj,
        id: new Date().getTime().toString(),
        createdAt: new Date()
      }
      const response = await $fetch('/api/tasks/create', {
        method: 'POST',
        body: newTask
      })
      taskList.value = [response.data, ...taskList.value]
    } else {
      const index = taskList.value.findIndex((item) => item.id === taskObj.id)
      if (index !== -1) {
        taskList.value[index] = {
          ...taskObj
        }
      }
    }
  }

  const onClearTasks = () => {
    taskList.value = []
  }


  return {
    taskList,
    onClearTasks,
    onDeleteTask,
    changeStatusTask,
    createOrUpdateTask
  }
}