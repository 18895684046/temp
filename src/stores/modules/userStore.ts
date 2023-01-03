import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { Base64 } from 'js-base64';

export interface IUserState {
  // 全名
  fullname: string;

  // 邮箱
  email: string;

  // 用户权限
  permissions: string[];
}

// 存储用户相关的 store
export const useUserStore = defineStore({
  id: 'userStore',

  state: (): IUserState => ({
    fullname: '',
    email: '',
    permissions: [],
  }),

  getters: {
    getFullname(): string {
      return Cookies.get('fullname');
    },
    getEmail(): string {
      return Cookies.get('email');
    },
    getPermissions(): string[] {
      return this.permissions;
    },
  },

  actions: {
    setFullname(fullname: string) {
      this.fullname = fullname;
    },
    setEmail(email: string) {
      this.email = email;
    },
    setPermissions(permissions: any[]) {
      this.permissions = permissions;
    },
  },
});
