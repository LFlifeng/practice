<template>
  <div>
    <img :src="song.al.picUrl" class="background_img">
    <div class="body">
      <!-- 歌名歌手 -->
      <div class="sing-brief">
        <!-- <div class="back_box" bindtap='go_index'> <img src="../../assets/images/back.png" class="back"></div> -->
        <div class="sing-name">{{song.name}}</div>
        <div class="singer-name">
          <span class="singer-name-text" v-for="(item,i) in song.ar" :key="i">{{item.name}}</span>
        </div>
      </div>
      <audio :src="songDetail.url" controls="controls" hidden></audio>
      <!-- 封面 -->
      <!-- 一开始onload时,showLyric=true, 显示为转动的图标，点击图标，切换为歌词-->
      <div class="sing-show" bindtap="showLyric">
        <div class="moveCircle isPlay ? 'play' : ''">
          <img :src="song.al.picUrl" class="coverImg" :hidden="!showLyric">
        </div>
        <span :hidden="showLyric" class="songLyric">暂无歌词</span>
      </div>
      <!-- 暂停播放图标 -->
      <div class="play_suspend">
        <!-- 上一曲 -->
        <div class="icon_playing">
          <img src="../../assets/images/lastSong.png" class="icon_play">
        </div>
        <div class="icon_playing">
          <img
            bindtap="handleToggleBGAudio"
            src="../../assets/images/suspend.png"
            :hidden="!isPlay"
            :class="'img_play_suspend'"
          >
          <!-- 暂停图标-->
          <img
            bindtap="handleToggleBGAudio"
            src="../../assets/images/play.png"
            :hidden="isPlay"
            :class="'img_play_suspend'"
          >
          <!--播放图标-->
        </div>
        <!-- 下一曲 -->
        <div class="icon_playing">
          <img src="../../assets/images/nextSong.png" class="icon_play" bindtap="go_lastSong">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
// import more_song from '../../res/song.js'
export default {
  data() {
    return {
      // innerAudioContext: {},
      song: [], //歌曲详情
      songid: [], //刚进入界面时的歌曲id
      his_songId: [], //历史歌曲id
      songDetail: [], //歌曲播放路径
      isPlay: "",
      show: true,
      showLyric: true,
      lyric: "", //歌词
      songList: [], //歌单
      songListId: [] //全部歌曲id
    };
  },
  created() {
    this.showData();
  },
  methods: {
    showData() {
      var _this = this;
      this.isPlay = true;
      var id1 = this.$route.query.id; //获取URL中的参数
      var id2 = localStorage.getItem('id');
      //获取歌单中的全部歌曲
      this.$axios
        .get(`http://localhost:3000/playlist/detail?id=${id2}`, {})
        .then(res => {
          if (res.data.code === 200) {
            this.songList = res.data.playlist.tracks;
          }
          this.songList.forEach(function(item) {
            _this.songListId.push(item.id);
          });
        });
      // console.log(this.songListId)
      id1 = Number(id1)
      // console.log(id1)
      // var a = this.songListId.indexOf(id1);
      // console.log(a) 
      if(this.songListId.indexOf(id1) != -1) {
        // console.log(222)
      }else {
        // console.log(111)
      }
      localStorage.clear();


      //获取歌曲路径
      this.$axios
        .get(`http://localhost:3000/song/url?id=${id1}`, {})
        .then(res => {
          if (res.data.code === 200) {
            this.songDetail = res.data.data[0];
          } else {
            Toast({
              message: "服务器开了小差~~~",
              position: "bottom",
              duration: 3000
            });
          }
        });
      //获取歌曲详情
      this.$axios
        .get(`http://localhost:3000/song/detail?ids=${id1}`, {})
        .then(res => {
          if (res.data.code === 200) {
            this.song = res.data.songs[0];
          }
          // console.log(this.song)
        });
      //获取歌词
      this.$axios.get(`http://localhost:3000/lyric?id=${id1}`, {}).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.lyric = res.data.lrc.lyric;
        }
      });
    }
  }
};
</script>
<style>
/* 播放界面毛玻璃效果 */

.background_img {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  filter: blur(20px);
  z-index: -1;
  transform: scale(1.5);
  /*和网易云音乐对比了一下，发现他们是也是放大1.5倍*/
}

/* .sing-brief {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #ffffff;
  }
  .sing-name {
    font-size: 20px;
    font-weight: 600;
  }
  .singer-name {
    font-size: 12px;
  } */

/* .back{
    width: 100%;
    /* height: 105%; */

/* }  */

.back_box {
  position: absolute;
  width: 8%;
  height: 24px;
  padding-top: 10px;
}

.sing-brief {
  margin-top: 20px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.sing-name {
  font-size: 18px;
  color: #fff;
  width: 92%;
  right: 0;
  display: initial;
}

.singer-name {
  display: flex;
  font-size: 13px;
  color: #ffffff;
  text-align: center;
  line-height: 12px;
  justify-content: center;
}

.singer-name-text {
  margin-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
  color: #fff;
}

.sing-show {
  position: relative;
  width: 100%;
  height: 76%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-top: 100px;
}

.coverImgStick {
  position: absolute;
  top: 15%;
  left: 50%;
  width: 100px;
  height: 130px;
  transform: translate(-20%, -50%) rotate(-20deg);
}

.coverImgBg {
  z-index: -1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  border-radius: 50%;
}

.coverImg {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  top: 0%;
  left: 19%;
  position: absolute;
  border: 3px solid #ffffff;
  animation: rotate 15s linear infinite;
  animation-play-state: paused;
}

.play_suspend {
  display: flex;
  height: 15%;
  text-align: center;
  line-height: 50px;
  box-sizing: border-box;
  margin-top: 100px;
}

.icon_playing {
  flex: 1;
}

.icon_play {
  width: 24%;
  height: 55%;
}

.img_play_suspend {
  width: 40%;
  height: 100%;
}

.coverImg.play {
  animation: rotate 15s linear infinite;
  animation-fill-mode: forwards;
}

.moveCircle.play {
  animation: moveCircle 2.5s linear infinite;
  animation-fill-mode: forwards;
}

.hide {
  display: none;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.songLyric {
  color: #ffffff;
  font-size: 14px;
}

/* .circle{
    border-radius: 50%;
    border: 1px solid #ffffff;
    width:400px;
    height:400px;
    /* position:absolute; */

/* animation: moveCircle 2.5s linear infinite ; */

/* animation-play-state: paused; */

/* } */

.moveCircle {
  border-radius: 50%;
  border: 1px solid #ffffff;
  width: 200px;
  height: 200px;
  animation: moveCircle 2.5s linear infinite;
  animation-play-state: paused;
}

/* .circle{
    border-radius: 50%;
    border: 1px solid red;
    animation: moveCircle 5s  2s linear infinite ;/* 因为动画宽高会变化，所以会覆盖*/

/* animation-play-state: paused; */

/* } */

@keyframes moveCircle {
  0% {
    width: 250px;
    height: 250px;
    border: 1px solid rgba(255, 255, 255, 1);
  }
  30% {
    width: 300px;
    height: 30px;
    border: 1px solid rgba(255, 255, 255, 0.8);
  }
  50% {
    width: 400px;
    height: 400px;
    border: 1px solid rgba(255, 255, 255, 0.6);
  }
  80% {
    width: 500px;
    height: 500px;
    border: 1px solid rgba(255, 255, 255, 0.4);
  }
  99% {
    width: 375px;
    height: 375px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  100% {
    width: 0px;
    height: 0px;
    border: 1px solid rgba(255, 255, 255, 0);
  }
}

/* 741px */
</style>


