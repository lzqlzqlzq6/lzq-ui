<template>
  <el-row id="index">
    <div :class="fixed == true ? 'navFixed' : 'nav'">
      <el-col :span="2"><Navigation /> </el-col>
    </div>
    <div :class="fixed == true ? 'listFixed' : 'list'">
      <el-col :span="8"><List /> </el-col>
    </div>
    <div :class="fixed == true ? 'linkFixed' : 'link'">
      <el-col :span="4"><Link /> </el-col></div
  ></el-row>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Navigation from "@/components/Blog/Navigation";
import List from "@/components/Blog/List";
import Link from "@/components/Blog/Link";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Index",
  components: {
    Navigation,
    List,
    Link,
  },
  data() {
    //这里存放数据
    return {
      fixed: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    navScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = document.querySelector("#index").offsetTop;
      if (scrollTop > offsetTop) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    window.addEventListener("scroll", this.navScroll);
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
#index {
  margin-top: 10px;
}
.navFixed {
  position: fixed;
  top: 60px;
  z-index: 999;
  margin-left: 16.5%;
}
.listFixed {
  margin-left: 23.4%;
}
.linkFixed {
  position: fixed;
  top: 60px;
  z-index: 999;
  margin-left: 70.7%;
}
.nav {
  margin-left: 16.5%;
}
.list {
  margin-left: 0.1%;
}
.link {
  margin-left: 69.1%;
}
</style>