<template>
    <div class="login-container">
        <van-nav-bar
            class="app-nav-bar"
            title="注册/登录"
            left-arrow
            @click-left="$router.back()"
            />
        <van-form 
            :show-error="false"
            :show-error-message="false"
            validate-first
            ref="login-form"
            @submit="onLogin"
            @failed="onFailed"
        >
        <!-- 👆监听表单验证失败 -->
            <van-field
                v-model="user.mobile"
                label="手机号"
                icon-prefix="icon"
                left-icon="shouji"
                placeholder="请输入手机号"
                center
                :rules="formRules.mobile"
                name="mobile"
            />
            <van-field
                v-model="user.code"
                clearable
                label="验证码"
                icon-prefix="icon"
                left-icon="yanzhengma"
                placeholder="请输入验证码"
                center
                :rules="formRules.code"
                name="code"
            >
                <template #button >
                    <van-count-down :time="60000"
                    format="ss s" v-if="isCountDownShow"
                    @finish="isCountDownShow = false"/>
                    <van-button size="mini"
                        v-else
                        round class="send-btn"
                        :loading="isLoading"
                        @click.prevent="onSendCode"
                        >发送验证码
                    </van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" type="info" block>登录</van-button>
            </div>
        </van-form>
        
    </div>
</template>
<script>
    import { login,getCode } from '@/api/user'
    import { Toast } from 'vant'
export default {
    name: 'Login',
    data() {
        return {
            user: {
                mobile: '13911111111',
                code : '246810'
            },
            formRules: {
                mobile: [
                    { required: true, message: '请输入手机号' },
                    { pattern: /^1[3-9]\d{9}$/,message: '手机号格式错误'}
                ],
                code: [
                    { required: true, message: '请输入验证码' },
                    { pattern: /^\d{6}$/,message: '验证码格式错误'}
                ]
            },
            isCountDownShow: false,//控制倒计时显示
            isLoading:false
        }
    },
    methods: {
        async onLogin() {
            Toast.loading({
                message: '登录中...',
                forbidClick: true,//禁止点击背景
                duration: 0 //展示时长，为0一直展示
            })
            try{
                const res = await login(this.user)
                Toast.success('登录成功')
            }catch(err){
                console.log(err)
                Toast.fail('登录失败，手机号或验证码错误')
            }
        },
        onFailed(err) {//监听form表单验证
            if(err.errors[0]) {//如果有错误
                Toast({
                    message: err.errors[0].message,
                    position: 'top'
                })//报错提示
            }
        },
        async onSendCode() {
            //验证手机号
            try {//验证表单成功
                await this.$refs["login-form"].validate('mobile')
                //发送获得验证码的请求
                this.isLoading = true//开启loading
                await getCode(this.user.mobile)
                //倒计时结束，通过finish事件监听来隐藏
                //请求发送成功，显示倒计时
                this.isCountDownShow = true
            } catch(err) {//验证失败1.手机号格式不正确 2.频繁获取验证码
                //如果频繁获取-------1分钟后倒计时结束了，没必要判断
                // if(err && err.response && err.response.status === 429) {
                    //     Toast({
                        //         message: '请不要频繁获取验证码',position: 'top'
                //     })
                // }else if(err.name === 'mobile') {//否则手机号格式不正确时
                //     Toast(//将失败信息弹出
                //         {message:err.message,position: 'top'}
                //     )
                // }
                Toast(//将失败信息弹出
                         {message:err.message,position: 'top'}
                     )
            }
                this.isLoading = false//不管成功还是失败都关闭loading
        },

    }
}
</script>
<style lang="less" scoped>
    .send-btn {
        width: 76px;
        height: 23px;
        background-color: #ededed;
        .van-button__text {
            font-size: 10px;
            color: #666;
        }
    }
    .login-btn-wrap {
        padding: 26px 16px;
        .login-btn {
            background-color: #6db4fb;
            border:0;
            .van-button__text {
                font-size: 15px;
            }
        }
    }
</style>