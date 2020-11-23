<template>
    <div class="channel-edit">
        <van-cell center :border="false">
            <div slot="title" class="channel-title">我的频道</div>
            <van-button
                type="danger"
                plain
                round
                size="mini"
                @click="isEdit = !isEdit"
            >
                {{isEdit? '完成': '编辑'}}
            </van-button>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item
                v-for="(item,index) of userChannels"
                :key="index"
                :text="item.name"
                class="grid-item"
                :class="{active:index === active}"
                :icon="(isEdit && index !==0) ? 'close' : ''"
                @click="onUserChannelClick(item,index)"
            />
        </van-grid>
        <van-cell center :border="false">
            <div slot="title" class="channel-title">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item
                v-for="(item,index) of recommendChannels"
                :key="index"
                :text="item.name"
                class="grid-item"
                @click="addChannel(item)"
            />
        </van-grid>
    </div>
</template>
<script>
import { 
    getAllChannels,
    updateUserChannel,
    delUserChannel
} from '@/api/channel'
export default {
    name: 'ChannelEdit',
    props: {
        userChannels: {
            type: Array,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            allChannels: [],
            isEdit: false
        }
    },
    created() {
        this.loadAllChannels()
    },
    methods: {
        async loadAllChannels() {
            const { data } = await getAllChannels()
            this.allChannels = data.data.channels
        },
        async addChannel(channel) {
            this.userChannels.push(channel)

            //数据持久化
            if(this.user) {
                await updateUserChannel({
                    channels: [{
                        id: channel.id,
                        seq: this.userChannels.length
                    }]
                })
            }
        },
        //我的频道操作
        onUserChannelClick(item,index) {
            if(this.isEdit && index !== 0) {
                //如果是编辑状态并且索引不为0(推荐)，删除频道
                this.delChannel(item,index)
            }else {
                //切换进入频道
                this.switchChannel(index)
            }
        },
        async delChannel(item,index) {
            //如果删除的频道索引在激活频道索引之前，需要更新所引值
            if(index <= this.active) {
                this.$emit('update-active',this.active - 1)
            }
            //删除指定索引频道
            this.userChannels.splice(index,1)
            //数据持久化
            if(this.$store.state.user){
                //登陆了，持久化到线上
                await delUserChannel(item.id)
                console.log(item.id)
            }else{
                console.log(1)
            }
        },
        switchChannel(index) {
            //把点击的频道index发送给父组件
            this.$emit('update-active',index)
            //向父组件传递方法修改关闭弹出层
            this.$emit('close')

        }
    },
    computed: {
        //推荐的频道列表
        recommendChannels() {
            // //filter：过滤数据，根据布尔值收集数据
            // //filter查找满足条件的所有元素
            return this.allChannels.filter(channel => {
                //判断channel是否属于用户频道
                return !this.userChannels.find(userChannel => {
                    //找到满足条件的元素
                    return userChannel.id === channel.id
                })
            })
            // const arr = []
            // this.allChannels.forEach(channel => {
            //     let flag = false//控制是否追加数组的开关
            //     for(let i = 0;i<this.userChannels.length;i++) {
            //         if(this.userChannels[i].id === channel.id) {
            //             flag = true
            //             break
            //         }
            //     }
            //     if(!flag) {
            //         arr.push(channel)
            //     }
            // })
            // return arr
        }
    }
}
</script>
<style lang="less" scoped>
.channel-edit {
    padding-top: 54px;

    .channel-title {
        font-size: 16px;
        color: #333;
    }
    .grid-item {
        width: 80px;
        height: 43px;
        /deep/ .van-grid-item__content {
            background-color: #f4f5f6;
            .van-grid-item__text {
                font-size: 16px;
                color: #222;
                text-overflow: ellipsis;
                margin-top: 0;
            }
        }
        /deep/ .van-grid-item__icon {
            position:absolute;
            right: -5px;
            top: -5px;
            font-size: 20px;
            color: #aaa;
        }
    }
    .active {
        /deep/ .van-grid-item__text {
            color: red !important;
        }
    }
}
</style>