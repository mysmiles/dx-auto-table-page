import {defineComponent, ref, watch, onMounted, reactive, Ref} from 'vue';
import T from 'element-plus/lib/components/table/src/table'
import { PaginationProps } from 'element-plus/lib/components/pagination/src/pagination'

export default defineComponent({
  name: 'tablePagination',
  props: Object.assign({}, T.prop, {
    // 这个就是一个作用，true：最简单的分页器，false：没有分页器，obj：分页器的props
    pagination: {
      type: [Object, Boolean],
      default: true
    },
    // table的头部
    tableDataIndex: {
      type: Array,
      default: () => {
        return []
      }
    },
    // table的请求方法，这个存在是为了自己处理分页的逻辑，不需要在每个页面都写一遍
    dataSource: {
      type: Function,
      // required: true
    },
    // 其实是pagination的一个属性，他的存在是方便如果pagination传入true，直接传分页信息就行
    currentPage: {
      type: Number,
      default: 1
    },
    // 跟上一个属性是一样的
    pageSize: {
      type: Number,
      default: 10
    }
  }),
  setup(props) {
    const localData: Array<Object> = reactive([])
    const localTableDataIndex: Array<Object> = reactive(props.tableDataIndex)
    let localLoading = ref(false)
    let localPagination: object = reactive({})

    watch(() => {props.currentPage}, (val) => {
      Object.assign(localPagination, {
        currentPage: val
      })
    })

    watch(() => {props.pageSize}, (val) => {
      Object.assign(localPagination, {
        pageSize: val
      })
    })

    localPagination = props.pagination && Object.assign({}, localPagination, {
      currentPage: (localPagination as PaginationProps).currentPage,
      pageSize: props.pageSize
    }) || {}

    return () => {
      return (
          <div>
            111
            <span>{localLoading.value}</span>
          </div>
      )
    }
  }
})
