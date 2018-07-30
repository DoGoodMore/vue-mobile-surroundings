<template>
  <flexbox :gutter="0" :align="'flex-start'" class="content">
    <flexbox-item :span="3">
      <Scroller :ref="`playsScroll`"
                class="lottery-plays-scroll"
                lock-x
                scrollbar-y
                :height="collecting ? '-403px' : '-262px'">
        <ul class="lottery-plays">
          <li v-for="(item,index) in sscTabList"
              :class="{active: playIndex === index}"
              @click="changeRanking(item.id, index)">
            {{item.label}}
          </li>
        </ul>
      </Scroller>
    </flexbox-item>
    <flexbox-item :span="9">
      <!--<spinner class="spinner-loading" type="bubbles" size="80px" v-show="!playGroupList.length"></spinner>
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
                          :class="isNumber(item.showName)?`pk10-mid-ball pk10-ball-${item.showName}`:''">{{isNumber(item.showName) ? '' : item.showName}}</span>
                      <span class="odds">{{item.ruleOdds}}</span>
                      <i class="icon"></i>
                    </div>
                  </flexbox-item>
                </flexbox>
              </template>
            </div>
          </Scroller>
        </swiper-item>
      </swiper>-->
      <Scroller :ref="`playGroupScroll`"
                lock-x
                scrollbar-y
                :height="collecting ? '-403px' : '-262px'">
        <div class="ssc-kj-box">
          <div class="ssc-kj-item">
            <div>
              1
            </div>
            <p>0.00</p>
          </div>
          <div class="ssc-kj-item">
            <div>
              2
            </div>
            <p>0.00</p>
          </div>
          <div class="ssc-kj-item">
            <div>
              3
            </div>
            <p>0.00</p>
          </div>
          <div class="ssc-kj-item">
            <div>
              4
            </div>
            <p>0.00</p>
          </div>
          <div class="ssc-kj-item">
            <div>
              5
            </div>
            <p>0.00</p>
          </div>
          <div class="ssc-kj-item">
            <div>
              6
            </div>
            <p>0.00</p>
          </div>
          <div class="ssc-kj-item">
            <div>
              7
            </div>
            <p>0.00</p>
          </div>
          <div class="ssc-kj-item">
            <div>
              8
            </div>
            <p>0.00</p>
          </div>
          <div class="ssc-kj-item">
            <div>
              9
            </div>
            <p>0.00</p>
          </div>
          <div class="ssc-kj-item">
            <div>
              10
            </div>
            <p>0.00</p>
          </div>
          <div class="ssc-kj-item-big">
            <div class="ssc-kj-item-inner">
              <div class="ssc-kj-item-inner-item">
                <div>
                  大
                </div>
                <p>0.00</p>
              </div>
              <div class="ssc-kj-item-inner-item">
                <div>
                  小
                </div>
                <p>0.00</p>
              </div>
              <div class="ssc-kj-item-inner-item">
                <div>
                  单
                </div>
                <p>0.00</p>
              </div>
              <div class="ssc-kj-item-inner-item">
                <div>
                  双
                </div>
                <p>0.00</p>
              </div>
            </div>
          </div>
        </div>
      </Scroller>
    </flexbox-item>
  </flexbox>
</template>

<script>
  import { Flexbox, FlexboxItem, Swiper, SwiperItem, Scroller, Spinner } from 'vux'
  import { lotteryMixin } from 'common/js/mixin'
  export default {
    name: 'kj',
    mixins: [lotteryMixin],
    components: {
      Flexbox,
      FlexboxItem,
      Scroller,
      Swiper,
      SwiperItem,
      Spinner
    },
    data () {
      return {
        sscTabList: [
          { label: '第一球', value: 1 },
          { label: '第二球', value: 2 },
          { label: '第三球', value: 3 },
          { label: '第四球', value: 4 },
          { label: '第五球', value: 5 }
        ]
      }
    },
    methods: {
      changeRanking (id, index) {
        this.playGroupList = []
        this.playIndex = index
      }
    }
  }
</script>

<style scoped>
.ssc-kj-box, .ssc-kj-item-inner {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.ssc-kj-item, .ssc-kj-item-big, .ssc-kj-item-inner-item {
  flex-basis: 22%;
  box-sizing: border-box;
  text-align: center;
  margin: 12px 3px 0 4px;
}
.ssc-kj-item-inner-item {
  border: 1px solid #d53b4e;
  height: 45px;
  border-radius: 6px;
}
.ssc-kj-item-inner-item > div {
  font-size: 17px;
  line-height: 1.5;
  font-weight: 600;
}
.ssc-kj-item-inner-item > p {
  line-height: 1;
  font-size: 14px;
  color: #606060;
}
.ssc-kj-item-big {
  flex-basis: 100%;
  height: auto;
}
.ssc-kj-item > div {
  width: 50px;
  margin: 0 auto;
  border-radius: 50%;
  height: 50px;
  border: 1px solid #d53b4e;
  font-weight: bold;
  color: #d53b4e;
  line-height: 50px;
  text-align: center;
}
.ssc-kj-item > p {
  color: #606060;
}
</style>
