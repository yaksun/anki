<template>
    <div>
        <el-button @click="handleSubmit">登录</el-button>
        <el-button @click="getToDoTaskList">添加</el-button>
    </div>
</template>
<script>
import Vue from 'vue' 
import { Component } from 'vue-property-decorator'
import axios from 'axios'
import { gql } from 'apollo-boost';

@Component({})
export default class Note extends Vue{
   async handleSubmit(){
       await axios.post('/ps/session',{"email":"sunk@gzjp.cn","password":"zhuimeng1004"}).then(res=>{
            console.log(res);
        })
        await this.handleAdd()
    }

   async handleAdd(){
       await axios.post('/ps/project/jppims/scrumlog/store',{"project_key":"jppims","module_name":"","module_id":"","today":"111","scrumlog_date":1618368711820}).then(res=>{
            console.log(res);
        })
    }

     /**
   * 获取待办任务列表
   * @param 用户名
   */
   async getToDoTaskList(userName){
    this.$apollo
      .query({
        query: gql`
          query getAvTaskList($name: String!){
            toDoTasksList(name: $name){
              issue_no,
              issue_title,
              project_key,
              project_name,
              record_create_time,
            }
          }`,
        variables: { name: userName }
      })
      .then((result) => {
        if(result && result.data && result.data.toDoTasksList) {
          const resultData = result.data;
          const tasks = resultData.toDoTasksList;
          
          let arrayTask = [];
          tasks.forEach(element => {
            let task={}
            task.issue_title = element.issue_title;
            task.project_name = element.project_name;
            task.record_create_time = element.record_create_time;
            task.issue_no = element.issue_no;
            task.project_key = element.project_key;
            arrayTask.push(task);
          });
          this.tasks = arrayTask;
        }
        else{
         
        }
        
      });
  }

}
</script>
