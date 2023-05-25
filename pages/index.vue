<script setup lang="ts">
import {computed, reactive, ref} from 'vue'
import {useTask} from "~/composables/useTask";

type ActiveTabType = 'All' | 'Pending' | 'Completed'

const activeTabs = ref<ActiveTabType>('All')
const taskObj = reactive<TaskItemType>({
  createdAt: new Date(),
  id: '',
  name: '',
  status: 'PENDING'
})
const {taskList, createOrUpdateTask, onClearTasks} = useTask()
const isTaskTyping = computed(() => !!taskObj.name)
const keyword = ref<string>('')
const sortType = ref<'ASC' | 'DESC' | 'DEFAULT'>('DEFAULT')

const taskListFilter = computed(() => {
  const search = keyword.value.toLowerCase()
  let result: TaskItemType[] = taskList.value

  if (activeTabs.value === 'Pending') {
    result = result.filter((item) => item.status === 'PENDING')
  } else if (activeTabs.value === 'Completed') {
    result = result.filter((item) => item.status === 'COMPLETED')
  }

  result = result.filter((item) => item.name.toLowerCase().includes(search))

  if (sortType.value === 'ASC') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortType.value === 'DESC') {
    result.sort((a, b) => b.name.localeCompare(a.name))
  }

  return result
})

const getEditTask = (editTask: TaskItemType) => {
  taskObj.id = editTask.id
  taskObj.name = editTask.name
  taskObj.status = editTask.status
  taskObj.createdAt = editTask.createdAt
}

const resetTask = () => {
  taskObj.name = ''
  taskObj.status = 'PENDING'
  taskObj.id = ''
}

const handleAddOrUpdateTask = (taskObj: TaskItemType) => {
  createOrUpdateTask(taskObj)
  resetTask()
}

const checkActiveTab = (type: ActiveTabType) => activeTabs.value === type
</script>

<template>
  <div id="task">
    <h2 class="text-2xl font-semibold text-center mb-3">Todo List</h2>
    <div class="flex gap-2.5">
      <input-default class="flex-grow" v-model:value="keyword" placeholder="Search...">
        <template #startIcon>
          <Icon size="25px" name="ph:magnifying-glass" color="black"/>
        </template>
      </input-default>
      <button class="btn-sort" @click="sortType = 'ASC'">
        <Icon name="mdi:sort-alphabetical-ascending" size="25px"/>
      </button>
      <button class="btn-sort" @click="sortType = 'DESC'">
        <Icon name="mdi:sort-alphabetical-descending" size="25px"/>
      </button>
    </div>
    <div class="flex items-center justify-between gap-2.5 flex-wrap mt-3">
      <ul class="tabs">
        <li @click="activeTabs = 'All'" :class="{ active: checkActiveTab('All') }">All</li>
        <li @click="activeTabs = 'Pending'" :class="{ active: checkActiveTab('Pending') }">
          Pending
        </li>
        <li @click="activeTabs = 'Completed'" :class="{ active: checkActiveTab('Completed') }">
          Completed
        </li>
      </ul>
      <button
          @click="onClearTasks"
          class="p-2 bg-gradient-to-tr from-primary-500 to-primary text-white rounded"
      >
        Clear All
      </button>
    </div>
    <div class="border border-gray-300 my-4"></div>
    <ul class="task-list">
      <li v-if="!taskListFilter.length" class="text-lg">You don't have any task here</li>
      <template v-for="task in taskListFilter" :key="task.id">
        <task-item
            :task="task"
            @getEditTask="getEditTask"
        ></task-item>
      </template>
    </ul>
    <input-default
        placeholder="Add some thing..."
        v-model:value="taskObj.name"
        @keyup.enter="handleAddOrUpdateTask(taskObj)"
    >
      <template #startIcon>
        <Icon name="material-symbols:add-circle" class="text-gray-400" size="25px"/>
      </template>
      <template #endIcon>
        <button
            @click="handleAddOrUpdateTask(taskObj)"
            v-show="isTaskTyping"
            class="btn-form-add bg-primary-500"
        >
          {{ taskObj.id ? 'Edit' : 'Add' }}
        </button>
        <button v-if="taskObj.id" @click="resetTask" class="btn-form-add bg-red-500">
          Reset
        </button>
      </template>
    </input-default>
  </div>
</template>

<style scoped>
#task {
  @apply max-w-[500px] w-full rounded p-5 bg-white;
}

.tabs {
  @apply flex items-center gap-3;
}

.tabs li {
  @apply text-lg cursor-pointer;
}

.tabs li.active {
  @apply text-primary-500;
}

.task-list {
  @apply flex flex-col h-[340px] overflow-y-auto;
}

.btn-form-add {
  @apply hover:bg-opacity-95 px-2.5 rounded text-white;
}

.btn-sort {
  @apply text-xl;
}
</style>