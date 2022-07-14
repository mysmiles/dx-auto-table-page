# 自动生成表格页

> 前言：表格页面在管理系统中很常见，每一次都重新写搜索条件，写带有接口数据的表格，写分页，便有了这个通过配置自动生成的页面，减少了不必要的重复工作，减少了没必要的重复逻辑。

表格页面分为两部分，一部分是上方搜索条件，一部分是接口返回的数据生成的表格（带分页功能）。

### 搜索条件

#### 1.使用方法

```html
<!-- html -->

<search-form
    :form-data="searchFormData"
    :form-index="searchFormIndex"
    @submit="submit"
    @reset="reset"
/>
```

```js
<!-- js -->

data() {
    return {
      searchFormData: {
        name: '',
        type: '',
        status: '',
        rangTime: '',
        orgId: ''
      },
      searchFormIndex: [
        {
          formLabel: '户主:',
          formItemType: 'input',
          model: 'name'
        },
        {
          formLabel: '防反贫类型:',
          formItemType: 'select',
          model: 'type',
          options: [
            {
              label: '类型1',
              value: 1
            }
          ]
        },
        {
          formLabel: '审核类型:',
          formItemType: 'select',
          model: 'status',
          options: [
            {
              label: '状态1',
              value: 1
            }
          ]
        },
        {
          formLabel: '',
          formItemType: 'cascader',
          model: 'orgId'
        },
        {
          formLabel: '提交时间:',
          formItemType: 'datePicker',
          model: 'rangTime'
        }
      ]
    }
  },
  methods: {
    submit(data) {
      console.log(data);
    },
    reset(data) {
      console.log(data);
    }
  }
```

#### 2. props

| 参数           | 说明           | 类型   | 可选值 | 默认值 |
| -------------- | -------------- | ------ | ------ | ------ |
| formIndex      | 搜索表单项配置 | Array  | --     | []     |
| formData       | 表单的数据     | Object | --     | {}     |
| formConfigJson | Form表单配置   | Object | --     | {}     |

##### 2.1 formIndex配置

| 参数         | 说明                                             | 类型   | 可选值                                                       | 默认值                                    |
| ------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ | ----------------------------------------- |
| formLabel    | formItem的label                                  | String | --                                                           | --                                        |
| formItemType | formItem下的表单类型                             | String | 'input', 'select', 'datePicker', 'radio', 'checkbox', 'cascader' | --                                        |
| model        | 表单绑定的数据字段                               | String | --                                                           | --                                        |
| options      | 如果表单类型是select，这个字段必填，是下拉的选项 | Array  | --                                                           | [{     label: '类型1',     value: 1   } ] |
| 个性化props  | 根据不同的type，传入不同prop的属性               | --     | --                                                           | --                                        |

> 个性化props解释：如果formItemType不同，会生成不同的表单控件，不同的表单控件需要设置自己的props，可根据不同的情况传不同的参数配置，会生成对应的表单控件。

##### 2.2 formData配置

formData是表单的form，绑定在<el-form>上的model上。字段需要formIndex中的model对的上，才可以实现字段的绑定。

##### 2.3 formConfigJson

formConfigJson是<el-form>的form的prop属性。例如 label-width， label-position等配置，这个配置会全部绑定到<el-form>上。

#### 3. event

| 事件名称 | 说明                                                       | 回调参数   |
| -------- | ---------------------------------------------------------- | ---------- |
| reset    | 点击重置按钮，数据会重置到第一次传入表单数据，同时抛出事件 | form的data |
| submit   | 点击提交时触发                                             | form的data |

### 表格部分

#### 1.使用方法

```html
<!-- html -->

 <TablePagination
 	:tableDataIndex="tableDataIndex"
    :dataSource="dataSource"
    @selection-change="handleSelectionChange"
    ref="table"
  >
     <span slot="action" slot-scope="scope">
         <p>{{ scope.row }}</p>
         <p>{{ scope.$index }}</p>
         <p>Delete</p>
         <p class="ant-dropdown-link"> More actions </p>
     </span>
</TablePagination>
```

```js
<!-- js -->

data() {
    return {
      tableDataIndex: [
        {
          type: 'selection',
          width: '180'
        },
        {
          prop: 'name',
          label: '姓名',
          width: '180'
        },
        {
          prop: 'sex',
          label: '性别',
          width: '180'
        },
        {
          label: '操作',
          scopedSlots: { customRender: 'action' },
          width: '180'
        }
      ],
      dataSource: (parma) => {
        const requestParma = Object.assign(this.searchFormData, parma)
        return this.mockRequest(requestParma).then(res => {
          console.log(res)
          return res
        })
      },
      multipleSelection: []
    }
  },
  methods: {
    refresh() {
      this.$refs.table.refresh()
    },
    mockRequest(param) {
      console.log(param)
      return new Promise((resolve, reject) => {
        setTimeout(_ => {
          resolve({
            data: [
              {
                name: '111',
                sex: '222'
              }
            ],
            totalCount: 20
          })
        }, 2000)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
```

#### 2. props

| 参数           | 说明                                               | 类型            | 可选值              | 默认值 |
| -------------- | -------------------------------------------------- | --------------- | ------------------- | ------ |
| pagination     | 分页的配置，详情参考el-pagination的配置            | Object          | --                  | --     |
| tableDataIndex | 表格的列配置项                                     | Array           | --                  | []     |
| dataSource     | 表格数据来源（必填）                               | Function        | --                  | --     |
| showPagination | 是否显示分页                                       | String, Boolean | 'auto', true, false | true   |
| pageSize       | page每页条数，可在pagination中传进来，直接传也可以 | Number          | --                  | 10     |

##### 2.1 tableDataIndex

| 参数                    | 说明                                                | 类型   | 可选值                     | 默认值 |
| ----------------------- | --------------------------------------------------- | ------ | -------------------------- | ------ |
| Table-column Attributes | 表格column的Attributes，参考Table-column Attributes | --     | --                         | --     |
| scopedSlots             | 自定义作用域插槽                                    | Object | { customRender: 'action' } | --     |

##### 2.2 dataSource

传入表格接口的方法，需要return一个promise，方法回调参数是一个对象，包括分页信息的一个对象，是currentPage和pageSize。

#### 3. event

无

#### 4. table方法

| 方法名  | 说明                       | 参数                                     |
| ------- | -------------------------- | ---------------------------------------- |
| refresh | 重新调用接口，查列表数据。 | bool（默认true），是否强制刷新到第一页。 |

#### 5. Scoped Slot

| name   | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| 自定义 | 自定义列的内容，名字在tableDataIndex中自定义的scopedSlots对象中的customRender，参数为{ row, column, $index } |

