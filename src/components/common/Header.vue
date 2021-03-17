<template>
  <el-row type="flex" justify="center">
    <el-col :span="2" pull="1">
      <el-link :underline="false">
        <img
          id="logo"
          src="@/assets/logo/logo.png"
          width="80px"
          height="30px"
        /> </el-link
    ></el-col>
    <el-col :span="1" id="logo" pull="1">
      <el-link :underline="false">首页</el-link>
    </el-col>
    <el-col :span="1" id="logo" pull="1">
      <el-link :underline="false" id="ng">博客</el-link>
    </el-col>
    <el-col :span="1" id="logo" pull="1">
      <el-link :underline="false">下载</el-link>
    </el-col>
    <el-col :span="1" id="logo" pull="1">
      <el-link :underline="false">论坛</el-link>
    </el-col>
    <el-col :span="1" id="logo" pull="1">
      <el-link :underline="false">电子书</el-link>
    </el-col>
    <el-col :span="4">
      <el-autocomplete
        style="width: 250px; padding-top: 2px"
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
    <el-col :span="1" style="text-align: center" v-if="isLogin == 1">
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
          <el-dropdown-item :disabled="vip == 1"
            ><img
              v-if="vip == 1"
              id="vip"
              src="@/assets/icon/yvip.svg"
              alt=""
              height="30px"
              width="50px" />
            <el-tooltip
              v-if="vip == 0"
              class="item"
              effect="light"
              content="点击开通会员，即刻享有资源下载、vip博客、电子书折扣优惠！"
              placement="left"
            >
              <img
                id="vip"
                src="@/assets/icon/nvip.svg"
                alt=""
                height="30px"
                width="50px" /></el-tooltip
          ></el-dropdown-item>
          <el-dropdown-item icon="el-icon-user-solid" divided="true"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-star-on">我的收藏</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-order">我的订单</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-finance">我的钱包</el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button" divided="true"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <el-col :span="2" style="text-align: center" v-if="isLogin == 0">
      <el-button type="text" class="login" @click="dialogVisible = true"
        >登录/注册</el-button
      >
      <el-dialog
        title="登录/注册"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-tabs type="border-card">
          <el-tab-pane label="账号登录"
            ><el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
            >
              <el-form-item label="账号" prop="account">
                <el-input
                  v-model="ruleForm.account"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="verification">
                <el-col :span="12">
                  <el-input
                    style="width: 150px"
                    v-model="ruleForm.verification"
                  ></el-input>
                </el-col>
                <el-col :span="12">
                  <img
                    alt="验证码"
                    onclick="this.src='/api/lzqblog-blog/defaultKaptcha?d=' + new Date()*1"
                    src="/api/lzqblog-blog/defaultKaptcha"
                  />
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="6"
                  ><el-button type="primary" @click="Login('ruleForm')"
                    >登录</el-button
                  ></el-col
                >
                <el-col :span="12"
                  ><el-button @click="resetForm('ruleForm')"
                    >重置</el-button
                  ></el-col
                >
              </el-form-item>
            </el-form></el-tab-pane
          >
          <el-tab-pane label="手机号登录">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
            >
              <el-form-item label="手机号" prop="phone">
                <el-input
                  v-model="ruleForm.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="phoneVerification">
                <el-col :span="12">
                  <el-input
                    style="width: 150px"
                    v-model="ruleForm.phoneVerification"
                  ></el-input
                ></el-col>
                <el-col :span="12"
                  ><el-button
                    class="valiBtn"
                    :disabled="disabled"
                    @click="tackBtn"
                    >{{ valiBtn }}</el-button
                  >
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="6"
                  ><el-button type="primary" @click="phoneLogin('ruleForm')"
                    >登录</el-button
                  ></el-col
                >
                <el-col :span="12"
                  ><el-button @click="resetForm('ruleForm')"
                    >重置</el-button
                  ></el-col
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="微信注册"></el-tab-pane>
        </el-tabs>
      </el-dialog>
    </el-col>
    <el-col :span="1" v-if="isLogin == 1">
      <el-dropdown trigger="click" id="msg">
        <span class="el-dropdown-link">
          通知<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="clearfix">
            评论
            <el-badge class="mark" :value="12" />
          </el-dropdown-item>
          <el-dropdown-item class="clearfix">
            回复
            <el-badge class="mark" :value="3" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <el-col :span="2" v-if="isLogin == 1">
      <answer v-if="$route.path == '/'"
        ><el-button
          id="xbk"
          type="primary"
          size="medium"
          round
          plain
          @click="editor"
          >写博客</el-button
        ></answer
      >
      <answer v-if="$route.path == '/content'"
        ><el-button
          id="xbk"
          type="primary"
          size="medium"
          round
          plain
          @click="editor"
          >写博客</el-button
        ></answer
      >
      <answer v-if="$route.path == '/editor'"
        ><el-button
          id="xbk"
          type="primary"
          size="medium"
          @click="submit"
          round
          plain
          >发布博客</el-button
        ></answer
      >
    </el-col>
  </el-row>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { test } from "@/request/api.js";
export default {
  name: "Header",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    const phoneRegex = /^1[3456789]\d{9}$/;
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var checkVerification = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!phoneRegex.test(value)) {
        return callback(new Error("请输入正确的手机号码！"));
      } else {
        callback();
      }
    };
    var checkPhoneVerification = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    //这里存放数据
    return {
      disabled: false,
      valiBtn: "获取验证码",
      mktext: "",
      activeName: "",
      restaurants: [],
      state: "",
      timeout: null,
      userName: "lzq",
      avatarSize: 35,
      vip: 0,
      isLogin: 0,
      dialogVisible: false,
      ruleForm: {
        account: "",
        pass: "",
        verification: "",
        phone: "",
        phoneVerification: "",
      },
      rules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        verification: [{ validator: checkVerification, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        phoneVerification: [
          { validator: checkPhoneVerification, trigger: "blur" },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    tackBtn() {
      //验证码倒数60秒
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.valiBtn = "获取验证码";
          this.disabled = false;
        } else {
          this.disabled = true;
          this.valiBtn = time + "秒后重试";
          time--;
        }
      }, 1000);
    },
    submit() {
      console.log(this.mktext);
    },
    editor() {
      this.$router.push("/editor");
    },
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

    Login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    phoneLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("phoneLoginsubmit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    test().then(data => {
      console.log(data);
    });
    var that = this;
    this.$EventBus.$on("change", (mktext) => {
      that.mktext = mktext; //这是组件A发送的消息！
    });
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
  el-link {
    text-align: center;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
  }
}
.valiBtn {
  width: 100px;
  font-size: 8px;
}
p.userName {
  font-size: 25px;
  text-align: center;
  color: #000;
}
.el-dropdown-link {
  color: #409eff;
}
#vip {
  padding-left: 13px;
}
#msg {
  padding-top: 12px;
}
#xbk {
  margin-top: 5px;
  font-size: 15px;
}
.login {
  padding-top: 15px;
  padding-left: 10px;
}
</style>