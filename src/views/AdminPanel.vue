<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const currentTab = ref('users');
// const users = ref([]);
// const forums = ref([]);
// const posts = ref([]);

const isEditingUser = ref(false);
const isAddingForum = ref(false);
const isEditingForum = ref(false);
const currentUser = reactive({});
const newForum = reactive({ name: '', description: '' });
const currentForum = reactive({});

const users = ref([
  { userId: 1, username: 'user1', password: '********' },
  { userId: 2, username: 'user2', password: '********' }
]);

const forums = ref([
  { forumId: 1, name: '技术讨论', description: '讨论各种技术话题' },
  { forumId: 2, name: '生活杂谈', description: '分享日常生活中有趣的事情' }
]);

const posts = ref([
  { postId: 101, title: '如何提高编程技能', createdAt: '2023-01-01T12:00:00Z' },
  { postId: 102, title: '关于最新科技趋势', createdAt: '2023-01-02T12:00:00Z' }
]);

const fetchUsers = async () => {
  try {
    const response = await axios.get('/api/admin/users');
    if (response.data.success) {
      users.value = response.data.users;
    } else {
      throw new Error('Failed to fetch users');
    }
  } catch (error) {
    ElMessage.error(error.message || 'Failed to fetch users');
  }
};

const fetchForums = async () => {
  try {
    const response = await axios.get('/api/admin/forums');
    if (response.data.success) {
      forums.value = response.data.forums;
    } else {
      throw new Error('Failed to fetch forums');
    }
  } catch (error) {
    ElMessage.error(error.message || 'Failed to fetch forums');
  }
};

const fetchPosts = async () => {
  try {
    const response = await axios.get('/api/admin/posts');
    if (response.data.success) {
      posts.value = response.data.posts;
    } else {
      throw new Error('Failed to fetch posts');
    }
  } catch (error) {
    ElMessage.error(error.message || 'Failed to fetch posts');
  }
};

const deleteUser = async (userId) => {
//   try {
//     const response = await axios.delete(`/api/admin/users/${userId}`);
//     if (response.data.success) {
//       ElMessage.success(response.data.message);
//       users.value = users.value.filter(user => user.userId !== userId);
//     } else {
//       throw new Error(response.data.error);
//     }
//   } catch (error) {
//     ElMessage.error(error.message || 'Failed to delete user');
    //   }
    users.value = users.value.filter(user => user.userId !== userId);
 ElMessage.success(`删除用户 ID: ${userId}`);
};

const deleteForum = async (forumId) => {
//   try {
//     const response = await axios.delete(`/api/admin/forums/${forumId}`);
//     if (response.data.success) {
//       ElMessage.success(response.data.message);
//       forums.value = forums.value.filter(forum => forum.forumId !== forumId);
//     } else {
//       throw new Error(response.data.error);
//     }
//   } catch (error) {
//     ElMessage.error(error.message || 'Failed to delete forum');
    //   }
forums.value = forums.value.filter(forum => forum.forumId !== forumId);
  ElMessage.success(`板块 ID: ${forumId} 已删除`);
};

const deletePost = async (postId) => {
//   try {
//     const response = await axios.delete(`/api/admin/posts/${postId}`);
//     if (response.data.success) {
//       ElMessage.success(response.data.message);
//       posts.value = posts.value.filter(post => post.postId !== postId);
//     } else {
//       throw new Error(response.data.error);
//     }
//   } catch (error) {
//     ElMessage.error(error.message || 'Failed to delete post');
    //   }
posts.value = posts.value.filter(post => post.postId !== postId);
  ElMessage.success(`帖子 ID: ${postId} 已删除`);
};

const updateUser = async () => {
//   try {
//     const response = await axios.put(`/api/admin/users/${currentUser.userId}`, {
//       username: currentUser.username,
//       password: currentUser.password
//     });
//     if (response.data.success) {
//       ElMessage.success(response.data.message);
//       isEditingUser.value = false;
//     } else {
//       throw new Error(response.data.message);
//     }
//   } catch (error) {
//     ElMessage.error(error.message || '更新用户信息失败');
    //   }
ElMessage.success('用户信息已更新');
  isEditingUser.value = false;
};

const addForum = async () => {
//   try {
//     const response = await axios.post('/api/admin/forums', {
//       name: newForum.name,
//       description: newForum.description
//     });
//     if (response.data.success) {
//       forums.value.push({ ...newForum, forumId: response.data.forumId });
//       newForum.name = '';
//       newForum.description = '';
//       isAddingForum.value = false;
//       ElMessage.success('板块已添加');
//     } else {
//       throw new Error(response.data.error);
//     }
//   } catch (error) {
//     ElMessage.error(error.message || '添加板块失败');
    //   }
forums.value.push({ ...newForum, forumId: forums.value.length + 1 });
  newForum.name = '';
  newForum.description = '';
  isAddingForum.value = false;
  ElMessage.success('板块已添加');
};

const editForum = async () => {
//   try {
//     const response = await axios.put(`/api/admin/forums/${currentForum.forumId}`, {
//       name: currentForum.name,
//       description: currentForum.description
//     });
//     if (response.data.success) {
//       const index = forums.value.findIndex(f => f.forumId === currentForum.forumId);
//       if (index !== -1) {
//         forums.value[index] = { ...currentForum };
//         ElMessage.success('板块信息已更新');
//       }
//       isEditingForum.value = false;
//     } else {
//       throw new Error(response.data.error);
//     }
//   } catch (error) {
//     ElMessage.error(error.message || '编辑板块信息失败');
    //   }
const index = forums.value.findIndex(f => f.forumId === currentForum.forumId);
  if (index !== -1) {
    forums.value[index] = { ...currentForum };
    ElMessage.success('板块信息已更新');
  }
  isEditingForum.value = false;
};


const handleSelect = key => {
  currentTab.value = key;
};

onMounted(() => {
  fetchUsers();
  fetchForums();
  fetchPosts();
});
</script>


<template>
  <div class="admin-panel">
<header class="top-nav">
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="24">
          <el-button color="#626aef" plain type="primary" @click="$router.push('/')" style="width: 160px;">
            <el-icon><HomeFilled /></el-icon>
            主页
          </el-button>
        </el-col>
      </el-row>
    </header>
    <div class="left-menu">
      <el-menu @select="handleSelect" default-active="users" class="el-menu-vertical-demo">
        <el-menu-item index="users">用户管理</el-menu-item>
        <el-menu-item index="forums">板块管理</el-menu-item>
        <el-menu-item index="posts">帖子管理</el-menu-item>
      </el-menu>
    </div>
    <div class="main-content">
      <div v-if="currentTab === 'users'">
  <h2>用户管理</h2>
  <el-table :data="users">
    <el-table-column prop="username" label="用户名" width="300"></el-table-column>
    <el-table-column prop="password" label="密码" width="400"></el-table-column>
    <el-table-column label="操作" width="300">
      <template #default="{ row }">
        <el-button plain @click="isEditingUser = true; currentUser = row" color="#626aef">编辑</el-button>
        <el-button type="danger" @click="deleteUser(row.userId)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="isEditingUser" destroy-on-close title="编辑用户信息：" width="400px">
    <el-form :model="currentUser" label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="currentUser.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="currentUser.password" type="password" autocomplete="off" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isEditingUser = false">取消</el-button>
        <el-button type="primary" @click="updateUser(currentUser)">确认</el-button>
      </div>
    </template>
  </el-dialog>
</div>
<div v-if="currentTab === 'forums'">
  <h2>板块管理</h2>
  <el-button plain @click="isAddingForum = true" color="#626aef">新增板块</el-button>
  <el-dialog v-model="isAddingForum" destroy-on-close title="新增板块：" width="400px">
    <el-form :model="newForum" label-width="100px">
      <el-form-item label="板块名称">
        <el-input v-model="newForum.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="newForum.description" type="textarea" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isAddingForum = false">取消</el-button>
        <el-button type="primary" @click="addForum(newForum)">确认</el-button>
      </div>
    </template>
  </el-dialog>
  <el-table :data="forums">
    <el-table-column prop="name" label="板块名称" width="200"></el-table-column>
    <el-table-column prop="description" label="描述" width="500"></el-table-column>
    <el-table-column label="操作" width="300">
      <template #default="{ row }">
        <el-button plain @click="isEditingForum = true; currentForum = row" color="#626aef">重命名</el-button>
        <el-button type="danger" @click="deleteForum(row.forumId)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="isEditingForum" destroy-on-close title="编辑板块信息：" width="400px">
    <el-form :model="currentForum" label-width="100px">
      <el-form-item label="板块名称">
        <el-input v-model="currentForum.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="currentForum.description" type="textarea" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isEditingForum = false">取消</el-button>
        <el-button type="primary" @click="editForum(currentForum)">确认</el-button>
      </div>
    </template>
  </el-dialog>
</div>

      <div v-if="currentTab === 'posts'">
        <h2>帖子管理</h2>
        <el-table :data="posts" style="width: 100%">
          <el-table-column prop="title" label="帖子标题" width=400>
            <template #default="scope">
          <a :href="`/posts/${scope.row.postId}`" target="_blank">{{ scope.row.title }}</a>
        </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间" width=300>
            <template #default="scope">
          {{ new Date(scope.row.createdAt).toLocaleString() }}
        </template>
          </el-table-column>
          <el-table-column label="操作" width=200>
            <template #default="{ row }">
              <el-button type="danger" @click="deletePost(row.postId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.admin-panel {
  display: flex;
  flex-direction: row;
  padding-top: 60px; /* 高度与顶部导航栏保持一致 */
}

.left-menu {
  position: fixed;
  width: 200px;
  top: 60px;
  bottom: 0;
  overflow-y: auto;
  border-right: 1px solid #eee;
}

.main-content {
  margin-left: 220px; /* 左边菜单的宽度加上一些间隔 */
  padding: 20px;
}

.el-menu-vertical-demo {
  width: 100%;
  border-right: 1px solid #eee;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.el-table {

  max-width: 1000%; /* 表格宽度自适应 */
}

a {
  text-decoration: none;
  color: #8526c0;
}
a:hover {
  text-decoration: underline;
}

</style>
