import type {App} from "vue";
import {TestA} from "./testA";
import './index.less';


const components: any[] = [TestA];
const install = (app: App) => {
  components.forEach(component => app.component((component.name, component)))
}
export {TestA}
export default {
  install,
  ...components
}
