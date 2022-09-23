import { defineComponent, ref, watch, onMounted } from 'vue';
import T from 'element-plus/lib/components/table/src/table'
import { PaginationProps } from 'element-plus/lib/components/pagination/src/pagination'

export default defineComponent({
  name: 'tablePagination',
  props: Object.assign({}, T.prop, {
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
      // required: true
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
     watch(props.pagination, (val: PaginationProps | boolean) => {
       localPagination = val
    })
    localPagination = ['auto', true].includes(props.showPagination) && Object.assign({}, localPagination, {
      currentPage: (localPagination as PaginationProps).currentPage,
      pageSize: props.pageSize
    }) || false

    return () => {
      return (
          <div>111</div>
      )
    }
  },
})
