<template>
  <div class="blog">
    <a href="#" v-for="o in 10" :key="o">
      <el-card shadow="hover">
        <p class="title">123</p>
        <p class="bi">123</p>
        <span><b>作者</b>: xxx</span><span><b>时间</b>: 2021/03/05 17:36</span
        ><span><b>浏览</b>: 10000</span><span><b>分类</b>: xxxx</span>
      </el-card></a
    >
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-size="100"
        layout="total,prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "Blog",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.blog {
  width: 200px;
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
    .bi {
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