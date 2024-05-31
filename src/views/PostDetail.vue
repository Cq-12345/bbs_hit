
<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
const route = useRoute();
const postId = route.params.postId;
// const post = ref({});
const newComment = ref('');

// Static data simulation
const post = ref({
  postId: 101,
  title: "如何提高编程技能",
  content: "这里是帖子详细内容...",
  author: "Alice",
  createdAt: "2023-01-01T12:00:00Z",
  likes: 10,
  liked: false,
  replies: [
    {
      replyId: 456,
      author: "Bob",
      content: "同求，希望有经验的人能给点建议。",
      createdAt: "2023-01-02T12:00:00Z",
      likes: 5,
      liked: false
    },
    {
      replyId: 457,
      author: "Carol",
      content: "分享一下我的经验...",
      createdAt: "2023-01-03T12:00:00Z",
      likes: 3,
      liked: false
    },
    {
      replyId: 458,
      author: "Dave",
      content: "以下资源可能对你有帮助...",
      createdAt: "2023-01-04T12:00:00Z",
      likes: 2,
      liked: false
    },
    {
      replyId: 459,
      author: "Eve",
      content: "我也是刚开始学习，谢谢分享。",
      createdAt: "2023-01-05T12:00:00Z",
      likes: 4,
      liked: false
    },
    {
      replyId: 460,
      author: "Frank",
      content: "这些书籍和在线课程很有用。",
      createdAt: "2024-01-06T12:00:00Z",
      likes: 6,
      liked: false
    }
  ]
});

// const postDetails = reactive({
//   postId: null,
//   title: '',
//   content: '',
//   author: '',
//   createdAt: '',
//   likes: 0,
//   replies: []
// });

function toggleLike(postId) {
  // Implement toggle like functionality
  const currentPost = post.value;
  currentPost.liked = !currentPost.liked;
  currentPost.likes += currentPost.liked ? 1 : -1;
}

function postComment() {
  // Implement post comment functionality
}

function toggleLikeComment(replyId) {
  // Implement toggle like for comment functionality
  const comment = post.value.replies.find(r => r.replyId === replyId);
  if (comment) {
    comment.liked = !comment.liked;
    comment.likes += comment.liked ? 1 : -1;
  }
}

function canDelete(comment) {
  // Implement check for delete permission
  return true; // Simplified for demo purposes
}

function deleteComment(replyId) {
  // Implement delete comment functionality
  post.value.replies = post.value.replies.filter(r => r.replyId !== replyId);
}
// onMounted(async () => {
//   await fetchPostDetail();
// });

// async function fetchPostDetail() {
//   try {
//     const response = await axios.get(`/api/posts/${postId}/details`);
//     post.value = response.data.post;
//   } catch (error) {
//     console.error('Error fetching post details:', error);
//   }
// }

// function toggleLike(postId) {
//   // Implement toggle like functionality
// }

// function postComment() {
//   // Implement post comment functionality
// }

// function toggleLikeComment(replyId) {
//   // Implement toggle like for comment functionality
// }

// function canDelete(comment) {
//   // Implement check for delete permission
// }

// function deleteComment(replyId) {
//   // Implement delete comment functionality
// }
</script>

<template>
  <div class="post-detail-page">
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
    <div class="main-content">
      <el-card class="post-card">
        <div class="card-content">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
          <p class="post-meta">{{ post.author }} - {{ new Date(post.createdAt).toLocaleString() }}</p>
          <el-button 
          :color="post.liked ? '#626aef' : '#626aef'"
          :plain="!post.liked"
          type="primary" 
          @click="toggleLike(post.postId)">
          {{ post.liked ? '💕取消点赞' : '❤点赞' }} ({{ post.likes }})
        </el-button>
        </div>
      </el-card>
      <div class="comments">
        <el-input type="textarea" v-model="newComment" placeholder="写下你的评论..."></el-input>
        <el-button type="primary" plain color="#626aef" @click="postComment" style="margin: 5px;">发表评论</el-button>
        <div v-for="comment in post.replies" :key="comment.replyId" class="comment">
          <div class="comment-header">
            <div class="comment-meta">
              <strong>{{ comment.author }}</strong> - <span class="comment-date">{{ new Date(comment.createdAt).toLocaleString() }}</span>
            </div>
            <div class="comment-actions">
            <el-button 
              :color="comment.liked ? '#626aef' : '#626aef'"
              :plain="!comment.liked"
              type="primary" 
              @click="toggleLikeComment(comment.replyId)">
              {{ comment.liked ? '💕取消点赞' : '❤点赞' }} ({{ comment.likes }})
            </el-button>
            <el-button type="danger" v-if="canDelete(comment)" @click="deleteComment(comment.replyId)">删除</el-button>
            </div>
          </div>
          <p>{{ comment.content }}</p>  
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-detail-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
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

.main-content {
  width: 80%;
  max-width: 800px;
  margin: 60px auto 0;
}

.post-card {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #eee;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.card-content h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.card-content p {
  font-size: 16px;
  line-height: 1.5;
  color: #666;
}

.post-meta {
  font-size: 14px;
  color: #999;
  margin-top: 5px;
  margin-bottom: 10px;
}

.comments {
  width: 100%;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.comment {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.comment:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  align-items: center;
}

.avatar {
  width: 48px;
  height: 48px;
  margin-right: 10px;
  border-radius: 50%;
}

.comment-meta {
  flex-grow: 1;
}

.comment-actions {
  margin-top: 10px;
}
</style>
