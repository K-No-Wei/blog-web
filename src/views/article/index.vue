<template>
    <div id="post-body">
        <div class="post-title">
            <h1>{{article.articleTitle}}</h1>
        </div>

        <div class="post-content markdown-body ">
            <div class="zhe">
                <vueMarkDown v-highlight :source="article.articleBodyVo.content"></vueMarkDown>
            </div>
            
        </div>

    </div>
</template>

<script>
import { getArticle } from "@/api/article"
import vueMarkDown from 'vue-markdown'
export default {
    components: {
        vueMarkDown
    },
    data() {
        return {
            article: ''
        }
    },
    methods: {
        // 根据id获取文章详情
        getArticle() {
            let id = this.$route.params.id
            getArticle(id).then(res => {
                if (res.data.code === 200) {
                    this.article = res.data.data;
                    // md格式渲染在页面
                }
            })
        }
    },
    created() {
        this.getArticle()
    }
}
</script>

<style lang="scss" scoped>
#post-body {

    animation: header-menu 1.8s;


    // transition: all .4s ease !important;

    margin: 0;
    padding: 0;
    background: url(https://api.yimian.xyz/img);
    repeat: no-repeat;
    background-attachment:fixed;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/background.jpg', sizingMethod='scale');
    -ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/background.jpg', sizingMethod='scale');
    background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;

    position: relative;
    width: 100%;

    // /* 保持原有尺寸比例，裁切长边 */
    background-size: cover;
    /* 图片定位正中间 */
    background-position: center center;

    .post-title {
        background-color: rgba(255, 255, 255,0.8);
        padding: 100px;
        text-align: center;
        align-content: center;
        h1 {
            font-size: 30px;
            font-weight: lighter;
            color: rgb(9, 10, 10);
        }
    }
}

.post-content {
    
    
        background-color: rgba(255, 255, 255,0.8);
        .zhe{
        max-width: 860px;
        margin-left: auto;
        margin-right: auto;}
    
    // background-color: transparent !important
}
</style>