<template>
    <div class="search_result_songs">
        <div
            class="search_result_song_item songer_box"
            v-for="(item,i) in songList"
            :key="i"
            :data-id="item.id"
            @click="handlePlaySong(item.id)"
        >
            <div class="songer_index_box">
                <span class="songer_index">{{i + 1}}</span>
            </div>
            <div class="songer_img_box">
                <div class="search_result_song_song_name">{{item.name}}</div>
                <div class="search_result_song_song_art-album">{{item.ar[0].name}} - {{item.al.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      songList: [] //,
    };
  },
  created() {
    this.getSongList();
  },
  methods: {
    getSongList() {
      var id = this.$route.query.id; //获取URL中的参数
      this.$axios
        .get(`http://localhost:3000/artists?id=${id}`, {})
        .then(res => {
          if (res.data.code === 200) {
            this.songList = res.data.hotSongs;
          }
        });
        localStorage.setItem('id',id)
    },
    handlePlaySong(id) {
      const songId = id;
      this.$router.push({
        path: `/play?id=${songId}`
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


