<template>
  <div class="content-wrapper">
    <lottery-timer ref="drawTimer"></lottery-timer>
    <game-collecting @on-show="onCollectingShow" @on-hide="onCollectingHide"></game-collecting>
    <div class="k3-tabs-wrapper">
      <Scroller :ref="`tabsScroll`"
                lock-y
                scrollbar-x
                style=" width: 90%; ">
        <div :style="{ width: `${k3Jsks.length * 87}px` }"
             class="clear-fix">
          <div v-for="(tab, index) in k3Jsks"
               class="k3-tab-item"
               :key="tab.value">
            <a class="k3-tabs-link"
               :class="{ 'now-hov': nowHoverMenu === index }"
               @click="changeK3Tab(tab, index)"
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
           :style="{ height: `${showAllTab ? Math.ceil( k3Jsks.length / 4 ) * 57 + 10 : 0}px` }">
        <div class="all-tab-item"
             :key="tab.value"
             v-for="(tab, index) in k3Jsks">
          <a class="k3-tabs-link"
             :class="{ 'now-hov': nowHoverMenu === index }"
             @click="changeK3Tab(tab, index)"
             href="javascript:;">{{tab.label}}</a>
        </div>
      </div>
    </div>
    <!--<flexbox :gutter="0" :align="'flex-start'" class="content">
      <flexbox-item :span="3">
        <Scroller ref="playsScroll" class="lottery-plays-scroll" lock-x scrollbar-y
                  :height="collecting?'-357px': '-216px'">
          <ul class="lottery-plays">
            <li>玩法选择</li>
            <li v-for="(item,index) in playList" :class="{active:playIndex===index}"
                @click="_onPlayClick(item.id,index)">
              {{item.ruleMasterName}}
            </li>
          </ul>
        </Scroller>
      </flexbox-item>
      <flexbox-item :span="9">
        <spinner class="spinner-loading" type="bubbles" size="80px" v-show="!playGroupList.length"></spinner>
        <swiper :show-dots="false" :height="height">
          <swiper-item>
            <Scroller ref="playGroupScroll" class="play-group-scroll" lock-x scrollbar-y
                      :height="collecting?'-357px': '-216px'">
              <div>
                <template v-for="(group,x) in playGroupList">
                  <flexbox :wrap="'wrap'" :align="'flex-start'" :gutter="0">
                    <flexbox-item class="play-group-title">
                      <div class="title">{{group.ruleMasterName}}</div>
                    </flexbox-item>
                  </flexbox>
                  <flexbox :wrap="'wrap'" :align="'flex-start'" :gutter="0">
                    <flexbox-item :span="6" class="play-group-item" v-waves
                                  v-for="(item) in group.gameRuleDetailList" :key="item.id"
                                  :class="{selected:isSelected(item.id)}">
                      <div v-if="item.renderName.length >= 3" class="item flex-12" @click="handleBet(group.ruleMasterName,item)">
                        <template v-if="isArray(item.renderName)">
                          <span v-for="(items,index) in item.renderName" class="happyThree" :class="`happyThree${items}`"></span>
                        </template>
                        <template v-else>
                           <span class="lottery-prop">{{item.renderName}}</span>
                        </template>
                        <span class="odds">{{item.ruleOdds}}</span>
                        <i class="icon"></i>
                      </div>
                      <div v-else class="item " @click="handleBet(group.ruleMasterName,item)">
                        <template v-if="isArray(item.renderName)">
                          <span v-for="(items,index) in item.renderName" class="happyThree" :class="`happyThree${items}`"></span>
                        </template>
                        <template v-else>
                           <span class="lottery-prop">{{item.renderName}}</span>
                        </template>
                        <span class="odds">{{item.ruleOdds}}</span>
                        <i class="icon"></i>
                      </div>
                    </flexbox-item>
                  </flexbox>
                </template>
              </div>
            </Scroller>
          </swiper-item>
        </swiper>
      </flexbox-item>
    </flexbox>-->
    <router-view></router-view>
    <foot-bars></foot-bars>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Swiper, SwiperItem, Scroller, Spinner } from 'vux'
  import LotteryTimer from 'components/lottery-timer/lottery-timer'
  import { isNumber, isArray } from 'common/js/util'
  import FootBars from 'components/foot-bars/foot-bars'
  import { getLotteryPlays, getPlayGroups } from 'api/credit/credit'
  import { ERR_OK } from 'api/config'
  import GameCollecting from 'components/game-collecting/game-collecting'
  import {lotteryMixin} from 'common/js/mixin'
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
      isArray,
      changeK3Tab (tab, index) {
        const { gameCode, gameId, gameName, groupId } = this.$route.params
        this.nowHoverMenu = index
        this.$router.push(`/game/k3/${tab.value}/${groupId}/${gameId}/${gameCode}/${gameName}`)
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
        this.setGroupCode('k3')
        this.setStopBet({stopBet: false})
        const obj = this.isStopSell('k3', gameCode)
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
            this.playGroupList = this.parseData(currentData)
            this.$nextTick(function () {
              // this.$refs.playGroupScroll.reset({top: 0})
            })
          }
        }).catch(() => {
        })
      },
      parseData: function (arr) {
        function compare (property) {
          return function (a, b) {
            let value1 = a[property]
            let value2 = b[property]
            return value1 - value2
          }
        }

        for (let x = 0; x < arr.length; x++) {
          if (arr[x].gameRuleDetailList && arr[x].gameRuleDetailList.length > 0) {
            let numArr = []
            let charArr = []
            for (let y = 0; y < arr[x].gameRuleDetailList.length; y++) {
              let name = arr[x].gameRuleDetailList[y].showName
              if (isNumber(name)) {
                arr[x].gameRuleDetailList[y].showName = name
                arr[x].gameRuleDetailList[y].renderName = name.split('')
                numArr.push(arr[x].gameRuleDetailList[y])
              } else {
                arr[x].gameRuleDetailList[y].showName = name
                arr[x].gameRuleDetailList[y].renderName = name
                charArr.push(arr[x].gameRuleDetailList[y])
              }
            }
            arr[x].gameRuleDetailList = numArr.sort(compare('showName')).concat(charArr)
          }
        }
        return arr
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

<style lang="less" scoped>
.flex-12 .happyThree{
    width: 1.2rem;
    height: 1.2rem;
}
.flex-12 .odds{
    font-size: 12px !important;
}
.k3-tabs-wrapper {
  height: 46px;
  padding: 5px 25px;
  background-color: #f5f6f7;
  width: 100%;
  box-sizing: border-box;
}
.k3-tabs-link {
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
  float: right;
}
.now-hov {
  color: #d53b4e;
  border: 1.4px solid #d53b4e;
}




  /*-----------------*/

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
.k3-tab-item {
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
.k3-tabs-link {
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
.k3-tabs-wrapper {
  height: 46px;
  position: relative;
  padding: 5px 25px;
  background-color: #f5f6f7;
  width: 100%;
  box-sizing: border-box;
}
.k3-tabs-link {
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
