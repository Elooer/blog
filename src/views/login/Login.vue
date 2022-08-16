<template>
  <div class="login_bg animate__animated animate__fadeIn">
    <Header ref="head" />
    <div class="login_container animate__animated animate__flipInX">
      <el-tabs type="card" style="border-radius: 10px">
        <el-tab-pane label="登录">
          <div class="title">登录</div>
          <el-form ref="loginFormRef" :model="loginForm" class="login_form" :rules="rules">
            <div class="label">用户名</div>
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" :prefix-icon="User" />
            </el-form-item>
            <div class="label">密码</div>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" show-password :prefix-icon="Lock" />
            </el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <div class="title">注册</div>
          <el-form ref="registerFormRef" :model="registerForm" class="login_form" :rules="rules">
            <div class="label">用户名</div>
            <el-form-item prop="username">
              <el-input v-model="registerForm.username" :prefix-icon="User" />
            </el-form-item>
            <div class="label">密码</div>
            <el-form-item prop="password">
              <el-input v-model="registerForm.password" show-password :prefix-icon="Lock" />
            </el-form-item>
            <el-form-item prop="rePassword">
              <div class="label">确认密码</div>
              <el-input v-model="registerForm.rePassword" show-password :prefix-icon="Lock" />
            </el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance, FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { loginApi, registerApi } from '../../request/api'

const validatePass2 = (rule: any, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
    // password 是表单上绑定的字段
  } else if (value !== registerForm.value.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const state = reactive<{ loginForm: LoginFormItf, registerForm: RegisterFormItf, rules: FormRules }>({
  loginForm: {
    username: '',
    password: '',
  },
  registerForm: {
    username: '',
    password: '',
    rePassword: '',
  },
  rules: {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 2, max: 8, message: '用户名长度必须在2-8个字符', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9]{6,12}$/, message: '密码由6-12位数字或字母组成', trigger: 'blur' },
    ],
    rePassword: [
      { validator: validatePass2, trigger: 'blur' },
    ],
  }
})

// 登录
const login = () => {
  loginFormRef.value?.validate(valid => {
    if (!valid) return
    loginApi({
      username: loginForm.value.username,
      password: loginForm.value.password
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        let token = res.data?.token
        localStorage.setItem('blog_token', token || '')
        ctx?.appContext.config.globalProperties.$message.success(res.message)

        setTimeout(() => {
          router.push('/home')
        }, 1000)
      } else {
        ctx?.appContext.config.globalProperties.$message.error('登录失败！')
      }
    })
  })
}

// 注册
const register = () => {
  registerFormRef.value?.validate(valid => {
    if (!valid) return
    registerApi({
      username: registerForm.value.username,
      password: registerForm.value.password,
      rePassword: registerForm.value.rePassword
    }).then(res => {
      if (res.status === 200) {
        ctx?.appContext.config.globalProperties.$message.success(res.message)
        registerFormRef.value?.resetFields()
      } else {
        ctx?.appContext.config.globalProperties.$message.error('注册失败，请稍后再试！')
      }
    })
  })
}


let { loginForm, registerForm, rules } = toRefs(state)
let router = useRouter()
const ctx = getCurrentInstance()
const loginFormRef = ref<FormInstance>()
const registerFormRef = ref<FormInstance>()

</script>
<style lang="less" scoped>
.login_bg {
  height: 100vh;
  background: url("../../assets/login_bg.png") no-repeat center center;
  // background-size: contain;
}

.login_container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 330px;
  height: 450px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);

  &:hover {
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.5);
  }

  :deep(.el-tabs__nav-wrap) {
    border-radius: 10px !important;
  }

  .title {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    font-family: 'YouYuan';
    color: #3b82f6;
  }

  .login_form {
    padding: 0 20px;

    .label {
      margin-bottom: 5px;
      color: #666;
    }

    .el-button {
      float: right;
      width: 80px;
      height: 38px;
      border-radius: 15px;
      background-color: #3b82f6;
      font-size: 15px;
    }
  }
}
</style>
