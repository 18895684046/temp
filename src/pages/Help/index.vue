<template>
  <div class="container">
    <h3 style="padding: 10px 20px 0px">共收录了 {{ originData.length }} 个前端开源项目</h3>
    <div style="padding: 20px">
      <n-input
        v-model:value="searchVal"
        type="text"
        @update-value="throttleFunc"
        placeholder="搜索开源库，例如：jquery"
      />
    </div>
    <div v-bind="containerProps" style="height: 100%">
      <div v-bind="wrapperProps" style="height: 100%">
        <n-list hoverable clickable>
          <div v-for="item in list" :key="item.index">
            <n-list-item>
              <n-thing :title="item.data[0]" content-style="margin-top: 10px;">
                <template #description>
                  <n-space size="small" style="margin-top: 4px">
                    <n-tag :bordered="false" type="info" size="small">
                      {{ item.data[0] }}
                    </n-tag>
                  </n-space>
                </template>
                {{ item.data[1] }}
              </n-thing>
            </n-list-item>
          </div>
        </n-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useVirtualList } from '@vueuse/core';
import _ from 'lodash';
import { NList, NListItem, NThing, NSpace, NTag, NButton, NInput } from 'naive-ui';

type Library = string[];

const libraryRef = ref<Library[]>([]);
const searchVal = ref<string>('');
const originData = ref<Library[]>([]);

fetch('./src/assets/librarys.json')
  .then((response) => response.text())
  .then((res) => {
    const librarys = JSON.parse(res);
    libraryRef.value = librarys;
    originData.value = librarys;
  });

const { list, containerProps, wrapperProps } = useVirtualList(libraryRef, {
  itemHeight: 40,
});

const searchFunc = (value: string) => {
  const filterData = originData.value.filter((it: (string | string[])[]) => it[0].includes(value));
  libraryRef.value = filterData;
};
const throttleFunc = _.throttle(searchFunc, 200);
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
