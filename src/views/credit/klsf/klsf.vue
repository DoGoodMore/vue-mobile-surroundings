<template>
  <div class="content-wrapper">
    <lottery-timer ref="drawTimer"></lottery-timer>
    <game-collecting @on-show="onCollectingShow" @on-hide="onCollectingHide"></game-collecting>
    <flexbox :gutter="0" :align="'flex-start'" class="content">
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
                                  v-for="(item,y) in group.gameRuleDetailList" :key="item.id"
                                  :class="{selected:isSelected(item.id)}">
                      <div class="item" @click="handleBet(group.ruleMasterName,item)">
                        <span class="text"
                              :class="item.type === 'number'? `mid-ball klsf-ball-${item.showName}`: ''">{{item.showName}}</span>
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
    </flexbox>
    <foot-bars></foot-bars>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Swiper, SwiperItem, Scroller, Spinner } from 'vux'
  import LotteryTimer from 'components/lottery-timer/lottery-timer'
  import { isNumber } from 'common/js/util'
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
    methods: {
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
        this.setGroupCode('klsf')
        this.setStopBet({stopBet: false})
        const obj = this.isStopSell('klsf', gameCode)
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
              this.$refs.playGroupScroll.reset({top: 0})
            })
          }
        }).catch(() => {
        })
      },
      parseData: function (arr) {
        for (let x = 0; x < arr.length; x++) {
          if (arr[x].gameRuleDetailList && arr[x].gameRuleDetailList.length > 0) {
            let numArr = []
            let charArr = []
            for (let y = 0; y < arr[x].gameRuleDetailList.length; y++) {
              const item = arr[x].gameRuleDetailList[y]
              if (isNumber(item.showName)) {
                item.type = 'number'
                numArr.push(item)
              } else {
                item.type = 'string'
                charArr.push(item)
              }
            }
            arr[x].gameRuleDetailList = numArr.concat(charArr)
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
</style>
