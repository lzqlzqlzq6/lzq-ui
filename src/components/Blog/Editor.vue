<template>
  <div class="editor">
    <el-input
      class="input"
      type="text"
      placeholder="请输入博客标题"
      v-model="title"
      maxlength="15"
      show-word-limit
    >
    </el-input>
    <el-select
      v-model="typeId"
      clearable
      placeholder="请选择博客分类"
      class="input"
    >
      <el-option
        v-for="item in typeList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-input
      class="input"
      type="textarea"
      placeholder="请输入内容"
      v-model="description"
      maxlength="30"
      show-word-limit
    >
    </el-input>
    <mavon-editor
      :ishljs="true"
      default_open="edit"
      :toolbars="toolbars"
      class="mavonEditor"
      @change="change"
      @save="saveMavon"
      @imgAdd="imgAdd"
      @imgDel="imgDel"
      ref="md"
    ></mavon-editor>
    <el-button type="primary" round class="but" @click="pushBlog"
      >发布博客</el-button
    >
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { uploadImg, getType, pushBlog } from "@/request/api";
import { finishLoading, startLoading } from "@/utils/loading";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      username: this.$store.getters.name,
      comment: true,
      title: "",
      description: "",
      typeId: "",
      content: "",
      typeList: [],
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    pushBlog() {
      if (this.title !== "") {
        if (this.description !== "") {
          if (this.typeId !== "") {
            if (this.content !== "") {
              startLoading();
              pushBlog(
                this.title,
                this.description,
                this.content,
                this.typeId,
                this.username,
                this.comment
              ).then((res) => {
                if (res.success) {
                  finishLoading();
                  window.location.reload();
                } else {
                  console.log(res);
                }
              });
            } else {
              this.$message({
                message: "请输入博客内容",
                type: "warning",
              });
            }
          } else {
            this.$message({
              message: "请选择博客类型",
              type: "warning",
            });
          }
        } else {
          this.$message({
            message: "请填写博客简介",
            type: "warning",
          });
        }
      } else {
        this.$message({
          message: "请填写博客标题",
          type: "warning",
        });
      }
    },
    imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var _this = this;
      var formdata = new FormData();
      formdata.append("image", $file);
      uploadImg(formdata).then((resp) => {
        var url = resp.data.path; //取出上传成功后的url
        if (resp.success) {
          _this.$refs.md.$imglst2Url([[pos, url]]);
        } else {
          console.log(resp);
        }
      });
    },
    imgDel(pos) {
      delete this.imgFile[pos];
    },
    change(value) {
      this.content = value;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    getType().then((res) => {
      if (res.success) {
        console.log(this.typeList);
        this.typeList = res.data.typeList;
      } else {
        console.log(res);
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
//@import url(); 引入公共css类
.but {
  margin-top: 10px;
  width: 100%;
}
.input {
  margin-top: 20px;
}
.mavonEditor {
  margin-top: 20px;
  width: 100%;
  min-height: 550px;
}
</style>