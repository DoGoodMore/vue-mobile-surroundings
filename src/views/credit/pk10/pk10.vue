<template>
  <div class="content-wrapper">
    <lottery-timer :ref="`drawTimer`"></lottery-timer>
    <game-collecting @on-show="onCollectingShow" @on-hide="onCollectingHide"></game-collecting>
    <div class="pk10-tabs-wrapper">
      <Scroller :ref="`tabsScroll`"
                lock-y
                scrollbar-x
                style=" width: 90%; ">
        <div :style="{ width: `${pk10TabsArr.length * 87}px` }"
             class="clear-fix">
          <div v-for="(tab, index) in pk10TabsArr"
               class="pk10-tab-item"
               :key="tab.value">
            <a class="pk10-tabs-link"
               :class="{ 'now-hov': nowHoverMenu === index }"
               @click="changePk10Tab(tab, index)"
               href="javascript:;">{{tab.label}}</a>
          </div>
        </div>
      </Scroller>
      <a class="look-all"
         @click="showAllTab = !showAllTab"
         href="javascript:;">
        <img class="pk10-tab-icon"
             :style="{ transform: `rotate(${ showAllTab ? 0 : 180}deg)` }"
             :src="pk10TabIcon"
             alt="icon"></a>
      <div class="all-tabs"
           :style="{ height: `${showAllTab ? Math.ceil( pk10TabsArr.length / 4 ) * 57 + 10 : 0}px` }">
        <div class="all-tab-item"
             :key="tab.value"
             v-for="(tab, index) in pk10TabsArr">
          <a class="pk10-tabs-link"
             :class="{ 'now-hov': nowHoverMenu === index }"
             @click="changePk10Tab(tab, index)"
             href="javascript:;">{{tab.label}}</a>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <foot-bars></foot-bars>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Swiper, SwiperItem, Scroller, Spinner } from 'vux'
  import LotteryTimer from 'components/lottery-timer/lottery-timer'
  import FootBars from 'components/foot-bars/foot-bars'
  import { getLotteryPlays, getPlayGroups } from 'api/credit/credit'
  import { ERR_OK } from 'api/config'
  import GameCollecting from 'components/game-collecting/game-collecting'
  import { lotteryMixin } from 'common/js/mixin'
  import { isNumber } from 'common/js/util'
  export default {
    mixins: [lotteryMixin],
    components: {
      Swiper,
      SwiperItem,
      Flexbox,
      FlexboxItem,
      LotteryTimer,
      FootBars,
      Scroller,
      Spinner,
      GameCollecting
    },
    data () {
      return {
        showAllTab: false
      }
    },
    methods: {
      isNumber,
      changePk10Tab (tab, index) {
        const { gameCode, gameId, gameName, groupId } = this.$route.params
        this.nowHoverMenu = index
        this.$router.push(`/game/pk10/${tab.value}/${groupId}/${gameId}/${gameCode}/${gameName}`)
      },
      _onPlayClick (playId, index) {
        this.playGroupList = []
        this.playIndex = index
        this._getPlayGroups(playId)
      },
      _initParams ({groupId, gameId, gameCode, gameName}) {
        this.setHeaderTitle(gameName)
        this.setLotteryId(gameId)
        this.setLotteryCode(gameCode)
        this.setLotteryName(gameName)
        this.setGroupId(groupId)
        this.setGroupCode('pk10')
        this.setStopBet({stopBet: false})
        const obj = this.isStopSell('pk10', gameCode)
        this.setStopSell({stopSell: obj.isStopSell})
        this.setLotteryRule(obj.ruleContent)

        this.$refs['drawTimer']._initTimer({
          lotteryGroupId: groupId,
          lotteryId: gameId,
          stopSell: obj.isStopSell
        })

        this._getGamePlays(gameId)
      },
      _getGamePlays (gameId) {
        getLotteryPlays({lotteryGameId: gameId}).then(response => {
          const {currentStatus, currentData} = response
          if (currentStatus === ERR_OK && currentData.length) {
            this.playList = currentData
            this._onPlayClick(currentData[0].id, 0)
          } else {
          }
        }).catch(() => {
        })
      },
      _getPlayGroups (playId) {
        getPlayGroups({masterId: playId}).then(response => {
          const {currentStatus, currentData} = response
          if (currentStatus === ERR_OK) {
            this.playGroupList = currentData
            this.$nextTick(function () {
              /*eslint-disable*/
              //this.$refs.playGroupScroll.reset({top: 0})
            })
          }
        }).catch(() => {
        })
      }
    },
    watch: {
      $route (to, from) {
        if (to.path !== from.path) {
          this._initParams(to.params)
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      if (!from.path) return false
      next(vm => {
        vm._initParams(to.params)
      })
    }
  }
</script>

<style scoped>

.all-tabs {
  position: absolute;
  transition: height .3s ease-in-out;
  overflow: hidden;
  left: 0;
  background-color: #f5f6f7;
  z-index: 6;
  width: 100%;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
  justify-content: center;
  flex-wrap: wrap;
}
.clear-fix::after {
  content: '';
  display: block;
  clear: both;
}
.pk10-tab-item {
  float: left;
  box-sizing: border-box;
  width: 87px;
}

.all-tab-item {
  flex-basis: 22%;
  box-sizing: border-box;
  height: 46px;
  border-radius: 4px;
  text-align: center;
  margin: 11px 4px 0 5px;
}
.pk10-tabs-link {
  box-sizing: border-box;
  display: inline-block;
  float: left;
  text-align: center;
  width: 100%;
  border-radius: 6px;
  line-height: 2.5;
  height: 100%;
  color: #606060;
  font-size: 14px;
}
.look-all {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 25px;
}
.pk10-tabs-wrapper {
  height: 46px;
  position: relative;
  padding: 5px 25px;
  background-color: #f5f6f7;
  width: 100%;
  box-sizing: border-box;
}
.pk10-tabs-link {
  box-sizing: border-box;
  display: inline-block;
  float: left;
  text-align: center;
  width: 100%;
  border-radius: 6px;
  line-height: 2.5;
  height: 100%;
  color: #606060;
  font-size: 14px;
}
.pk10-tab-icon {
  width: 16px;
  transition: transform .3s ease-in-out;
  float: right;
}
.now-hov {
  color: #d53b4e;
  border: 1.4px solid #d53b4e;
}
</style>
