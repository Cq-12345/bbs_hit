<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';

const currentTab = ref('profile');  // 默认显示个人信息
// const router = useRouter();

const userStore = useUserStore();
// const userInfo = ref({});
// const userPosts = ref([]);
// const userReplies = ref([]);

const userInfo = ref({
  username: 'exampleUser',
  password: '********'
});

const isChangingPassword = ref(false);
const passwordDetails = ref({
  oldPassword: '',
  newPassword: ''
});

const userPosts = ref([
  { postId: 101, title: '如何学习Python', content: '想分享一些学习Python的经验...', createdAt: '2023-01-01T12:00:00Z' },
  { postId: 102, title: '关于最新科技趋势', content: '最新的科技发展非常快...', createdAt: '2023-02-01T12:00:00Z' }
]);

const userReplies = ref([
  { replyId: 201, postTitle: '如何学习Python', replyContent: '我也有相同的问题，希望能得到解答。', createdAt: '2023-03-01T12:00:00Z' },
  { replyId: 202, postTitle: '关于最新科技趋势', replyContent: '非常同意你的观点...', createdAt: '2023-04-01T12:00:00Z' }
]);

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const response = await axios.get('/api/user/profile');
    if (response.data.success) {
      userInfo.value = response.data.data;
    } else {
      throw new Error('获取用户信息失败');
    }
  } catch (error) {
    ElMessage.error(error.message || '获取用户信息失败');
  }
};

// 获取用户帖子列表
const fetchUserPosts = async () => {
  try {
    const response = await axios.get('/api/user/posts');
    if (response.data.success) {
      userPosts.value = response.data.posts;
    } else {
      throw new Error('获取用户帖子失败');
    }
  } catch (error) {
    ElMessage.error(error.message || '获取用户帖子失败');
  }
};

// 获取用户回帖列表
const fetchUserReplies = async () => {
  try {
    const response = await axios.get('/api/user/replies');
    if (response.data.success) {
      userReplies.value = response.data.replies;
    } else {
      throw new Error('获取用户回帖失败');
    }
  } catch (error) {
    ElMessage.error(error.message || '获取用户回帖失败');
  }
};

const updatePassword = async () => {
  try {
    const response = await axios.put('/api/user/update-password', {
      old_password: passwordDetails.value.oldPassword,
      new_password: passwordDetails.value.newPassword
    });
    if (response.data.success) {
      ElMessage.success('密码更新成功');
      isChangingPassword.value = false;
    } else {
      throw new Error(response.data.error || '密码更新失败');
    }
  } catch (error) {
    ElMessage.error(error.message || '密码更新失败');
  }
};

const deletePost = async (postId) => {
//   try {
//     const response = await axios.delete(`/api/posts/${postId}`);
//     if (response.data.success) {
//       ElMessage.success(response.data.message || '帖子已成功删除');
//       // 可以在这里添加逻辑来更新前端视图，例如从列表中移除已删除的帖子
//     } else {
//       ElMessage.error(response.data.error || '删除失败');
//     }
//   } catch (error) {
//     if (error.response) {
//       // 处理由后端返回的错误
//       switch (error.response.status) {
//         case 404:
//           ElMessage.error('找不到帖子，可能已被删除');
//           break;
//         case 403:
//           ElMessage.error('用户无权进行此操作');
//           break;
//         case 500:
//           ElMessage.error('服务器内部错误');
//           break;
//         default:
//         //   ElMessage.error('删除失败');
//       }
//     } else {
//       // 处理网络或其他错误
//       ElMessage.error('网络错误或服务器无响应');
//     }
// 假设我们有一个全局的帖子列表 `userPosts`
  const index = userPosts.value.findIndex(post => post.postId === postId);
  if (index !== -1) {
    userPosts.value.splice(index, 1); // 从数组中移除帖子
    ElMessage.success(`帖子 ${postId} 已被删除`);
  } else {
    ElMessage.error('帖子找不到，可能已被删除');
  }
};

onMounted(() => {
  fetchUserInfo();
  fetchUserPosts();
  fetchUserReplies();
});
</script>


<template>
  <div class="user-dashboard">
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
    <el-row gutter={24}>
        <div class="left-menu">
      <el-col :span="6" class="menu">
        <el-menu @select="tab => currentTab = tab" class="el-menu-vertical-demo" default-active="profile">
          <el-menu-item index="profile">个人信息</el-menu-item>
          <el-menu-item index="posts">我的帖子</el-menu-item>
          <el-menu-item index="replies">我的回复</el-menu-item>
        </el-menu>
      </el-col>
        </div>
        <div class="right-main">
      <el-col :span="18" class="main">
        <div v-if="currentTab === 'profile'">
          <h3><strong>{{ userInfo.username }}</strong>，欢迎你呀！</h3>
          <el-button type="primary" @click="fetchUserInfo" style="margin-left:12px;">刷新个人信息</el-button>
          <el-button plain @click="isChangingPassword = true">修改我的密码</el-button>

    <el-dialog v-model="isChangingPassword" destroy-on-close title="请输入原密码与新密码： ✍️" width="400px">
      <el-form :model="passwordDetails" label-width="100px">
        <el-form-item label="旧密码">
          <el-input v-model="passwordDetails.oldPassword" placeholder="请输入旧密码" type="password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="passwordDetails.newPassword" placeholder="请输入新密码" type="password" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isChangingPassword = false">取消</el-button>
          <el-button type="primary" @click="updatePassword">确认</el-button>
        </div>
      </template>
    </el-dialog>
<div itemprop="mainContentOfPage">
    <p><a name="civilized"></a></p>
<h2><a name="civilized-1" class="anchor" href="#civilized-1"></a><a href="#civilized">这是一个提倡文明讨论的地方</a></h2>
<p>在论坛上请表现得像在公园一样得体。我们一群人共享一个公共社区资源 — 一个通过不断讨论来分享我们的技能、知识和兴趣的地方。</p>
<p>这些不是死规矩或者草率决定。这些准则旨在帮助社区的人进行判断，并将社区打造成一个友善、友好的场所，推动文明公开讨论。</p>
<p><a name="improve"></a></p>
<h2><a name="improve-2" class="anchor" href="#improve-2"></a><a href="#improve">改善讨论</a></h2>
<p>帮助我们让这个地方变成一个讨论的好地方，始终在讨论中加入一些积极的内容，无论多小都可以。如果您不确定您的帖子是否有益于对话，那就认真想一想您要说什么再发布。</p>
<p>改善讨论的一种方法是发现已经发生过的事。在回复或开始您自己的话题前，请花一些时间浏览话题，这样您更有机会遇见和您有共同爱好的人。</p>
<p>这里讨论的话题对我们很重要，并且我们希望您也觉得这些内容对您很重要。尊重这些话题以及讨论它们的人，特别是当您不同意他们的观点时。</p>
<p><a name="agreeable"></a></p>
<h2><a name="agreeable-3" class="anchor" href="#agreeable-3"></a><a href="#agreeable">即使您不同意他人，也请尊重他人</a></h2>
<p>您可能想表达您有不同意见。这没问题。但是，记住_批评观点，而不是人_。请避免：</p>
<ul>
<li>指名道姓</li>
<li>人身攻击</li>
<li>回复帖子的语气而不是其实际内容</li>
<li>下意识的反驳</li>
</ul>
<p>相反，请提供有助于改善讨论的合理观点。</p>
<p><a name="participate"></a></p>
<h2><a name="participate-4" class="anchor" href="#participate-4"></a><a href="#participate">您的参与有意义</a></h2>
<p>我们在这里的讨论将为每个新成员树立榜样。通过选择参与有意义的讨论，帮助我们将论坛变成一个有意思的地方，并避免那些没有帮助的行为，为社区创造一个美好的未来。</p>
<p>Discourse 提供了让社区共同鉴别最棒（或最差）贡献的工具：书签、赞、举报、回复、编辑、关注、免打扰等。利用这些工具来改善您自己以及其他所有人的体验。</p>
<p>让我们创造一个更美好的社区。</p>
<p><a name="flag-problems"></a></p>
<h2><a name="flag-problems-5" class="anchor" href="#flag-problems-5"></a><a href="#flag-problems">如果您发现问题，请举报</a></h2>
<p>版主有特别的权力；他们对论坛负责。但您也是。有了您的帮助，版主可以成为社区引导者，而不仅仅是守卫或者警察。</p>
<p>当您看到不良行为时，不要回复。这种承认会变相鼓励这种不良行为，既消耗您的精力，又浪费每一个人的时间。<em>只需举报它</em>。如果收到足够多的举报，将会有相应的处理，这种处理可能会自动发生，也可能由版主介入。</p>
<p>为了维护我们的社区，版主保留随时以任何理由移除任何内容和任何用户帐户的权利。版主不会预先审核任何新帖子；版主和站点维护人员对社区发表的任何言论均不负责任。</p>
<p><a name="be-civil"></a></p>
<h2><a name="be-civil-6" class="anchor" href="#be-civil-6"></a><a href="#be-civil">永远保持文明</a></h2>
<p>粗鲁这样的行为会破坏健康的讨论：</p>
<ul>
<li>文明。不要发表任何理智的人会认为冒犯、过分或招致怨恨的言论。</li>
<li>拒绝色情。不要发表任何淫秽或性暗示的内容。</li>
<li>尊重彼此。不要骚扰或者让别人难过，冒充他人，或暴露他们的个人信息。</li>
<li>尊重我们的论坛。不要发表垃圾信息或以其他方式破坏论坛。</li>
</ul>
<p>这些条款不是法律条文，并且没有准确的定义 — 避免_出现_任何这些内容。如果您不确定，问问当自己的帖子出现在主流新闻网站的头条时，您会有什么感觉。</p>
<p>这是一个公共论坛，并且搜索引擎会将这些讨论编入索引。注意发表的语言、链接和图片，不要在其中包含您的家人和朋友。</p>
<p><a name="keep-tidy"></a></p>
<h2><a name="keep-tidy-7" class="anchor" href="#keep-tidy-7"></a><a href="#keep-tidy">保持整洁</a></h2>
<p>花一点时间让东西出现在正确的位置，这样我们可以将更多的时间花在讨论而非清理上。所以：</p>
<ul>
<li>不要在错误的类别发表新话题；请阅读类别定义。</li>
<li>不要在多个话题中回复同样的内容。</li>
<li>不要发布没有内容的回复。</li>
<li>不要在中途改变话题。</li>
<li>不要在您的帖子中签名 — 每一个帖子都附有您的个人资料信息。</li>
</ul>
<p>比起发表“+1”或者“同意”，请使用“赞”按钮。比起将现有话题带向一个截然不同的方向，使用“作为链接话题回复”。</p>
<p><a name="stealing"></a></p>
<h2><a name="stealing-8" class="anchor" href="#stealing-8"></a><a href="#stealing">只发表您自己的东西</a></h2>
<p>未经许可，您不能发表属于他人的任何数字资产。您不能发表会窃取他人知识产权（软件、视频、音频和图片）或违反任何其他法律的简介、链接或方法。</p>
<p><a name="power"></a></p>
<h2><a name="tos-9" class="anchor" href="#tos-9"></a><a href="#tos">服务条款</a></h2>
<p>是的，法律术语很无聊，但是我们必须保护自己，进而保护您和您的数据免受不友好的人带来的伤害。</p>
  </div>


        </div>
        <div v-if="currentTab === 'posts'">
    <h3>我的帖子</h3>
    <el-table :data="userPosts" stripe border>
      <el-table-column
        prop="title"
        label="帖子标题"
        sortable
        :render-header="renderHeader"
        width="380">
        <template #default="scope">
          <a :href="`/posts/${scope.row.postId}`" target="_blank">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="发贴时间"
        sortable
        width="280">
        <template #default="scope">
          {{ new Date(scope.row.createdAt).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120">
        <template #default="scope">
          <el-button type="danger" size="small" @click="deletePost(scope.row.postId)" style="margin-top: 0px;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
        <div v-if="currentTab === 'replies'">
    <h3>我的回复</h3>
    <el-table :data="userReplies" stripe border>
      <el-table-column
        prop="postTitle"
        label="对应帖子"
        sortable
        width="380">
        <template #default="scope">
          <a :href="`/posts/${scope.row.postId}`" target="_blank">{{ scope.row.postTitle }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="replyContent"
        label="我的回复"
        sortable
        width="450">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="回复时间"
        sortable
        width="280">
        <template #default="scope">
          {{ new Date(scope.row.createdAt).toLocaleString() }}
        </template>
      </el-table-column>
    </el-table>
  </div>
      </el-col>
        </div>
    </el-row>
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

.user-dashboard {
  display: flex;
  flex-direction: row; /* 确保子元素水平排列 */

  padding-top: 60px;
}

.left-menu {
  position: fixed; /* 固定位置 */
  flex: 1; /* 左侧菜单占据必要空间 */
  max-width: 250px; /* 最大宽度限制 */
  top: 60px; /* 与顶部导航的底部对齐 */
  bottom: 0; /* 伸展至页面底部 */
  overflow-y: auto; /* 如果内容超出，允许滚动 */
  border-right: 1px solid #eee; /* 右侧边框线 */
}

.menu {
    min-width: 200px;
  }

.right-main {
  flex: 8; /* 主内容区占据剩余空间 */
  margin-left: 220px; /* 左边距留足够空间给固定的左侧菜单 */
  padding-left: 30px; /* 左侧间距，从菜单到内容区 */
}

.user-dashboard .right-main .el-col-18 {
  max-width: none; /* 取消最大宽度限制 */
  flex: 1; /* 使用flex填充空间 */
}

.el-menu-vertical-demo {
  width: 100%; /* 使用父容器的最大宽度 */
  border-right: 1px solid #eee;
}

.post-item, .reply-item {

  justify-content: space-between;
  align-items: center;
}

h3 {
  color: #333;
  margin-bottom: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
  margin-top: 10px;
}

.anchor {
  color: #4A90E2; /* 设置锚点链接的颜色 */
  text-decoration: none; /* 去除下划线 */
}

.anchor:hover {
  text-decoration: underline; /* 鼠标悬停时添加下划线 */
}

a {
  text-decoration: none;
  color: #8526c0;
}
a:hover {
  text-decoration: underline;
}

</style>