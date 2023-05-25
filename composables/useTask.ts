import { onMounted } from 'vue';
import { $fetch } from 'ofetch';

export const useTask = () => {
  const taskList = useState<TaskItemType[]>('taskList', () => []);
  
  onMounted(() => getAllTask());
  
  const getAllTask = () => $fetch('/api/tasks').then((response) => {
    taskList.value = response.data;
  });
  
  const onDeleteTask = async (id: string) => {
    try {
      await $fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
      });
      await getAllTask();
    } catch (e) {
      console.log(e);
    }
  };
  
  const changeStatusTask = async (id: string, status: TaskItemStatusType) => {
    const request = {
      id,
      status
    };
    await $fetch(`/api/tasks/change-status`, {
      method: 'POST',
      body: JSON.stringify(request)
    });
    await getAllTask()
  };
  
  const createOrUpdateTask = async (taskObj: TaskItemType) => {
    if (!taskObj.name) return;
    try {
      if (!taskObj.id) {
        // ADD
        const newTask: TaskItemType = {
          ...taskObj,
          id: new Date().getTime().toString(),
          createdAt: new Date()
        };
        await $fetch('/api/tasks/create', {
          method: 'POST',
          body: newTask
        });
      } else {
        await $fetch(`/api/tasks/${taskObj.id}`, {
          method: 'PUT',
          body: taskObj
        });
      }
      await getAllTask();
    } catch (e) {
      console.log(e);
    }
  };
  
  const onClearTasks = async () => {
    await $fetch('/api/tasks/clear-all', {
      method: 'POST'
    });
    await getAllTask();
  };
  
  
  return {
    taskList,
    onClearTasks,
    onDeleteTask,
    changeStatusTask,
    createOrUpdateTask
  };
};