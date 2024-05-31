<script setup>
import { ref, onMounted } from 'vue';
import { ElIcon } from 'element-plus';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const forums = ref([]);
const posts = ref([]);
const sortBy = ref('newest');  // 默认为“最新”

// onMounted(async () => {
//   await fetchForums();
//   await fetchPosts(forums.value[0]?.forumId);
// });
onMounted(() => {
  fetchForums();
  fetchPosts(1); // Assuming '1' is the ID of the first forum
});
// async function fetchForums() {
//   try {
//     const response = await axios.get('/api/forums');
//     forums.value = response.data.forums;
//   } catch (error) {
//     console.error('Error fetching forums:', error);
//   }
// }

function fetchForums() {
  // Simulate fetching forums
  forums.value = [
    { forumId: 1, name: "技术讨论", description: "讨论各种技术话题" },
    { forumId: 2, name: "生活杂谈", description: "分享日常生活中有趣的事情" }
  ];
}
// async function fetchPosts(forumId) {
//   try {
//     const response = await axios.get(`/api/posts?forumId=${forumId}`);
//     posts.value = response.data.posts;
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//   }
// }

function fetchPosts(forumId) {
  // Simulate fetching posts based on the forumId
  posts.value = [
    { postId: 101, title: "如何学习Python", content: "最近开始学习Python，有哪些好的建议？", author: "Alice", createdAt: "2021-01-01T12:00:00Z" },
    { postId: 102, title: "最新科技新闻汇总", content: "今天有哪些值得关注的科技新闻？", author: "Bob", createdAt: "2021-01-02T12:00:00Z" }
  ];
}

function gotoPost(postId) {
  router.push(`/posts/${postId}`);
}

function createPost() {
  router.push('/create-post');
}

function refresh() {
  fetchPosts(forums.value[0]?.forumId);
}
</script>

<template>
  <div class="home-page">
    <header class="top-nav">
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="6">
          <el-button color="#626aef" plain type="primary" @click="$router.push('/')" style="width: 220px;">
            <el-icon><HomeFilled /></el-icon>
            <span>主页</span>
          </el-button>
        </el-col>
        <el-col :span="17" style="text-align:right;">
          <el-button color="#626aef" type="primary" @click="$router.push('/login')">登录</el-button>
          <el-button color="#626aef" type="primary" @click="$router.push('/register')">注册</el-button>
        </el-col>
      </el-row>
    </header>
    <aside class="sidebar">
      <el-menu default-active="1" class="el-menu-vertical-demo" style="margin-top:60px;">
        <el-menu-item v-for="forum in forums" :key="forum.forumId" @click="fetchPosts(forum.forumId)">
          {{ forum.name }}
        </el-menu-item>
      </el-menu>
      <div class="sidebar-actions">
        <el-button color="#626aef" plain type="primary" @click="refresh" style="width: 100px;">
            <el-icon><Refresh /></el-icon>
            <span>刷新</span>
          </el-button>
        <el-button color="#626aef" plain type="primary" @click="createPost" style="width: 100px;">
            <el-icon><CirclePlus /></el-icon>
            <span>发帖</span>
          </el-button>
     </div>
    </aside>
    <div class="main-content">
      <el-select v-model="sortBy" placeholder="排序方式" class="sort-select">
        <el-option label="最新" value="newest"></el-option>
        <el-option label="热门" value="hottest"></el-option>
      </el-select>
      <div class="posts">
        <el-card class="post-card" v-for="post in posts" :key="post.postId" @click="gotoPost(post.postId)">
          <div class="card-content">
            <h3>{{ post.title }}</h3>
            <p>{{ post.content }}</p>
            <p class="post-meta">{{ post.author }} - {{ new Date(post.createdAt).toLocaleDateString() }}</p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>


<style scoped>
.home-page {
  display: flex; /* 使用flex布局确保子元素排列 */
  height: 100vh; /* 全屏高度 */
}

.top-nav {
  width: 100%; /* 顶部导航栏宽度全屏 */
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  position: fixed; /* 固定位置 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* 确保它在顶层 */
}

.sidebar {
  width: 250px; /* 侧边栏宽度 */
  background: #f4f4f4;
  overflow-y: auto; /* 如果内容过多，允许滚动 */
  height: calc(100vh - 60px); /* 减去顶部导航栏高度 */
  position: fixed; /* 固定位置 */
  top: 0px; /* 顶部导航栏的高度 */
  left: 0;
}

.sidebar-actions {
  padding: 10px;
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 0;
}

.main-content {
  flex-grow: 1; /* 占据剩余空间 */
  margin-left: 250px; /* 等于侧边栏的宽度 */
  margin-top: 60px; /* 顶部导航栏高度 */
  padding: 20px;
  overflow-y: auto; /* 允许滚动 */
  background: #fafafa;
}

.post-card {
  margin-bottom: 20px;
  border: 1px solid #eee;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.card-content h3 {
  margin-top: 0;
  font-size: 18px;
  color: #333;
}

.card-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.post-meta {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.card-actions {
  text-align: right;
  padding: 10px;
}

.action-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
}

.action-buttons .item {
  margin-bottom: 10px;
}

.el-menu-item:hover {
  background-color: #e1e1e1;
}

.sort-select {
  margin-bottom: 10px;
}
</style>
