<template>
  <el-dropdown placement="bottom" @visible-change="havAvatar">
    <el-avatar
      style="margin-top: 5px"
      :size="avatarSize"
      :src="avatar"
      class="el-dropdown-link"
    >
    </el-avatar>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item disabled="true"
        ><p class="username">{{ userName }}</p></el-dropdown-item
      >
      <el-dropdown-item :disabled="vip == 1"
        ><img
          v-if="vip == 1"
          id="vipcss"
          src="@/assets/icon/yvip.svg"
          alt=""
          height="25px"
          width="50px" />
        <el-tooltip
          v-if="vip == 0"
          class="item"
          effect="light"
          content="点击开通会员，即刻享有资源下载、vip博客、电子书折扣优惠！"
          placement="left"
        >
          <img
            id="vipcss"
            src="@/assets/icon/nvip.svg"
            alt=""
            height="25px"
            width="50px" /></el-tooltip
      ></el-dropdown-item>
      <router-link to="/user/profile">
      <el-dropdown-item icon="el-icon-user-solid" divided="true"
        >个人中心</el-dropdown-item
      ></router-link>
      <el-dropdown-item icon="el-icon-star-on">内容管理</el-dropdown-item>
      <!-- <el-dropdown-item icon="el-icon-s-order">我的订单</el-dropdown-item>
      <el-dropdown-item icon="el-icon-s-finance">我的钱包</el-dropdown-item> -->
      <el-dropdown-item icon="el-icon-switch-button" divided="true"
        >退出</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Avatar",
  components: {},
  data() {
    //这里存放数据
    return {
      avatar: this.$store.getters.avatar?this.$store.getters.avatar:'',
      userName: this.$store.getters.name?this.$store.getters.name:'',
      avatarSize: 35,
      vip: this.$store.getters.roles.includes('MEMBER')?1:0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getInfo() {
          this.$store
            .dispatch("Login", this.ruleForm)
            .then(() => {
              this.dialogVisible = false;
              this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
            })
            .catch(() => {
            });
    },
    havAvatar(vd) {
      vd ? (this.avatarSize = 45) : (this.avatarSize = 35);
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
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.username {
  font-size: 25px;
  text-align: center;
  color: #000;
}
#vipcss {
  padding-left: 13px;
}
</style>