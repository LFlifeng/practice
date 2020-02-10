<template>
  <div class="songsheet_items_allbox newsong_allbox">
    <span class="songsheet_container_title">歌单</span>
    <div class="songsheet_items_box">
      <div
        class="songsheet_item_box"
        v-for="(item,i) in songSheet"
        :key="i"
        :data-id="item.id"
        style="width:50%;"
        @click="handleSongList(item.id)"
      >
        <img :src="item.coverImgUrl" class="songsheet_container_image">
        <span class="songsheet_container_text newsong_songname">{{item.name}}</span>
        <!-- <span class="newsong_artists">{{item.artistName}}</span> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      songSheet: [] ,//,
    };
  },
  created() {
    this.getNewSong();
  },
  methods: {
    getNewSong() {
      this.$axios
        .get(`http://localhost:3000/top/playlist`, { order: "hot" })
        .then(res => {
          if (res.data.code === 200) {
            this.songSheet = res.data.playlists;
          }
        });
    },
    handleSongList(id) {
      const songListId = id;
      this.$router.push({
        path: `/mmore_song?id=${songListId}`
      });
    }
  }
};
</script>
<style>
</style>

