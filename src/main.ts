import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
   Button, 
  Select ,
  Option,
  Card,
  Col,
  Row ,
  Input,
  Dialog,
  Form,
  FormItem,
  Message,
  Tag,
  Table,
  TableColumn,
  Pagination,
  Popover,
  DatePicker,
  Upload,
  MessageBox
} from 'element-ui';
// import './mock'

Vue.config.productionTip = false
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Card.name, Card);
Vue.component(Col.name, Col);
Vue.component(Row.name, Row);
Vue.component(Input.name, Input);
Vue.component(Dialog.name, Dialog);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Tag.name, Tag);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Pagination.name, Pagination);
Vue.component(Popover.name, Popover);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Upload.name, Upload);
Vue.component(Message.name, Message);
Vue.component(MessageBox.name, MessageBox);


Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
