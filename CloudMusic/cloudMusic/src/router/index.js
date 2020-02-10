import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import more_mv from '@/components/mv/more_mv'
import play_mv from '@/components/mv/play_mv'
import more_song from '@/components/song/more_song'
import mmore_song from '@/components/song/mmore_song'
import play from '@/components/song/play'
import singerList from '@/components/singer/singerList'
import singerSong from '@/components/singer/singerSong'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        // {
        //   path: '/play_mv',
        //   name: 'play_mv',
        //   component: play_mv,
        // }
      ]
    }, {
      path: '/more_mv',
      name: 'more_mv',
      component: more_mv,
      children: [
        // {
        //   path: '/play_mv',
        //   name: 'play_mv',
        //   component: play_mv,
        // }
      ]
    },{
      path: '/play_mv',
      name: 'play_mv',
      component: play_mv,
    },{
      path: '/more_song',
      name: 'more_song',
      component: more_song,
      children: [
        
      ]
    },{
      path: '/mmore_song',
      name: 'mmore_song',
      component: mmore_song,
      children: [
        
      ]
    },{
      path: '/play',
      name: 'play',
      component: play,
    },{
      path: '/singerList',
      name: 'singerList',
      component: singerList,
    }
    ,{
      path: '/singerSong',
      name: 'singerSong',
      component: singerSong,
    }
  ]
});
export default router;
