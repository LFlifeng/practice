<template>
    <div class="songsheet_items_allbox newsong_allbox">
        <span class="songsheet_container_title">歌手列表</span>
        <div class="search_result_songs">
            <div class="search_result_song_item songer_box" v-for="(item,i) in singerList" :key='i' :data-id="item.id" @click="handlePlaySinger(item.id)">
                <div class="songer_index_box">
                    <span class="songer_index">{{i + 1}}</span>
                    <img :src="item.picUrl" alt="" class="">
                </div>
                <div class="songer_img_box">
                    <div class="search_result_song_song_name">{{item.name}}</div>
                    <div
                        class="search_result_song_song_art-album"
                    >{{item.score}}热度</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      singerList: [] //,
    };
  },
  created() {
    this.getSingerList();
    
  },
  methods: {
    getSingerList() {
      var id = this.$route.query.id; //获取URL中的参数
      this.$axios
        .get(`http://localhost:3000/toplist/artist`, {order:'hot'})
        .then(res => {
          if (res.data.code === 200) {
            this.singerList = res.data.list.artists;
          }
        });
    },
    handlePlaySinger(id) {
      const singerId = id;
      this.$router.push({
        path: `/singerSong?id=${singerId}`
      });
    }
  }
};
</script>
<style>
.search_result_song_item {
    display: flex;
    text-align: left;
    padding: 10px;
}
.search_result_song_item img {
    width: 40px;
    height: 40px;
    vertical-align: middle;
}
.songer_index_box {
    display: flex;
    justify-items: center;
    margin-right: 5px;
}
.songer_index_box span {
    display: inline-block;
    line-height: 40px;
    margin-right: 5px;
    vertical-align: middle;
}
</style>

