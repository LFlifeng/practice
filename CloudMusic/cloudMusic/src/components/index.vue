<template>
  <div class="hello">
    <!-- 顶部标题 -->
    <mt-header title="云音乐">
      <!-- <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>-->
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!-- 搜索框 -->
    <mt-search>
      <mt-cell></mt-cell>
    </mt-search>
    <!-- 轮播图 -->
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item,i) in bannerList" :key="i" :data-id="item.id">
        <img :src="item.imageUrl" :data-id='item.targetId'>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 推荐导航四大入口 -->
    <div class="comment_container_box">
      <div class="comment_daily comment_box" @click="more_mv()">
        <div class="contaner_images">
          <img src="../assets/images/MV.png" class="commentImage">
        </div>
        <span class="comment_text">推荐MV</span>
      </div>
      <div class="comment_private_FM comment_box"  @click="more_singer()">
        <div class="contaner_images">
          <img src="../assets/images/songer.png" class="commentImage">
        </div>
        <span class="comment_text">歌手榜</span>
      </div>
      <div class="comment_songList comment_box" @click="more_song()">
        <div class="contaner_images">
          <img src="../assets/images/songList.png" class="commentImage">
        </div>
        <span class="comment_text">歌单</span>
      </div>
      <div class="comment_rank comment_box">
        <div class="contaner_images">
          <img src="../assets/images/rank.png" class="commentImage">
        </div>
        <span class="comment_text">榜单排行</span>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="songsheet_items_allbox newsong_allbox">
      <div class="clearfix">
        <span class="songsheet_container_title l">最新音乐</span>
        <div class="title_leader_box l">
          <img src="../assets/images/dayuhao.png" class="title_leader">
        </div>
      </div>
      <div class="songsheet_items_box">
        <div class="songsheet_item_box" v-for="(item,i) in newSong_index" :key="i" :data-id="item.id" >
          <img :src="item.song.album.picUrl" class="songsheet_container_image">
          <span class="songsheet_container_text newsong_songname">{{item.name}}</span>
          <span class="newsong_artists">{{item.song.artists[0].name}}</span>
        </div>
      </div>
    </div>
    <!-- 精选歌单 -->
    <div class="songsheet_items_allbox newsong_allbox">
      <div class="clearfix">
        <span class="songsheet_container_title l">精选歌单</span>
        <div class="title_leader_box l">
          <img src="../assets/images/dayuhao.png" class="title_leader">
        </div>
      </div>
      <div class="songsheet_items_box">
        <div class="songsheet_item_box" v-for="(item,i) in songSheet_index" :key="i" :data-id="item.id">
          <img :src="item.coverImgUrl" class="songsheet_container_image">
          <span class="songsheet_container_text newsong_songname">{{item.name}}</span>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="songsheet_items_allbox newsong_allbox">
      <div class="clearfix">
        <span class="songsheet_container_title l">推荐MV</span>
      </div>
      <div class="songsheet_items_box">
        <div
          class="songsheet_item_box"
          v-for="(item,i) in recommend_MV"
          :key="i" :data-id="item.id"
          style="width:50%;"
          @click="handlePlayMv(item.id)"
        >
          <img :src="item.picUrl" class="songsheet_container_image">
          <span class="songsheet_container_text newsong_songname">{{item.name}}</span>
          <span class="newsong_artists">{{item.artistName}}</span>
        </div>
      </div>
    </div>
    <!-- 最新专辑 -->
    <div class="songsheet_items_allbox newsong_allbox">
      <div class="clearfix">
        <span class="songsheet_container_title l">最新专辑</span>
        <div class="title_leader_box l">
          <img src="../assets/images/dayuhao.png" class="title_leader">
        </div>
      </div>
      <div class="songsheet_items_box">
        <div class="songsheet_item_box" v-for="(item,i) in newEst_index" :key="i" :data-id="item.id">
          <img :src="item.picUrl" class="songsheet_container_image">
          <span class="songsheet_container_text newsong_songname">{{item.name}}</span>
          <span class="newsong_artists">{{item.artistName}}</span>
        </div>
      </div>
    </div>
    <!-- 精选电台 -->
    <div class="songsheet_items_allbox newsong_allbox">
      <div class="clearfix">
        <span class="songsheet_container_title l">精选电台</span>
        <div class="title_leader_box l">
          <img src="../assets/images/dayuhao.png" class="title_leader">
        </div>
      </div>
      <div class="songsheet_items_box">
        <div class="songsheet_item_box" v-for="(item,i) in dj_index" :key="i" :data-id="item.id">
          <img :src="item.picUrl" class="songsheet_container_image">
          <span class="songsheet_container_text newsong_songname">{{item.name}}</span>
        </div>
      </div>
    </div>
    <!-- 底部菜单栏 -->
    <mt-tabbar>
      <mt-tab-item id="乐库">
        <img slot="icon" src="../assets/images/library_on.png">
        乐库
      </mt-tab-item>
      <mt-tab-item id="">
        <img slot="icon" src="../assets/images/collect_on.png">
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/images/me_on.png">
        我的
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [], //个性推荐轮播图，
      newSong_index: [], //最新音乐前6名
      newSong: [], //所有最新音乐
      songSheet_index: [], //精选歌单前6
      songSheet: [], //所有歌单
      recommend_MV: [], //推荐MV
      newEst_index: [], //最新专辑前6
      newEst: [], //所有最新专辑
      dj_index: [], //首页电台推荐
      dj: [] //全部电台
    };
  },
  created() {
    //轮播图
    this.getBanner();
    //最新音乐
    this.getNewSong();
    //精选歌单
    this.getSongSheet();
    //推荐MV
    this.getRecommendMV();
    //最新专辑
    this.getNewEst();
    //精选电台
    this.getDjRadios();
  },
  methods: {
    //轮播图
    getBanner() {
      this.$axios.get(`http://localhost:3000/banner`, { type: 2 }).then(res => {
        if (res.data.code === 200) {
          this.bannerList = res.data.banners;
        }
      });
    },
    //最新音乐
    getNewSong() {
      this.$axios
        .get(`http://localhost:3000/personalized/newsong`, {})
        .then(res => {
          if (res.data.code === 200) {
            this.newSong_index = res.data.result.slice(0, 6);
            this.newSong = res.data.result;
          }
        });
    },
    // 精选歌单
    getSongSheet() {
      this.$axios
        .get(`http://localhost:3000/top/playlist`, { order: "hot" })
        .then(res => {
          if (res.data.code === 200) {
            this.songSheet_index = res.data.playlists.slice(0, 6);
            this.songSheet = res.data.playlists;
          }
        });
    },
    //推荐MV
    getRecommendMV() {
      this.$axios.get(`http://localhost:3000/personalized/mv`, {}).then(res => {
        if (res.data.code === 200) {
          this.recommend_MV = res.data.result;
        }
      });
    },
    //最新专辑
    getNewEst() {
      this.$axios.get(`http://localhost:3000/album/newest`, {}).then(res => {
        if (res.data.code === 200) {
          this.newEst_index = res.data.albums.slice(4, 10);
          this.newEst = res.data.albums;
        }
      });
    },
    //精选电台
    getDjRadios() {
      this.$axios.get(`http://localhost:3000/dj/recommend`, {}).then(res => {
        if (res.data.code === 200) {
          this.dj_index = res.data.djRadios.slice(0, 6);
          this.dj = res.data.djRadios;
        }
      });
    },
    more_mv(){
      this.$router.push({
        path: '/more_mv'
      })
    },
    handlePlayMv(id) {
      const mvId = id;
      this.$router.push({
        path: `/play_mv?id=${mvId}`
      });
    },
    more_song(){
      this.$router.push({
        path: '/more_song'
      })
    },
    more_singer(){
      this.$router.push({
        path: '/singerList'
      })
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* 顶部 */
.mint-header {
  background-color: #dc4238;
}
.mint-header-title {
  font-size: 18px;
}
.mintui {
  font-size: 26px;
}
/* 搜索框 */
.mint-search {
  height: 55px;
}
.mint-searchbar {
  background-color: #dc4238;
}
.mint-searchbar-cancel {
  color: #505050;
}
/* 轮播图 */
.mint-swipe {
  height: 140px !important;
}
.mint-swipe-item img {
  width: 100%;
  height: 100%;
}
/* 推荐导航四大入口 */
.comment_container_box {
  display: flex;
  position: relative;
  margin-top: 10px;
  border-bottom: 1px solid #edeef0;
}
.comment_box {
  width: 25%;
  text-align: center;
}
.contaner_images {
  width: 40px;
  height: 40px;
  background-color: #dc4238;
  border-radius: 50%;
  left: 50%;
  transform: translate(80%);
}
.commentImage {
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(0%, 50%);
}
.comment_text {
  font-size: 14px;
}
/* 最新音乐... */
.songsheet_items_allbox {
  margin-top: 15px;
}
.songsheet_container_title {
  font-size: 17px;
  font-weight: bold;
  padding-left: 10px;
}
.songsheet_container_image {
  width: 95%;
  height: 150px;
  margin: 5px;
  border-radius: 8px;
}
.songsheet_container_text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 13px;
  margin-top: 10px;
  padding-left: 10px;
}
.songsheet_item_box {
  padding-top: 10px;
  width: 33%;
  display: inline-block;
  box-sizing: border-box;
}
.newsong_artists {
  font-size: 13px;
}
.title_leader_box img {
  width: 20px;
  height: 20px;
}
.hello .songsheet_items_allbox:nth-last-child(2) {
  margin-bottom: 60px;
}
/* 底部菜单栏 */
.mint-tabbar {
  position: fixed;
}
</style>
