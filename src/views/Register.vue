<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const router = useRouter();
const registrationForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 15, message: '用户名长度应为 3-15 个字符', trigger: 'blur' },
    { pattern: /^\S*$/, message: '用户名不应包含空格', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不得少于 6 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: (rule, value, callback) => {
      if (value !== registrationForm.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    }, trigger: 'blur' }
  ]
};

const handleRegister = async () => {
  const { username, password } = registrationForm;
  try {
    const response = await axios.post('/api/register', { username, password });
    if (response.data.success) {
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('userId', response.data.userId);
      router.push('/');
      ElMessage.success('注册成功并已自动登录');
    } else {
      ElMessage.error(response.data.error || '注册失败');
    }
  } catch (error) {
    console.error('Registration error:', error);
    ElMessage.error('网络错误或服务器问题');
  }
};
</script>

<template>
  <div class="register-container">
    <el-card class="box-card">
      <div class="title">
        <h2>欢迎！ 👋</h2>
        <p>让我们创建您的账户</p>
      </div>
      <el-form :model="registrationForm" :rules="rules" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registrationForm.username" placeholder="用户名"></el-input>
          <p class="hint">独一无二，无空格，简短。要求为 3-15 个字符。</p>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registrationForm.password" placeholder="密码" type="text"></el-input>
          <p class="hint">至少 6 个字符。</p>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="registrationForm.confirmPassword" placeholder="确认密码" type="text"></el-input>
          <p class="hint">确保输入一致。</p>
        </el-form-item>
        <el-form-item>
          <el-button color="#626aef" plain type="primary" @click="handleRegister" class="register-button">创建您的账户并登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f3f5;
}

.box-card {
  width: 400px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title h2, .title p {
  text-align: center;
  margin-bottom: 20px; /* 提供足够的空间给标题和说明文字 */
}

.el-form-item {
  margin-bottom: 20px; /* 保持一致的间距 */
}

.el-input {
  height: 40px; /* 保证输入框的高度一致 */
}

.hint {
  font-size: 14px; /* 提示文字的字号 */
  color: #888; /* 提示文字的颜色 */
  margin-top: -5px; /* 将提示文字向上移动接近输入框 */
  margin-bottom: 0px; /* 为下一个表单项留出空间 */
}

.register-button {
  width: 100%; /* 使按钮宽度与表单一致 */
  height: 40px; /* 使按钮高度适中 */
  line-height: 40px; /* 确保文字垂直居中 */
}
</style>