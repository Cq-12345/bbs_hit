<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const router = useRouter();
const username = ref('');
const password = ref('');

const handleLogin = async () => {
  const data = {
    username: username.value,
    password: password.value
  };

  try {
    const response = await axios.post('/api/login', data);
    if (response.data.success) {
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('userId', response.data.userId);
      router.push('/');
      ElMessage.success('登录成功');
    } else {
      ElMessage.error(response.data.error || '登录失败');
    }
  } catch (error) {
    console.error('Login error:', error);
    ElMessage.error('21世纪还没网真是弱爆了。请重试');
  }
};
</script>

<template>
  <div class="login-container">
    <el-card class="box-card">
      <div class="title">
        <h2>欢迎回来 😊</h2>
        <p>登录您的账户</p>
      </div>
      <el-form @submit.prevent="handleLogin" class="login-form">
        <el-form-item>
          <el-input v-model="username" placeholder="用户名" autocomplete="username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" placeholder="密码" type="password" autocomplete="current-password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button color="#626aef" plain type="primary" native-type="submit" class="login-button">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="register-link">
        没有账户？ <router-link to="/register">创建您的账户</router-link>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f3f5;
}

.box-card {
  width: 480px; /* Adjusted for a 4:3 aspect ratio */
  height: 360px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title h2, .title p {
  text-align: center;
}

.login-form {
  width: 100%;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input {
  height: 40px; /* Larger input fields */
}

.login-button {
  width: 100%; /* Button width to full */
  height: 40px; /* Flatter button */
  line-height: 40px;
}
</style>
