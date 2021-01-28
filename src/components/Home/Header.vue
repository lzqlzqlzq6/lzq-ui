<template>
  <el-row type="flex">
    <el-col :span="2"
      ><img id="logo" src="@/assets/logo/logo.png" width="80px" height="30px"
    /></el-col>
    <el-col :span="6" id="logo"
      ><el-tabs v-model="activeName">
        <el-tab-pane label="首页" name="home"></el-tab-pane>
        <el-tab-pane label="博客" name="blog"></el-tab-pane>
        <el-tab-pane label="下载" name="down"></el-tab-pane>
        <el-tab-pane label="论坛" name="forum"></el-tab-pane>
        <el-tab-pane label="问答" name="qa"></el-tab-pane>
        <el-tab-pane label="电子书" name="book"></el-tab-pane> </el-tabs
    ></el-col>
    <el-col :span="6" :push="1">
      <el-autocomplete
        style="width: 350px; padding-top: 2px"
        clearable="true"
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入搜索内容"
        @select="handleSelect"
      >
        <i
          class="el-icon-search el-input__icon"
          slot="suffix"
          @click="handleIconClick"
        >
        </i>
      </el-autocomplete>
    </el-col>
    <el-col :span="2" :push="1">
      <el-dropdown placement="bottom" @visible-change="havAvatar">
        <el-avatar
          style="margin-top: 5px"
          :size="avatarSize"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          class="el-dropdown-link"
        >
        </el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled="true"
            ><p class="userName">{{ userName }}</p></el-dropdown-item
          >
          <el-dropdown-item disabled="true"
            ><img
            v-if="vip==1"
              id="vip"
              src="@/assets/icon/yvip.svg"
              alt=""
              height="30px"
              width="50px"
          />
          <img
            v-if="vip==0"
              id="vip"
              src="@/assets/icon/nvip.svg"
              alt=""
              height="30px"
              width="50px"
          /></el-dropdown-item>
          <el-dropdown-item icon="el-icon-user-solid"
            >个人中心</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "Header",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      activeName: "",
      restaurants: [],
      state: "",
      timeout: null,
      userName: "lzq",
      avatarSize: 35,
      vip: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    loadAll() {
      return [
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼",
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13",
        },
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    havAvatar(vd) {
      vd ? (this.avatarSize = 45) : (this.avatarSize = 35);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.restaurants = this.loadAll();
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
#logo {
  margin-top: 7px;
  margin-left: 30px;
}
p.userName {
  font-size: 25px;
  text-align: center;
  color: #000;
}
#vip {
  padding-left: 13px;
}
/*搜索框*/
</style>