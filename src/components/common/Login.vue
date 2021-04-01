<template>
  <div>
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
            <el-form-item label="密码" prop="pass">
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
                <img alt="验证码" @click="getCaptcha()" :src="captchaPath" />
              </el-col>
              <el-input type="hidden" name="remember-me"></el-input>
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
          <PhoneLogin />
        </el-tab-pane>
        <el-tab-pane label="微信注册"></el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { login } from "@/request/api.js";
import PhoneLogin from "@/components/common/PhoneLogin";
import { getUUID } from "@/utils";
import { setCookie } from "@/utils/cookie";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    PhoneLogin,
  },
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var checkVerification = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      captchaPath: "",
      ruleForm: {
        account: "",
        pass: "",
        verification: "",
        phone: "",
        phoneVerification: "",
        uuid: "",
      },
      rules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        verification: [{ validator: checkVerification, trigger: "blur" }],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getCaptcha() {
      this.ruleForm.uuid = getUUID();
      this.captchaPath = `/api/lzqblog-auth/auth/defaultKaptcha?uuid=${this.ruleForm.uuid}`;
    },
    Login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm).then((data) => {
            if (data.success) {
              setCookie(data.data.token)
            }
          });
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
  created() {
    this.getCaptcha();
  },
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
.login {
  padding-top: 15px;
  padding-left: 10px;
}
//@import url(); 引入公共css类
</style>