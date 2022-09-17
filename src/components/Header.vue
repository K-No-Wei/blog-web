<template>
    <div id="head">
        <header>
            <a href="/" class="logo">knowei</a>
            <ul>
                <li><a @click="goHome"><svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shouye"></use>
                        </svg></a></li>
                <li class="one"><a><svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-biji"></use>
                        </svg></a>

                    <ul class="two-list">
                        <li v-for="(item, index) in categoryList" :key="index" @click="go(item.id,'cate',item.categoryName)">{{item.categoryName}}</li>
                    </ul>
                </li>
                <li class="one"><a><svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-biaoqian"></use>
                        </svg></a>
                    <ul class="two-list">
                        <li v-for="(item, index) in tagList" :key="index" @click="go(item.id,'tag',item.tagName)">{{item.tagName}}</li>
                    </ul>
                </li>
                <li class="one"><a @click="goArchive"><svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-tiaojie"></use>
                        </svg></a>


                </li>
                <li><a @click="goMy"><svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shoucang"></use>
                        </svg></a></li>

            </ul>
        </header>


    </div>

</template>

<script>
import { getAllTag } from "@/api/tag"
import { getAllCategory } from '@/api/category';
export default {
    data() {
        return {
            categoryList: [],
            tagList: []
        };
    },
    methods: {
        goHome() {
            this.$router.push("/")
        },
        go(id, str, name) {
            if(str === 'cate'){
                this.$router.push({
                    name: 'category',
                    params:{
                        title: name,
                        id: id
                        
                    }
                })
            }
            if(str === 'tag'){
                this.$router.push({
                    name: 'tag',
                    params:{
                        title: name,
                        id: id
                        
                    }
                })
            }
        },
        goMy() {
            this.$router.push('/my');
        },
        getCategory() {
            getAllCategory().then(res => {
                if (res.data.code === 200) {
                    this.categoryList = res.data.data
                }
            })
        },
        getTags() {
            getAllTag().then(res => {
                if (res.data.code === 200) {
                    this.tagList = res.data.data
                }
            })
        },
        goArchive(){
            this.$router.push("/archive")
        }

    },
    created() {
        this.getCategory(),
            this.getTags()
    }
}
</script>

<style lang="scss" scoped>
/* 引入网络字体（Poppins） */
@import url("http://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");

#head {

    header {
        /* 固定定位 */
        // margin: 100px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        /* 弹性布局 */
        display: flex;
        /* 将元素靠边对齐 */
        justify-content: space-between;
        align-items: center;
        padding: 40px 100px !important;
        z-index: 1;
        /* 动画过渡 */
        transition: 0.6s;
    }

    header .logo {
        font-size: 32px;
        color: #fff;
        font-weight: 700;
        text-decoration: none;
        /* 转大写 */
        text-transform: uppercase;
        /* 字间距 */
        letter-spacing: 2px;
        transition: 0.6s;
    }

    header ul {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    header ul li {
        list-style: none;

    }

    header ul li a {
        margin: 0 25px;
        text-decoration: none;
        color: #fff;
        font-weight: 500;
        letter-spacing: 2px;
        transition: 0.6s;

        a {
            margin: 0 15px;
            text-decoration: none;
            color: #fff;
            font-weight: 500;
            letter-spacing: 2px;
            transition: 0.6s;
        }

    }

    .one .two-list {
        position: absolute;
        display: list-item;
        list-style: none;
        display: none;
        color: rgb(42, 42, 41);
        ;
        background: rgba(255, 255, 255, 0.607);
        transition: 0.3s;
        margin-top: -2px;
        // margin-left: -0.1fr;
        border-radius: 15px;

        li {
            margin: 10px 5px;
            padding: 4px 10px;
            // display: none;
            line-height: normal;
            cursor: pointer;
        }

        li:hover {
            background: rgba(30, 28, 28, 0.132);
            border-radius: 10px;
        }

    }


    .one:hover ul {
        display: block;
        animation: header-menu .8s;
    }

    .banner2 {
        position: relative;
        width: 100%;
        height: 100vh;
        background: url("@/assets/img/ban.jpg") no-repeat;
        /* 保持原有尺寸比例，裁切长边 */
        background-size: cover;
        /* 图片定位正中间 */
        background-position: center center;
    }

    /* 鼠标滚动后，改变导航栏样式 */
    header.sticky {
        padding: 6px 100px !important;
        background-color: rgba(255, 255, 255, 0.448);
        border-radius: 20px;
    }

    header.sticky .logo,
    header.sticky ul li a {
        color: #000;
    }

    a svg {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

}
</style>