<template>
    <div class="home-container">
        <van-nav-bar class="app-nav-bar">
            <van-button slot="title" icon="search"
            type="info" round size="small"
            class="search-btn">搜索</van-button>
        </van-nav-bar>
        <van-tabs v-model="active" class="channel-tabs">
            <van-tab v-for="channel in channels" :title="channel.name"
            :key="channel.id">
            <!-- 文章列表接收数据的属性↓  ↓遍历的列表项-->
                <article-list :channel="channel"/>
            </van-tab>
            <!-- 解决最后一个频道被汉堡包图标挡住，在频道后面加占位符，顶一格 -->
            <div slot="nav-right" class="channel-placeholder"></div>
            <div
                slot="nav-right"
                @click="isChannelEidtShow = true"
                class="nav-right-wrap">
                <van-icon name="wap-nav" />
            </div>
        </van-tabs>
        <!-- 弹出层 -->
        <van-popup
            v-model="isChannelEidtShow"
            position="bottom"
            class="chennel-edit-popup"
            closeable
            close-icon-position="top-left"
            round
            get-container="body"
        >
            <channel-edit
                :user-channels="channels"
                :active="active"
                @close = "isChannelEidtShow = false"
                @update-active = "active = $event"
            />
            <!-- $event就是监听的事件参数(index) -->
            <!-- 功能等同于methods中的onUpdateActive -->
        </van-popup>
    </div>
</template>
<script>
import { getChannels } from '@/api/user'
import ArticleList from './components/article-list'
import channelEdit from './components/channel-edit'
export default {
    name: 'Home',
    components: {
        ArticleList,
        channelEdit
    },
    data() {
        return {
            search: '',
            active: 0,//控制被激活的标签项
            channels: [],
            isChannelEidtShow: true
        }
    },
    created() {
        this.loadChannels()
    },
    methods: {
        async loadChannels() {
            const channels = await getChannels()
            this.channels = channels.data.data.channels
        },
        // onUpdateActive(index) {
        //     //把弹出框点击的频道index传递给父组件，修改active值
        //     this.active = index
        // }
    }
}
</script>
<style lang="less" scoped>
    .home-container {
        /deep/ .van-nav-bar__title {
            max-width: unset;
        }
        .search-btn {
            width: 277px;
            height: 32px;
            background-color: #5babfb;
            border: none;
            .van-icon {
                font-size: 16px;
            }
            .van-button__text {
                font-size: 14px;
            }
        }
        .channel-tabs {
            /deep/ .van-tabs__line {
                width: 15px !important;
                height: 3px;
                background-color: #3296fa;
                bottom: 20px;
            }
            .channel-placeholder {
                width: 33px;
                flex-shrink: 0;//不参与平分，占位
            }
        }
        .nav-right-wrap {
            position: fixed;
            right: 0;
            width: 33px;
            height: 44px;
            background-color: #fff;
            opacity: .9;
            display: flex;
            justify-content: center;
            align-items: center;
            .van-icon {
                font-size: 24px;
                padding-left: 4px;
            }
        }
    }
    .chennel-edit-popup {
        height: 70%;
    }
</style>