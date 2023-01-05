<script setup lang="ts">
import { h, ref, watch } from 'vue';
import {
  NCarousel,
  NButton,
  NCard,
  NNumberAnimation,
  NSpace,
  NSlider,
  NDataTable,
  NDescriptions,
  NDescriptionsItem,
  NIcon,
  NTabs,
  NTabPane,
} from 'naive-ui';
import type { DataTableColumns } from 'naive-ui';
import { useProjectsStore } from '@/stores/modules/projectStore';
import AuthButton from '@/components/AuthButton/index.vue';
import { UserOutlined } from '@vicons/antd';

type RowData = {
  key: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
};
const projectStore = useProjectsStore();

const createColumns = (): DataTableColumns<RowData> => [
  {
    type: 'selection',
    fixed: 'left',
  },
  {
    title: 'Name',
    key: 'name',
    width: 200,
    fixed: 'left',
  },
  {
    title: 'Age',
    key: 'age',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Row',
    key: 'row',
    render(row, index) {
      return h('span', ['row ', index]);
    },
  },
  {
    title: 'Row1',
    key: 'row1',
    render(row, index) {
      return h('span', ['row ', index]);
    },
  },
  {
    title: 'Row2',
    key: 'row2',
    render(row, index) {
      return h('span', ['row ', index]);
    },
    width: 100,
    fixed: 'right',
  },
  {
    title: 'Address',
    key: 'address',
    width: 200,
    fixed: 'right',
  },
];

const data = Array.from({ length: 46 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`,
}));

const columns = createColumns();
const pagination = { pageSize: 10 };
const height = ref(300);

watch(
  () => projectStore.getDefaultProjectId,
  () => {
    (window as any).$message.loading('正在加载');
  },
);
</script>

<template>
  <div class="container">
    <div class="banner">
      <NCarousel autoplay>
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
        />
      </NCarousel>
    </div>

    <!-- <div>
      <n-tabs default-value="oasis">
        <n-tab-pane name="oasis" tab="Oasis">
          <template #default>
            Prefix
          </template>
        </n-tab-pane>
        <n-tab-pane name="the beatles" tab="📅 the Beatles">
          Hey Jude
        </n-tab-pane>
        <n-tab-pane name="jay chou" tab="周杰伦">
          七里香
        </n-tab-pane>
        <template #suffix>
          Suffix
        </template>
      </n-tabs>
    </div> -->

    <NCard>
      <template #header>
        <NNumberAnimation ref="numberAnimationInstRef" :from="0" :to="45" />
        条数据
        <AuthButton btnAuth="read">
          <template #icon>
            <NIcon>
              <UserOutlined />
            </NIcon>
          </template>
          这是一个read权限按钮的示例(你可以切换项目试试)
        </AuthButton>
      </template>
      <NSpace vertical>
        <NSlider
          v-model:value="height"
          :min="200"
          :max="500"
          :step="100"
          style="max-width: 180px"
        />
        <NDataTable
          :columns="columns"
          :data="data"
          :pagination="pagination"
          :scroll-x="1800"
          :style="{ height: `${height}px` }"
          flex-height
        />
      </NSpace>
    </NCard>

    <div style="height: 8px"></div>

    <NDescriptions label-placement="top" bordered :column="6">
      <NDescriptionsItem>
        <template #label> 早餐 </template>
        苹果
      </NDescriptionsItem>
      <NDescriptionsItem label="早午餐"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="午餐"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="晚餐"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="正餐"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="夜宵"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="苹果"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="苹果" :span="2"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="苹果" :span="3"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="苹果"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="苹果" :span="2"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="苹果" :span="3"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="苹果"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="苹果" :span="2"> 苹果 </NDescriptionsItem>
      <NDescriptionsItem label="苹果" :span="3"> 苹果 </NDescriptionsItem>
    </NDescriptions>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
