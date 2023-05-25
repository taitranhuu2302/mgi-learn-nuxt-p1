<script setup lang="ts">
import {useRoute} from "vue-router";
import {useTask} from "~/composables/useTask";
import {onMounted} from "vue";

const route = useRoute();
const {taskList} = useTask()
const taskDetail = ref<TaskItemType>({
  id: "",
  name: "",
  createdAt: new Date(),
  status: 'PENDING'
})


onMounted(() => {
  const {id} = route.params;
  const task = taskList.value.find(item => item.id === id)

  if (!task) {
    return;
  }

  taskDetail.value = task;
})

</script>

<template>
  <div class="flex flex-col">
    <div class="p-5 bg-white rounded">
      <h3 class="text-xl text-center font-semibold mb-3">Task Detail</h3>
      <div class="grid grid-cols-2 gap-3">
        <p>Task Id: </p>
        <p>{{ taskDetail.id }}</p>
        <p>Task Name: </p>
        <p>{{ taskDetail.name }}</p>
        <p>Task Status: </p>
        <p class="capitalize">{{ taskDetail.status.toLowerCase() }}</p>
        <p>Task Created At: </p>
        <p>{{ new Date(taskDetail.createdAt).toDateString() }}</p>
      </div>
    </div>
    <NuxtLink to="/" class="mt-5 px-3 py-2 bg-white rounded text-center">Back</NuxtLink>
  </div>
</template>

<style scoped>

</style>