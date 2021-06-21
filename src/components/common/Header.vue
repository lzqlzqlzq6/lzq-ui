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
      <el-link :underline="false" :type="type" href="/">首页</el-link>
    </el-col>
    <el-col :span="1" id="logo" pull="1">
      <el-link :underline="false" id="ng" :type="type" href="/blog"
        >博客</el-link
      >
    </el-col>
    <el-col :span="1" id="logo" pull="1" v-hasRole="['USER']">
      <el-link :underline="false" :type="type">下载</el-link>
    </el-col>
    <el-col :span="4">
      <el-autocomplete
      :disabled="this.$route.path== '/blog' ? false : true"
        :trigger-on-focus="false"
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
      <Avatar />
    </el-col>
    <el-col :span="2" style="text-align: center" v-if="isLogin == 0">
      <Login />
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
      <el-button
        id="xbk"
        type="primary"
        size="medium"
        round
        plain
        @click="editor"
        >写博客</el-button
      >
    </el-col>
  </el-row>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Avatar from "@/components/common/Avatar";
import Login from "@/components/common/Login";
import { getToken } from "@/utils/cookie";
import { getType } from "@/request/api";
export default {
  name: "Header",
  //import引入的组件需要注入到对象中才能使用
  components: {
    Avatar,
    Login,
  },
  data() {
    //这里存放数据

    return {
      type: "default",
      disabled: false,
      //mktext: "",
      activeName: "",
      state: "",
      timeout: null,
      isLogin: getToken() ? 1 : 0,
      redirect: "",
      menu: false,
      queryList: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  //方法集合
  methods: {
    submit() {
      console.log(this.mktext);
    },
    editor() {
      this.$router.push("/editor");
    },
    querySearchAsync(queryString, cb) {
      var queryList = this.queryList;
        var results = queryString ? queryList.filter(this.createFilter(queryString)) : queryList;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
      
    },
    createFilter(queryString) {
        return (queryList) => {
          return (queryList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    handleSelect(item) {
      console.log('handleSelect'+item);
    },
    handleIconClick(ev) {
      this.$EventBus.$emit('querySearch',{query:this.state});
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var list = [];
    getType().then((res) => {
      if (res.success) {
        for (let item of res.data.typeList) {
          list.push({
            value: item.name,
            id: item.id,
          });
        }
      }
    });
    this.queryList = list;
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
.el-dropdown-link {
  color: #409eff;
}
#msg {
  padding-top: 12px;
}
#xbk {
  margin-top: 5px;
  font-size: 15px;
}
</style>