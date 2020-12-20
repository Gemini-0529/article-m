<template>
    <van-cell
        class="article-item"
        :to="{
            name: 'article',
            params: {
                articleId:article.art_id
            }
        }">
        <div slot="title" class="title van-multi-ellipsis--13">{{article.title}}</div>
        <div slot="label">
            <!-- 三张封面图 -->
            <div class="cover-wrap" v-if="article.cover.type === 3">
                <div class="cover-wrap-item"
                    v-for="( img,index ) of article.cover.images"
                    :key="index">
                    <van-image
                        lazy-load
                        radius="4"
                        fit="cover"
                        :src="img"
                        class="cover-image"
                    />
                </div>
            </div>
            <div class="label-content">
                <span>{{ article.aut_name }}</span>
                <span>{{ article.comm_count }}评论</span>
                <span>{{ article.pubdate | relativeTime }}</span>
            </div>
        </div>
        <!-- 不写slot，默认就是default，在右侧显示 -->
        <!-- 单张封面图 -->
        <van-image
            class="cover"
            v-if="article.cover.type === 1"
            :src="article.cover.images[0]"
            lazy-load
            radius="4"
            fit="cover"
        />
    </van-cell>
</template>
<script>
export default {
    name: 'ArticleItem',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data() {
        return {

        }
    }
}
</script>
<style lang="less" scoped>
.article-item {
    .title {
        font-size: 16px;
        color: #333;
    }
    /deep/ .van-cell__value {
        flex: unset;
        width: 116px;
        height: 73px;
        margin-left: 12px;
    }
    .cover {
        width: 116px;
        height: 73px;
    }
    .cover-wrap {
        padding: 15px 0;
        display: flex;
        .cover-wrap-item {
            flex: 1;
            height: 73px;
            // &代表cover-img-item
            &:not(:last-child) {
                padding-right: 4px;
            }
            .cover-image {
                width: 100%;
                height: 73px;
            }
        }
    }
    .label-content {
        font-size: 11px;
        color:#b4b4b4;
        span {
            margin-right: 12px;
        }
    }
}
</style>