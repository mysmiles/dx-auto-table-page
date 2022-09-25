import type {App} from "vue";
import { tablePagination } from "./TestA";
import '../package/index.less';


const components: any[] = [tablePagination];
const install = (app: App) => {
  components.map(component => {
    app.component(component.name, component)
  })
}

export {tablePagination}
export default {
  install,
  ...components
}
