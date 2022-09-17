<template>
    <div class="tag">


        <div id="content" class="site-content" style="background-color: rgba(255, 255, 255, 0.8);">
            <div id="primary" class="content-area">
                <main id="main" class="site-main" role="main">
                    <h1 class="main-title"><i class="fa fa-bookmark-o" aria-hidden="true"></i> {{tagName}}</h1>
                    <article v-for="(item, index) in articleList" :key="index"
                        class="post post-list-thumb  post-list-show" itemscope=""
                        itemtype="http://schema.org/BlogPosting" style="will-change: auto;">
                        <div class="post-thumb"> <a href="javascript:;">
                                <router-link :to="{name: 'article', params:{id: item.id}}"> <img class="lazyload"
                                        :src="item.articleCover" data-src="https://randimg.msgn.top?95"> </router-link>
                            </a></div>
                        <div class="post-content-wrap">
                            <div class="post-content">
                                <div class="post-date"> <i class="iconfont icon-time"></i>发布于 {{item.createTime}}</div>
                                <a href="javascript:;" class="post-title">
                                    <h3>{{item.articleTitle}}</h3>
                                </a>
                                <div class="post-meta"> <span><i class="iconfont icon-attention"></i>{{item.heat}}
                                        热度</span> <span class="comments-number"> <i class="iconfont icon-mark"></i> <a
                                            href="javascript:;">{{item.count}} 评论</a> </span>
                                            <span @click="go(item.category.id,'cate',item.category.categoryName)"><i class="iconfont icon-file"></i> <a > {{item.category.categoryName}} </a> </span>
                                </div>
                                <div class="float-content">
                                    <p>{{item.articleDescribe}}</p>
                                    <div class="post-bottom"> <a href="javascript:;" class="button-normal"><i
                                                class="iconfont icon-caidan"></i></a></div>
                                </div>
                            </div>
                        </div>
                    </article>
                </main>
                <div id="pagination" v-if="this.articleList.length != this.total"><a @click="onLoad"> 更早的文章</a></div>
                <div id="pagination" v-else><a > 没有喽</a></div>
                <!-- <div id="add_post"><span id="add_post_time" style="visibility: hidden;" title="233"></span></div> -->
            </div>
        </div>
    </div>
</template>

<script>
// import '@/assets/js/sco'
import Header from '@/components/Header.vue';
import Profile from '@/components/Profile.vue';
import { getAtricleList } from "@/api/article"
import {getArticlesById} from "@/api/tag"
export default {
    name: 'HomeView',
    components: {
        Header,
        Profile
    },
    data() {
        return {
            current: 1,
            pageSize: '',
            total: '',
            articleList: [],
            tagName: ""

        }
    },
    methods: {
        go(id,str,name){
          if(str === 'cate'){
                this.$router.push({
                    name: 'category',
                    params:{
                        title: name,
                        id: id
                        
                    }
                })
            }
        },
        // 获取全部文章
        getAll(){
            getArticlesById(this.$route.params.id).then(res => {
                if(res.data.code === 200){
                    this.articleList = res.data.data
                    for(let i = 0; i < this.articleList[0].tags.length;i++){
                        if(this.articleList[0].tags[i].tagName == this.tagName){
                            this.total = this.articleList[0].tags[i].count
                            break;
                        }
                    }
                    
                }
            })
        },
        // 加载更多文章
        onLoad() {
            for (let i = 0; this.current < this.pageSize, i <= 0; i++) {
                getAtricleList(this.current + 1).then(res => {
                    if (res.data.code === 200) {
                        console.log(this.articleList)
                        console.log(res.data.data.length)
                        for (let i = 0; i < res.data.data.length; i++) {
                            this.articleList.push(res.data.data[i])
                        }
                        this.current = res.data.pageVo.current
                        this.pageSize = res.data.pageVo.pageSize
                        this.total = res.data.pageVo.total
                    }
                })
            }

            // 加载状态结束
            this.loading = false;

            // 数据全部加载完成
            if (this.total >= 6) {
                this.finished = true;
            }
        },

    },
    created() {
        
        this.tagName = this.$route.params.title
        this.getAll()
    }
}
</script>

<style lang="scss" scoped>
// @import url("@/assets/css/autoptimize_eb2bc13ea312bef32c93ed74dc5f4d7b.css");
.tag{
    background: url(https://api.yimian.xyz/img);
}
</style>