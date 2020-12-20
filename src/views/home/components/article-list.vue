<template>
    <div class="article-list" ref="article-list">
        <van-pull-refresh v-model="isRefresh"
            success-text="刷新成功"
            :success-duration = "1000"
            @refresh="onRefresh">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                <!-- 文章列表每项数据 -->
                <article-item
                    v-for="(article,index) in articles"
                    :key="index"
                    :article="article"
                />
                <!-- ↑把文章列表传给子组件 -->
                <!-- 单元格 -->
                <!-- <van-cell v-for="(article,index) in articles" :key="index">
                </van-cell> -->
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/'
import { debounce } from 'lodash'
export default {
    name: 'ArticleList',
    props: {
        channel: {
            type: Object,//父组件向子组件传递数据的类型
            required: true//必需传
        }
    },
    components: {
        ArticleItem
    },
    data() {
        return {
            articles: [],
            loading: false,//控制加载中的loading状态
            finished: false,//加载结束，不再触发加载更多
            timestamp: null, //获取下一页数据的时间戳
            isRefresh: false, //控制刷新
            scrollTop: 0//屏幕滚动的位置
        }
    },
    methods: {
        async onLoad() {
            //获取请求数据
            const { data } = await getArticles({
                channel_id: this.channel.id,//频道ID
                //时间戳，请求最新数据使用当前最新时间戳
                //下一页数据使用上一次返回地数据中的时间戳
                timestamp: this.timestamp || Date.now(),
                with_top: 1//是否包含置顶项，1包含，0不包含
            })
            //数据放入articles数组中
            const { results } = data.data
            this.articles.push(...results)//扩展运算符，否则会把一个数组放进去
            //设置本次加载状态结束，判断是否需要加载下一次，否则会一直转圈
            this.loading = false
            //数据加载完成
            if(results.length) {
                //更新获取下一页数据的页码
                this.timestamp = data.data.pre_timestamp
            }else {
                this.finished = true
            }
        },
        async onRefresh() {
            //下拉刷新，展示loading状态
            //请求数据
            const { data } = await getArticles({
                channel_id: this.channel.id,
                timestamp: Date.now(),
                with_top: 1
            })
            //把数据放到数据列表开头
            this.articles.unshift(...data.data.results)
            //关闭刷新
            this.isRefresh = false
        }
    },
    mounted() {
        //优化记录查看文章列表位置
        const list = this.$refs['article-list']
        debounce(()=> {//利用防抖，以免频繁记录位置，频繁赋值
          this.scrollTop = list.scrollTop
        },50)
    },
    //组件缓存后，离开后再次进入时，触发
    activated() {
        //把记录的距离重新赋值
        this.$refs['article-list'].scrollTop = this.scrollTop
    },
    //组件缓存后，离开失去活动
    // deactivated() {

    // }
}
</script>
<style lang="less" scoped>
.article-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
}
</style>