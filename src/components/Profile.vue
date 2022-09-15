<template>
    <div>
        <section class="banner1">
            <div class="focusinfo">
                <div class="header-tou"><img loading="lazy" src="@/assets/img/person.jpg">
                </div>
                <div class="header-info">
                    <!-- 首页一言打字效果 -->
                    <p>{{str}}</p>
                </div>
                <div class="top-social">
                    <li><svg class="icon" aria-hidden="true">
                            <a href="">
                                <use xlink:href="#icon-QQ1"></use>
                            </a>
                        </svg></li>
                    <li><svg class="icon" aria-hidden="true">
                            <a href="https://space.bilibili.com/225564141" target="_blank">
                                <use xlink:href="#icon-githubb"></use>
                            </a>
                        </svg></li>
                    <li><svg class="icon" aria-hidden="true">
                            <a href="https://space.bilibili.com/225564141" target="_blank">
                                <use xlink:href="#icon-bilibili"></use>
                            </a>
                        </svg></li>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from 'axios';
export default {
    data(){
        return{
            str: '喜欢就去吧'
        }
    },
    methods:{
        getP(){
            axios.get("https://saying.api.azwcl.com/saying/get")
            .then(res=>{
                if(res.data.code === 200){
                    this.str = res.data.data.content
                    // console.log(this.str)
                }
            })
        }
    },
    created(){
        this.getP()
    }
}
</script>

<style lang="scss" scoped>
.banner1 {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url("@/assets/img/ban.jpg") no-repeat;
    /* 保持原有尺寸比例，裁切长边 */
    background-size: cover;
    /* 图片定位正中间 */
    background-position: center center;
}

.focusinfo {
    position: relative;
    text-align: center;
    top: 33%;
    transition: 0.4s ease all;

    .header-info {
        width: 40%;
        margin: auto;
        font-size: 16px;
        color: var(--theme-skin, #505050);
        background: var(--infor_bar_bgcolor, rgba(255, 255, 255, 0.8));
        padding: 15px;
        margin-top: 22px;
        letter-spacing: 0;
        line-height: 30px;
        border-radius: 120px;
        box-sizing: initial;
        white-space: nowrap;
        font-weight: var(--global-font-weight);
        transition: all 0.8s ease !important;

        p:hover {
            transition: all 0.8s ease !important;
            color: #fedf74;
        }

        p {
            transition: all 0.6s ease 0.4s !important;
            color: rgb(18, 18, 17);
        }
    }

    .header-tou {

        padding-top: 100px;
        img {
            width: 150px;
            height: 150px;
            border-radius: 100%;
            border: 3px solid rgba(13, 13, 14, 0.318);
            transition: all 0.6s
        }

        img:hover {
            transform: rotate(-360deg);
        }
    }


    .top-social {

        li {
            list-style: none;
            display: inline-block;
            padding: 14px 17px;
            margin: 30px;
            font-size: 18px;
            font-weight: 500;
            border-radius: 100%;
            background: #fff;

            svg {
                width: 20px;
                height: 20px;
            }
        }
    }


}
</style>