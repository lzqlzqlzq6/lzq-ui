<template>
  <div id="app" :class="this.$route.path == '/' ? 'home' : ''">
    <el-backtop
      :bottpm="40"
    ><div class="top">UP</div>
    </el-backtop>
    <div :class="headerFixed == true ? 'isFixed' : 'header'">
      <Header />
    </div>
    <router-view />
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
export default {
  name: "Layout",
  components: {
    Header,
    Footer,
  },
  data() {
    //这里存放数据
    return {
      headerFixed: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = document.querySelector("#app").offsetTop;
      if (scrollTop > offsetTop) {
        this.headerFixed = true;
      } else {
        this.headerFixed = false;
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
.home {
  background-image: url("../assets/images/6.gif");
}
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
.header {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 46px;
}
.isFixed {
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 46px;
  width: 100%;
}
</style>
