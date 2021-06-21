<template>
  <div class="navigation">
    <el-card class="box-card">
      <el-button class="bt" type="text" @click="findByTypeId(0)">热点</el-button>
      <div v-for="type in typeList" :key="type.id" class="text item">
        <el-button class="bt" type="text" @click="findByTypeId(type.id)">{{
          type.name
        }}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getType } from "@/request/api";
import { finishLoading, startLoading } from "@/utils/loading";
export default {
  name: "Navigation",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      typeList: [],
      isCollapse: true,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    findByTypeId(id){
      this.$EventBus.$emit('findByTypeId',{typeId:id});
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

    getType().then((res) => {
      startLoading();
      if (res.success) {
        this.typeList = res.data.typeList;
        finishLoading();
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 600px;
}
.navigation {
  width: 100px;
  .bt {
    color: rgb(100, 100, 100);
    min-width: 60px;
    &:hover {
      background-color: rgb(218, 218, 218);
      font-weight: bold;
      color: #000;
    }
  }
}
</style>