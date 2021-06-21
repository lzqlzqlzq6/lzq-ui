<template>
  <div class="user">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-row class="header">
          <el-col class="ava" :offset="1" span="2">
            <el-upload
              :data="uploadData"
              class="avatar-uploader"
              action="/api/lzqblog-user/user/myUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            点击头像更换
          </el-col>
          <el-col span="5"
            ><p class="username">{{ this.$store.getters.name }}</p>
            <p class="qianm">。。。。。。。。。。。</p></el-col
          >
          <el-col span="3" :offset="13" v-if="flag"
            >
            <div class="attention">
            <el-button  v-if="isAttention" icon="el-icon-plus" type="primary" round>关注</el-button>
            <el-button  v-if="!isAttention" icon="el-icon-check" type="info" round>已关注</el-button>
            </div>
            </el-col
          >
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3"
        ><el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          active-text-color="#ffd04b"
          router="true"
        >
          <el-menu-item v-if="!flag" index="/user/profile">个人资料</el-menu-item>
          <el-menu-item index="/user/blog">博客</el-menu-item>
          <el-menu-item index="3">关注</el-menu-item>
          <el-menu-item index="4">粉丝</el-menu-item>
        </el-menu></el-col
      >
      <el-col :span="18" :offset="3">
        <router-view style="margin-top: 10px;"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      isAttention:false,
      flag: this.$route.query.userId?true:false,
      imageUrl: this.$store.getters.avatar,
      uploadData: { username: this.$store.getters.name },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
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
.qianm {
  font-family: "Helvetica Neue";
  font-size: 16px;
  color: #d9d9d9;
}
.username {
  font-family: "Helvetica Neue";
  
  padding-top: 120px;
  font-size: 25px;
  color: #d9d9d9;
}
.attention{
  padding-top: 165px;
}
.ava {
  padding-top: 150px;
  font-size: 10px;
  color: #d9d9d9;
}
.header {
  height: 250px;
  background-image: url("../../assets/images/1.jpg");
}
.user {
  margin-top: 10px;
  min-height: 510px;
}
//@import url(); 引入公共css类
//卡片
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 480px;
}
//文件上传
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
</style>