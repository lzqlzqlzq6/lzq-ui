<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
  >
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="phoneVerification">
      <el-col :span="12">
        <el-input
          style="width: 150px"
          v-model="ruleForm.phoneVerification"
        ></el-input
        >
      </el-col>
      <el-col :span="12"
      >
        <el-button class="valiBtn" :disabled="disabled" @click="tackBtn">{{
            valiBtn
          }}
        </el-button>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="6"
      >
        <el-button type="primary" @click="phoneLogin('ruleForm')"
        >登录
        </el-button
        >
      </el-col
      >
      <el-col :span="12"
      >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-col
      >
    </el-form-item>
  </el-form>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "PhoneLogin",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    const phoneRegex = /^1[3456789]\d{9}$/;
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!phoneRegex.test(value)) {
        return callback(new Error("请输入正确的手机号码！"));
      } else {
        this.disabled = false;
        callback();
      }
    };
    var checkPhoneVerification = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    //这里存放数据
    return {
      disabled: true,
      valiBtn: "获取验证码",
      ruleForm: {
        phone: "",
        phoneVerification: ""
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        phoneVerification: [
          { validator: checkPhoneVerification, trigger: "blur" }
        ]
      }
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
    phoneLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('phoneDialogVisible',false);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  beforeCreate() {
  }, //生命周期 - 创建之前
  beforeMount() {
  }, //生命周期 - 挂载之前
  beforeUpdate() {
  }, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.valiBtn {
  width: 100px;
  font-size: 8px;
}
</style>