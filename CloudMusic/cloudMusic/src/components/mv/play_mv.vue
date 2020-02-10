<template>
  <div>
    <div class="mv_box">
      <video
        :src="mv.brs['480']"
        :title="mv.name"
        :class="mv"
        :autoplay="autoplay"
        :loop="loop"
        :direction="0"
        :show-fullscreen-btn="showfullscreenbtn"
        :show-center-play-btn="showcenterplaybtn"
        :enable-progress-gesture="enableprogressgesture"
        :show-mute-btn="showmutebtn"
        play-btn-position="center"
        :object-fit="objectfit"
      ></video>
    </div>
    <div class="mv_name">{{mv.name}}</div>
    <div class="mv_time">发行:{{mv.publishTime}}</div>
    <div class="mv_time mv_times">播放次数:{{mv.playCount}}</div>
    <div class="mv_time mv_desc">{{mv.desc}}</div>
    <div class="mv_time mv_desc mv_other">点赞:{{mv.likeCount}}</div>
    <div class="mv_time mv_desc mv_other">收藏:{{mv.subCount}}</div>
    <div class="mv_time mv_desc mv_other">评论:{{mv.commentCount}}</div>
    <div class="mv_time mv_desc mv_other">分享:{{mv.shareCount}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mv: [],
      autoplay: true,
      loop: true,
      showfullscreenbtn: true,
      showcenterplaybtn: true,
      enableprogressgesture: true,
      showmutebtn: true,
      objectfit: "contain"
    };
  },
  created() {
    this.showData();
  },
  methods: {
    showData() {
      var id = this.$route.query.id;//获取URL中的参数
      this.$axios
        .get(`http://localhost:3000/mv/detail?mvid=${id}`, {})
        .then(res => {
          if (res.data.code === 200) {
            this.mv = res.data.data;
          }
        });
    }
  }
};
</script>
<style>
.mv_box {
  width: 100%;
}
.mv_box video {
  width: 100%;
}
.mv_desc:nth-child(5){
  color: #787878;
  font-size: 14px;
}
.mv_name {
  text-align: left;
  padding-left: 10px;
}
.mv_time {
  text-align: left;
  margin-top: 5px;
  padding-left: 10px;
}
</style>


