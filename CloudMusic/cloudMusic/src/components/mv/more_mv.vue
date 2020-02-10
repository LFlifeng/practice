<template>
  <div class="songsheet_items_allbox newsong_allbox">
    <span class="songsheet_container_title">MV</span>
    <div class="songsheet_items_box">
      <div
        class="songsheet_item_box"
        v-for="(item,i) in mv"
        :key="i"
        :data-id="item.id"
        style="width:50%;"
        @click="handlePlayMv(item.id)"
      >
        <img :src="item.cover" class="songsheet_container_image">
        <span class="songsheet_container_text newsong_songname">{{item.name}}</span>
        <span class="newsong_artists">{{item.artistName}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mv: [] ,//MV,
    };
  },
  created() {
    this.getNewMv();
  },
  methods: {
    getNewMv() {
      this.$axios
        .get(`http://localhost:3000/mv/first?limit=16`, {})
        .then(res => {
          if (res.data.code === 200) {
            this.mv = res.data.data;
          }
        });
    },
    handlePlayMv(id) {
      const mvId = id;
      this.$router.push({
        path: `/play_mv?id=${mvId}`
      });
    }
  }
};
</script>
<style>
</style>

