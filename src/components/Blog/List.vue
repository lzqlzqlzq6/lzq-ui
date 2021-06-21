<template>
  <div class="list">
    <router-link
      v-for="blog in blogList"
      :key="blog.id"
      :to="{ name: 'content', query: { id: blog.id } }"
    >
      <el-card shadow="hover">
        <p class="title" v-html="blog.title"></p>
        <p class="introduce">{{ blog.description }}</p>
        <span><b>作者</b>: {{ blog.nickname }}</span
        ><span><b>时间</b>: {{ blog.updateTime }}</span
        ><span><b>浏览</b>: {{ blog.browsenum }}</span
        ><span><b>分类</b>: {{ blog.typeName }}</span>
      </el-card></router-link
    >
    <div class="block">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total,prev, pager, next"
        :total="total"
        hide-on-single-page="true"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getAllBlog } from "@/request/api";
import { finishLoading, startLoading } from "@/utils/loading";
export default {
  name: "Blog",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      typeId: -1,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      blogList: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    indexFromNav(obj) {
      this.typeId=obj.typeId;
      this.getAllBlogs(0,this.pageSize,this.typeId,'');
    },
    getAllBlogs(from, size, typeId,querySeach) {
      getAllBlog(from, size, typeId,querySeach).then((res) => {
        startLoading();
        if (res.success) {
          finishLoading();
          this.blogList = res.data.blogs;
          this.total = res.data.total;
        } else {
        }
      });
    },
    querySearch(obj){
      console.log(obj.query);
      this.getAllBlogs(0,this.pageSize,-1,obj.query);
    },

    handleCurrentChange(val) {
      var form = (val - 1) * this.pageSize;
      this.getAllBlogs(form, this.pageSize,this.typeId);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$EventBus.$on("querySearch", this.querySearch);
    this.$EventBus.$on("findByTypeId", this.indexFromNav);
    this.getAllBlogs(0,this.pageSize,-1,'');
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.list {
  width: 200px;
  min-height: 550px;
  a {
    text-decoration: none;
  }
  .el-card {
    margin-bottom: 10px;
    width: 740px;
    .title {
      font-weight: bold;
      font-size: 17px;
    }
    span {
      margin: 0px 20px 0px 0px;
      padding: 0;
      font-size: 12px;
      color: rgb(168, 168, 168);
    }
    .introduce {
      font-size: 12px;
    }
    .text {
      font-size: 20px;
    }
    p {
      font-size: 20px;
      margin: 0px 0px 5px 0px;
      padding: 0px 0px 5px 0px;
    }
  }
}
</style>