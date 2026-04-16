# Vue 3 完整引入（摘录）

详见 `docs/quickstart.md`。

```typescript
import { createApp } from 'vue';
import LyUi from 'ly-ui';
import locale from 'ly-ui/lib/locale/lang/zh-cn';
import 'ly-ui/dist/index.css';
import App from './App.vue';

const app = createApp(App);
app.use(LyUi, { locale });
app.mount('#app');
```
