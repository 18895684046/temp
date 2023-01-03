<script setup lang="ts">
import { NCalendar } from 'naive-ui'
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { isYesterday, addDays } from 'date-fns/esm'

const value = ref(addDays(Date.now(), 1).valueOf())

const isDateDisabled = (timestamp: number) => {
  if (isYesterday(timestamp)) {
    return true
  }
  return false
}

</script>

<template>
  <div class="container">
    <NCalendar v-model:value="value" #="{ year, month, date }" :is-date-disabled="isDateDisabled">
      {{ year }} - {{     month }}-{{     date }}
    </NCalendar>
  </div>
</template>


<style lang="scss" scoped>
@import "./index.scss";

.n-calendar {
  background-color: #333;
  color: #fff;

  :deep(.n-calendar-cell) {
    &:hover {
      color: var(--test);
    }
  }

  :deep(.n-calendar-date) {
    &:hover {
      color: green !important;
    }
  }
}
</style>