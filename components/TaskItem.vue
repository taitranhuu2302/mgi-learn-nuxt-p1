<script setup lang="ts">
import {ref} from 'vue'

const {task} = defineProps<{
  task: TaskItemType
}>()
const emit = defineEmits(['getEditTask'])
const isOpenDropdown = ref<boolean>(false)
const {onDeleteTask, changeStatusTask} = useTask()

const onChangeStatusTask = (status: TaskItemStatusType) => {
  const newStatus = status === 'PENDING' ? 'COMPLETED' : 'PENDING'
  changeStatusTask(task.id, newStatus)
}

</script>

<template>
  <li class="task-item">
    <div class="flex items-center gap-2.5 flex-grow" @click="onChangeStatusTask(task.status)">
      <Icon v-if="task.status === 'PENDING'" name="mdi:checkbox-blank-outline" size="25px"/>
      <Icon v-else name="mdi:checkbox-marked-outline" size="25px"/>
      <span
          class="text-lg"
          :class="{ 'line-through text-gray-500': task.status === 'COMPLETED' }"
      >{{ task.name }}</span
      >
    </div>
    <div class="relative" @click-outside="() => (isOpenDropdown = false)">
      <button @click="isOpenDropdown = !isOpenDropdown">
        <Icon name="mdi:dots-vertical" size="25px"/>
      </button>
      <ul v-show="isOpenDropdown" class="dropdown">
        <li>
          <NuxtLink :to="{ path: `/tasks/${task.id}` }">Detail</NuxtLink>
        </li>
        <li @click="emit('getEditTask', task)">Edit</li>
        <li @click="onDeleteTask(task.id)">Delete</li>
      </ul>
    </div>
  </li>
</template>

<style scoped>
.task-item {
  @apply p-2.5 flex items-center gap-2.5 cursor-pointer hover:bg-gray-200 rounded;
}

.dropdown {
  @apply w-fit bg-white px-2 py-2.5 right-0 absolute top-full rounded shadow-md z-10;
}

.dropdown li {
  @apply p-2 hover:bg-gray-200;
}
</style>