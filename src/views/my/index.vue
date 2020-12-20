<template>
    <div class="my-container">
        <van-cell-group class="user-info" v-if="user">
            <van-cell
                class="base-info"
                center
                :border="false">
                <van-image
                    slot="icon"
                    :src="userInfo.photo"
                    class="avatar"
                    fit="cover"
                    round/>
                <div
                    slot="title"
                    class="user-name">
                {{userInfo.name ? userInfo.name : 'Gemini'}}</div>
                <van-icon
                    name="setting-o"
                    size="20"
                    @click="$router.push('/user/userProfile')"
                />
            </van-cell>
            <van-grid :border="false" class="data-info">
                <van-grid-item text="头条" class="data-info-item">
                    <span slot="icon" class="item-count">{{userInfo.art_count? userInfo.art_count : '0'}}</span>
                </van-grid-item>
                <van-grid-item text="关注" class="data-info-item">
                    <span slot="icon" class="item-count">{{userInfo.follow_count? userInfo.follow_count : '0'}}</span>
                </van-grid-item>
                <van-grid-item text="粉丝" class="data-info-item">
                    <span slot="icon" class="item-count">{{userInfo.fans_count? userInfo.fans_count : '0'}}</span>
                </van-grid-item>
                <van-grid-item text="获赞" class="data-info-item">
                    <span slot="icon" class="item-count">{{userInfo.like_count? userInfo.like_count : '0'}}</span>
                </van-grid-item>
            </van-grid>
        </van-cell-group>
        <!-- 未登录状态显示的内容 -->
        <div
            class="unLogin"
            v-else
            @click="$router.push({
                name: 'login',
                query: {
                    redirect: '/my'
                }
            })"
        >
            <img src="@/assets/images/unlogin.png" alt="">
            <span>登录 / 注册</span>
        </div>
        <van-grid :column-num="2" icon-size="24px" class="nav-grid mb-4">
            <van-grid-item icon="star-o" text="收藏"  />
            <van-grid-item icon="clock-o" text="历史"  />
        </van-grid>
        <!-- is-link是右侧箭头 -->
        <van-cell title="消息通知" is-link to="" />
        <van-cell title="小支同学"
            is-link to="/user/chat"
            class="mb-4"
        />
        <van-button block class="login-btn" v-if="user" @click="onLogout">退出登录</van-button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
    name: 'My',
    data() {
        return {
            userInfo: {}
        }
    },
    created() {
        this.loadUserInfo()
    },
    methods: {
        onLogout() {
            this.$dialog.confirm({
                title: '退出',
                message: '确定退出吗？',
                })
                .then(() => {
                    this.$store.commit('setUser',null)//将store中的user赋值null
                })
                .catch(() => {})
        },
        async loadUserInfo() {
             const result = await getUserInfo()//发送获取用户信息的请求
             this.userInfo = result.data.data
        }
    },
    computed: {
        ...mapState(['user'])
    }
}
</script>
<style lang="less" scoped>
.my-container {
    .user-info {
        background: url(./images/userinfo-bg.png) no-repeat;
        background-size: cover;
        .base-info {
            //重置背景色
            background-color: unset;
            box-sizing: border-box;
            height: 115px;
            padding-top: 38px;
            padding-bottom: 11px;
            .avatar {
                width: 66px;
                height: 66px;
                box-sizing: border-box;
                border: 2px solid white;
                margin-right: 11px;
            }
            .user-name {
                font-size: 15px;
                color: #fff;
            }
            .van-cell__value {
                display:flex;
                justify-content:flex-end;
                .van-icon-setting-o {
                color: #fff;
                font-size: 22px !important;
                align-items: center;
            }
            }
            
        }
        .data-info {
            .data-info-item {
                height: 65px;
                font-size: 18px;
                color: #fff
            }
            //深度作用操作符，另一个写法是>>>
            /deep/ .van-grid-item__text {
                color: #fff;
            }
        }
        /deep/ .van-grid-item__content {
            background-color: unset;
        }
    }
    .unLogin {
        height: 180px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        background: url(./images/userinfo-bg.png) no-repeat;
        background-size: cover;
        img {
            width: 66px;
            height: 66px;
        }
        span {
            font-size: 14px;
        }
    }
    //收藏/历史
    /deep/ .nav-grid {
        .van-grid-item {
            height: 70px;
        }
        .van-icon-star-o {
            color: #eb5253;
        }
        .van-icon-clock-o {
            color: #ff9d1d;
        }
        .van-grid-item__text {
            color: #333;
        }
    }
    .mb-4 {
        margin-bottom: 4px;
    }
    .login-btn {
        color: #d86262;
    }
}
</style>