<template>
  <div class="archive">
    <div class="post-title">
      <h1>不想写啦</h1>
    </div>
    <div class="content">

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.archive {
  // 动画
  animation: header-menu 1.8s;


  // font-size: 20px;
  // // font-weight: var(--global-font-weight, 400);
  // padding-bottom: 10px;
  // margin-bottom: 30px;
  transition: all .4s ease !important;

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


  .content {
    background-color: rgba(255, 255, 255, 0.8);

    .zhe {
      max-width: 860px;
      margin-left: auto;
      margin-right: auto;

      span {
        font-size: 20px;
      }
    }

    hr {
      max-width: 860px;
      position: relative;
      margin: 2rem auto;
      width: calc(100% - 4px);
      border: 2px dashed #a4d8fa;
    }

    // background-color: transparent !important
    .header-tou {
      img {
        width: 200px;
        height: 200px;
        border-radius: 100%;
        border: 3px solid rgba(13, 13, 14, 0.318);
        transition: all 0.6s
      }

      img:hover {
        transform: rotate(-360deg);
      }
    }

    .my-skill {
      .skillbar {
        position: relative;
        display: block;
        max-width: 720px;
        margin: 15px 10px;
        background: #eee;
        height: 30px;
        border-radius: 35px;
        -moz-border-radius: 35px;
        -webkit-border-radius: 35px;
        -webkit-transition: 0.4s linear;
        -moz-transition: 0.4s linear;
        -o-transition: 0.4s linear;
        transition: 0.4s linear;
        -webkit-transition-property: width, background-color;
        -moz-transition-property: width, background-color;
        -o-transition-property: width, background-color;
        transition-property: width, background-color;

        .skillbar-title {
          position: absolute;
          top: 0;
          left: 0;
          width: 110px;
          font-size: 0.9rem;
          color: #ffffff;
          border-radius: 35px;
          -webkit-border-radius: 35px;
          -moz-border-radius: 35px;

          span {
            margin: 0 10px;
          }
        }

        .skill-bar-percent {
          position: absolute;
          right: 10px;
          top: 0;
          font-size: 12px;
          height: 30px;
          line-height: 30px;
          color: #ffffff;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
}
</style>