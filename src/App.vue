<script setup lang="ts">
import { nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { NConfigProvider, NLoadingBarProvider, NMessageProvider,darkTheme } from 'naive-ui'
import Header from '@/components/Header/index.vue'
import MobileHeader from '@/mobileComponents/mobileHeader/index.vue'
import { themeOverrides } from '@/theme'
import LoadingBarApi from '@/components/LoadingBarApi/index.vue'
import MessageApi from '@/components/MessageApi/index.vue'
import useNavbar from '@/hooks/useNavbar'
import { useProjectsStore } from '@/stores/modules/projectStore'
import verifyPermission from '@/utils/verifyPermission'

const projectStore = useProjectsStore()
const { getDefaultProjectId, getProjects } = storeToRefs(projectStore)

const navbar = useNavbar()

// 验证用户权限
verifyPermission()

nextTick(() => {
  projectStore.setDefaultProjectId()
  projectStore.getAllProjects()
})

</script>

<template>
  <NConfigProvider class="n-provider" :theme-overrides="themeOverrides">
    <NLoadingBarProvider>
      <LoadingBarApi />
    </NLoadingBarProvider>

    <NMessageProvider>
      <MessageApi />
    </NMessageProvider>

    <div class="hd-mobile">
      <MobileHeader :navbar="navbar" :projectId="getDefaultProjectId" :projects="getProjects"
        :handleProjectSelected="projectStore.updateDefaultProjectId" />
    </div>

    <div class="hd-pc">
      <Header :navbar="navbar" :projectId="getDefaultProjectId" :projects="getProjects"
        :handleProjectSelected="projectStore.updateDefaultProjectId" />
    </div>

    <div class="main">
      <router-view></router-view>
    </div>
  </NConfigProvider>
</template>

<style lang="scss">
@import "@/styles/global.scss";

.main {
  height: calc(100vh - 50px);
  overflow: auto;
  background-size: 100% 100%;
  background-image: url(https://s1.hdslb.com/bfs/static/stone-free/dyn-home/assets/background.png);
  background-position: top;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

@media only screen and (min-width: 1100px) {
  .n-provider {
    height: 100%;
  }

  .hd-mobile {
    display: none;
  }
}

@media only screen and (max-width: 1099px) {
  .n-provider {
    height: 100%;
  }

  .hd-pc {
    display: none;
  }
}
</style>
