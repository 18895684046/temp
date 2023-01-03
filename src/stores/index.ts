import type { App } from 'vue';
import { createPinia } from 'pinia';

const rootStore = createPinia();

export function setupStore(app: App<Element>) {
  app.use(rootStore);
}

export { rootStore };
