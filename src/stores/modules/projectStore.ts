import { defineStore } from 'pinia';
import { getDefaultProject, getProjects, updateDefaultProject } from '@/http/service/uniauth';

export interface Project {
  label: string;
  value: string;
  [propName: string]: any;
}

interface ProjectConfig {
  // 默认项目
  defaultProject: string;

  // 项目列表
  projects: Project[];

  // 默认项目 id
  defaultProjectId: string;
}

// 存储项目相关的 store
export const useProjectsStore = defineStore({
  id: 'projectStore',

  state: (): ProjectConfig => ({
    defaultProject: '',
    projects: [],
    defaultProjectId: '',
  }),

  getters: {
    getDefaultProject(): string {
      return this.defaultProject;
    },
    getProjects(): any[] {
      return this.projects;
    },
    getDefaultProjectId(): string {
      return this.defaultProjectId;
    },
  },

  actions: {
    // 获取项目列表
    getAllProjects() {
      getProjects({ appName: 'default' }).then((res: any) => {
        if (res.success) {
          this.projects = res?.data?.map((p: Project) => ({
            label: `${p?.projectId}  ${p?.projectName}`,
            value: p?.projectId,
          }));
        }
      });
    },

    // 设置默认 projectId
    async setDefaultProjectId() {
      const projectId = (await getDefaultProject())?.data?.projectId || '';
      console.log(projectId, 'projectId');
      this.defaultProjectId = projectId;
    },

    // 更新默认 projectId
    async updateDefaultProjectId(projectId: string) {
      await updateDefaultProject({ projectId });
      sessionStorage.setItem('projectId', projectId);
      this.defaultProjectId = projectId;
    },
  },
});
