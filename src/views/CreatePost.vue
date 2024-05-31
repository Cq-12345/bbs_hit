<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage, ElSelect, ElOption, ElInput, ElButton, ElForm, ElFormItem } from 'element-plus';

const router = useRouter();
const postData = ref({
  forumId: null,
  title: '',
  content: ''
});

const forums = ref([
  { id: 1, name: '技术讨论' },
  { id: 2, name: '生活杂谈' }
]);

const createPost = async () => {
  if (!postData.value.forumId || !postData.value.title.trim() || !postData.value.content.trim()) {
    ElMessage.error('所有字段都是必填的');
    return;
  }

  try {
    const response = await axios.post('/api/posts/create', {
      forumId: postData.value.forumId,
      title: postData.value.title,
      content: postData.value.content
    });

    if (response.data.success) {
      ElMessage.success('帖子创建成功');
      router.push(`/post/${response.data.postId}`); // 假设后端返回新创建的帖子ID
    } else {
      ElMessage.error(response.data.error || '帖子创建失败');
    }
  } catch (error) {
    console.error('Error creating post:', error);
    ElMessage.error('网络错误或服务器问题');
  }
};
</script>

<template>
  <div class="create-post-page">
    <header class="top-nav">
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="24">
          <el-button color="#626aef" plain type="primary" @click="$router.push('/')">
            <el-icon><HomeFilled /></el-icon>
            主页
          </el-button>
        </el-col>
      </el-row>
    </header>
    <el-card class="box-card">
      <h2>发表新帖子</h2>
      <el-form label-position="top">
        <el-form-item label="选择分区">
          <el-select v-model="postData.forumId" placeholder="请选择分区">
            <el-option v-for="forum in forums" :key="forum.id" :label="forum.name" :value="forum.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="帖子标题">
          <el-input v-model="postData.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="帖子内容">
          <el-input type="textarea" v-model="postData.content" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item>
          <el-button color="#626aef" plain type="primary" @click="createPost" style="width: 100%;" >发布帖子</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.create-post-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100vh;
}

.top-nav {
  width: 100%;
  padding: 10px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff;
}

.box-card {
  width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.el-form-item {
  margin-bottom: 20px;

}

</style>
