<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="13" :offset="3">
        <el-card class="box-card">
          <router-link :to="{ name: 'auther', query: { id: username } }">
            <el-tooltip
              class="item"
              effect="dark"
              content="点击进入作者主页"
              placement="bottom"
            >
              <el-avatar
                size="medium"
                :src="userNvatar"
              ></el-avatar></el-tooltip
          ></router-link>
          <span class="font">作者: {{ nickname }}</span>
          <span class="font">分类: {{ typeName }}</span
          ><span class="font">浏览: {{ browsenum }}</span
          ><span class="font">最后修改于: {{ updateTime }}</span>
          <!-- <el-col span="2">评论: {{}}</el-col> -->
        </el-card>
        <mavon-editor
          class="md"
          :value="htmlContent"
          defaultOpen="preview"
          :subfield="false"
          :toolbarsFlag="false"
          :scrollStyle="false"
          :editable="false"
      /></el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getBlog } from "@/request/api";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据

    return {
      nickname: "",
      blogId: this.$route.query.id,
      userNvatar: "",
      typeName: "",
      browsenum: "",
      updateTime: "",
      htmlContent: "",
      isCollect: false,
      username: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    getBlog(this.blogId, this.$store.getters.name).then((res) => {
      if (res.success) {
        this.userNvatar = res.data.blog.userNvatar;
        this.typeName = res.data.blog.typeName;
        this.browsenum = res.data.blog.browsenum;
        this.htmlContent = res.data.blog.content;
        this.isCollect = res.data.blog.isCollect;
        this.nickname = res.data.blog.nickname;
        this.updateTime = res.data.blog.updateTime;
        this.username = res.data.blog.username;
      } else {
      }
    });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.md {
  margin-top: 3px;
  min-height: 550px;
  width: 1100px;
}
.font {
  font-size: 14px;
  color: rgb(168, 168, 168);
  margin-left: 10px;
  margin-top: 0;
  padding: 0;
}
.box-card {
  background-color: rgb(251, 251, 251);
  width: 1100px;
  margin-top: 10px;
  padding: 0;
}
.sty {
  padding-top: 220px;
}
</style>