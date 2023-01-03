<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/modules/userStore'
import { NButton } from 'naive-ui'

const props = defineProps<{
  // 权限按钮所关联的权限
  btnAuth: string,
}>()

const userStore = useUserStore()

// 用户拥有的所有权限
const { getPermissions } = storeToRefs(userStore)

const isBtnHasPermission = computed<boolean>(
  () => getPermissions.value.includes(props.btnAuth)
)
</script>

<template>
  <NButton :disabled="!isBtnHasPermission">
    <slot name="icon"></slot>
    <slot name="default"></slot>
  </NButton>
</template>

<style lang="scss" scoped>
@import "@/styles/constant.scss";
@import "./index.scss";
</style>
