import { watch } from 'vue';
import { useProjectsStore } from '@/stores/modules/projectStore';
import { useUserStore } from '@/stores/modules/userStore';
import { getPermissions } from '@/http/service/uniauth';

// 验证用户是否有访问平台的权限
const verifyPermission = () => {
  const projectStore = useProjectsStore();
  const userStore = useUserStore();

  watch(
    () => projectStore.getDefaultProjectId,
    (projectId) => {
      if (projectId) {
        // 获取在项目中角色
        getPermissions({
          appName: 'default',
          email: userStore.getEmail,
          projectId: projectStore.getDefaultProjectId,
        }).then((res) => {
          // 无角色代表无访问权限
          // console.log(res, '当前用户权限');
          if (res?.success) {
            // 存储用户权限到 store 中
            userStore.setPermissions(res?.data);
          }
        });
      }
    },
  );
};

export default verifyPermission;
