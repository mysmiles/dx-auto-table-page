import { defineComponent, ref, watch, onMounted } from 'vue';
import T from 'element-plus/lib/components/table'

export default defineComponent({
  name: 'tablePagination',
  props: Object.assign({}, T.props, {
    pagination: {
      type: [Object, Boolean],
      default: true
    },
    tableDataIndex: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataSource: {
      type: Function,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showPagination: {
      type: [String, Boolean],
      default: true
    }
  }),
  setup(props) {
    let localPagination: object | boolean = ref(false)
     watch(props.pagination, (val: object | boolean) => {
       localPagination = val
    })
  },
})
