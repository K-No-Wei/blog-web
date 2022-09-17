<template>
    <div id="post-body">
        <div class="post-title">
            <h1>{{article.articleTitle}}</h1>
        </div>

        <div class="post-content markdown-body ">
            <div class="zhe">
                <vueMarkDown v-highlight :source="article.articleBodyVo.content"></vueMarkDown>
            </div>

            <div class="comment">

                <div class="comment-submit">
                    <div class="info-list">
                        <input @mouseleave="mouseLeave" type="text" name="" id="" placeholder="QQ自动获取头像" v-model="QQ">
                        <!-- <input type="text" name="" id="" placeholder="邮箱" v-model="email">
                        <input type="text" name="" id="" placeholder="网址" v-model="ipAdd"> -->
                    </div>
                    <div class="text-content">
                        <textarea name="" id="" cols="30" rows="10" placeholder="嗨嗨嗨"
                            v-model="commentParams.content"></textarea>
                    </div>
                    <div class="text-end">
                        <div @click="submitInfo">回复</div>
                    </div>
                </div>

                <section>
                    <div class="comments-main" style="display: block;">
                        <h3 id="comments-list-title">Comments | <span class="noticom"> </span></h3>
                        <div id="loading-comments"><span></span></div>
                        <ul class="commentwrap">
                            <li v-for="(item,index) in articleComment" :key="index"
                                class="comment byuser comment-author-joker even thread-even depth-1" id="comment-76">
                                <div class="contents">
                                    <div class="comment-arrow">
                                        <div class="main shadow">
                                            <div class="profile">
                                                <!-- 头像 -->
                                                <a href="javascript:;" target="_blank" rel="nofollow"><img alt="Joker"
                                                        :src="item.authorImg" class="avatar avatar-80 photo lazyload"
                                                        height="80" width="80" loading="lazy"></a>
                                            </div>
                                            <!-- 信息 -->
                                            <div class="commentinfo">
                                                <section class="commeta">
                                                    <div class="left">
                                                        <h4 class="author"><a href="javascript:;" target="_blank"
                                                                rel="nofollow">
                                                                {{item.commentUsername}} </a><a
                                                                @click="showDetails(item._id, index)" class="comm-huifu">回复</a>
                                                        </h4>
                                                    </div>
                                                    <div class="right">
                                                        <div class="info"><time datetime="">发布于
                                                                {{item.ctime}}</time>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                            <div class="body">
                                                <p>{{item.content}} <span title="dianzan"></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <ul v-if="item.childrens != null">
                                        <li v-for="(item, index) in item.childrens" :key="index">
                                            <div class="comment-arrow">
                                                <div class="main shadow">
                                                    <div class="profile">
                                                        <!-- 头像 -->
                                                        <a><img :src="item.authorImg" class="avatar avatar-80 photo"
                                                                height="80" width="80"></a>
                                                    </div>
                                                    <!-- 信息 -->
                                                    <div class="commentinfo">
                                                        <section class="commeta">
                                                            <div class="left">
                                                                <h4 class="author"><a>
                                                                        {{item.commentUsername}} </a>
                                                                </h4>
                                                            </div>
                                                            <div class="right">
                                                                <div class="info"><time >发布于
                                                                        {{item.ctime}}</time>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                    <div class="body">
                                                        <p>{{item.content}} <span title="dianzan"></span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <hr />
                            </li>
                        </ul>
                        <nav id="comments-navi">
                        </nav>
                    </div>


                </section>
            </div>

        </div>

    </div>
</template>

<script>
import { getArticle } from "@/api/article"
import vueMarkDown from 'vue-markdown'
import { Comment, GetComment, GetAv } from "@/api/comment"
import axios from 'axios'

export default {
    components: {
        vueMarkDown
    },
    data() {
        return {
            article: '',
            QQ: '',
            email: '',
            ipAdd: '',
            img: '',
            name: '',
            commentParams: {
                usernameId: '',
                commentUsername: '',
                content: '',
                articleId: '',
                parentId: '',
                authorImg: ''
            },
            articleComment: ''
            // [
            //     {
            //         _id: "632481464818ad52cffef9b5",
            //         ctime: "2022-09-16 21:59:34",
            //         usernameId: 2994172663,
            //         content: null,
            //         childrens: [],
            //         commentUsername: ""
            //     },
            //     {
            //         _id: "632481a84818ad52cffef9b6",
            //         ctime: "2022-09-16 22:01:12",
            //         usernameId: 2994172664,
            //         content: null,
            //         childrens: [],
            //         commentUsername: ""
            //     },
            //     {
            //         _id: "632481bd9bbaf01cc784e885",
            //         ctime: "2022-09-16 22:01:33",
            //         usernameId: 2994172666,
            //         content: "你好呀，我是你的氵啊",
            //         childrens: [],
            //         commentUsername: ""
            //     }
            // ]
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
        },
        submitInfo() {
            if(this.commentParams.commentUsername == null || this.commentParams.authorImg == null ){
                this.mouseLeave()
            }
            this.commentParams.articleId = this.$route.params.id
            Comment(this.commentParams).then(res => {

                if (res.data.code === 200) {
                    this.getAllComment()
                    this.commentParams.parentId = ''
                    this.commentParams.content = ''
                }
            })

        },
        // 鼠标移开就获取
        mouseLeave() {
            
            GetAv(this.QQ).then(res => {
                if (res.data.code === 200) {
                    this.commentParams.commentUsername = res.data.data.name
                    this.commentParams.authorImg = res.data.data.avatar
                    console.log(res.data.data)
                } else {
                    this.$message({ type: "error", message: '请输入正确的QQ号' })
                }

            })
        },
        getAllComment() {
            let id = this.$route.params.id
            GetComment(id).then(res => {
                if (res.data.code === 200) {
                    this.articleComment = res.data.data
                }
            })
        },
        showDetails(id,textid) {
            var el = document.getElementsByClassName("comment-submit")[0]
            this.$nextTick(function () {
                window.scrollTo({ "behavior": "smooth", "top": el.offsetTop - 100 });
            })
            this.commentParams.parentId = id
            this.commentParams.content = '@'+ this.articleComment[textid].commentUsername+"    "
        }
    },
    created() {
        this.getArticle()
        this.getAllComment()
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
    background-attachment: fixed;
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
        background-color: rgba(255, 255, 255, 0.8);
        padding: 100px;
        text-align: center;
        align-content: center;

        h1 {
            font-size: 30px;
            font-weight: lighter;
            color: rgb(9, 10, 10);
        }
    }

    .post-content {


        background-color: rgba(255, 255, 255, 0.8);

        .zhe {
            max-width: 860px;
            margin-left: auto;
            margin-right: auto;
        }

        // background-color: transparent !important
    }


    .comment {

        li {
            list-style: none;
        }

        padding: 10px 10px;
        margin-top: 100px;
        max-width: 860px;
        margin-left: auto;
        margin-right: auto;

        background-color: #ffffff;
        border-radius: 2px;

        .comment-submit {
            border: 1px solid rgb(231, 223, 214);
            border-radius: 4px;
        }

        .info-list {
            height: 20px;
            margin-bottom: 20px;
            input {
                width: 30%;
                margin: 10px 5px 10px 5px;
                margin-left: 20px;
                margin-top: 10px;
                border: 0 solid white;
                border-bottom: 1px dashed #dedede;
                
            }

            input:focus {
                outline: none;
            }

        }

        .text-content {
            textarea {
                width: 95%;
                border: 0 solid white;
                border: 1px dashed #dedede;
                margin: 20px;
            }

            textarea:focus {
                outline: none;
            }

        }

        .text-end {
            cursor: pointer;

            div {
                margin: 0 auto;
                border: 1px solid rgba(200, 190, 190, 0.718);
                text-align: center;

                padding: 5px 0;
                border-radius: 2px;
                margin: 0 10px 5px;
            }
        }

    }

    .comm-huifu {
        font-size: 10px;
        text-decoration: none;
        cursor: pointer;
    }


}
</style>