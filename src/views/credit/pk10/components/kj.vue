<template>
    <div>
      <flexbox :gutter="0" :align="'flex-start'" class="content">
        <flexbox-item :span="3">
          <Scroller :ref="`playsScroll`"
                    class="lottery-plays-scroll"
                    lock-x
                    scrollbar-y
                    :height="collecting ? '-403px' : '-262px'">
            <!--<ul class="lottery-plays">
              <li>玩法选择</li>
              <li v-for="(item,index) in playList" :class="{active:playIndex===index}"
                  @click="_onPlayClick(item.id,index)">
                {{item[ `ruleMasterName` ]}}
              </li>
            </ul>-->
            <ul class="lottery-plays">
              <li v-for="(item,index) in rankingList"
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
          <Scroller :ref="`playsScroll`"
                    lock-x
                    scrollbar-y
                    :height="collecting ? '-403px' : '-262px'">
            <ul class="clear-fix pk10-kj-item-box">
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fcee21;border: 1px solid rgba(0, 0, 0, .7);line-height: 1;color: #ffffff;text-stroke: .5px #000;font-weight: bold;">
                <p style="text-align: center;font-size: 30px;margin-bottom: .5px;font-style: italic;">1</p>
                <div style="font-size: 12px;font-weight: 900;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #338cfc;border: 1px solid #1f579d;line-height: 1;color: #ffffff;text-stroke: .5px #000;font-weight: bold;">
                <p style="text-align: center;font-size: 30px;margin-bottom: .5px;font-style: italic;">2</p>
                <div style="font-size: 12px;font-weight: 900;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #4c4d51;border: 1px solid #313133;line-height: 1;color: #ffffff;text-stroke: .5px #000;font-weight: bold;">
                <p style="text-align: center;font-size: 30px;margin-bottom: .5px;font-style: italic;">3</p>
                <div style="font-size: 12px;font-weight: 900;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;font-weight: bold;">
                <p style="text-align: center;text-stroke: .5px #000;color: #ec7800;font-size: 30px;margin-bottom: .5px;font-style: italic;">4</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;font-weight: bold;">
                <p style="text-align: center;text-stroke: .5px #000;color: #9df9fa;font-size: 30px;margin-bottom: .5px;font-style: italic;">5</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;font-weight: bold;">
                <p style="text-align: center;text-stroke: .5px #000;color: #4615ff;font-size: 30px;margin-bottom: .5px;font-style: italic;">6</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;font-weight: bold;">
                <p style="text-align: center;text-stroke: .5px #000;color: #93278f;font-size: 30px;margin-bottom: .5px;font-style: italic;">7</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;font-weight: bold;">
                <p style="text-align: center;text-stroke: .5px #000;color: #d40000;font-size: 30px;margin-bottom: .5px;font-style: italic;">8</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;font-weight: bold;">
                <p style="text-align: center;text-stroke: .5px #000;color: #710000;font-size: 30px;margin-bottom: .5px;font-style: italic;">9</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;font-weight: bold;">
                <p style="text-align: center;text-stroke: .5px #000;color: #4ac600;font-size: 30px;margin-bottom: .5px;font-style: italic;">10</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;">
                <p style="text-align: center;text-stroke: .5px #000;color: #000;font-size: 25px;margin-bottom: 5.5px;">龙</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;">
                <p style="text-align: center;text-stroke: .5px #000;color: #000;font-size: 25px;margin-bottom: 5.5px;">虎</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;">
                <p style="text-align: center;text-stroke: .5px #000;color: #000;font-size: 25px;margin-bottom: 5.5px;">大</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;">
                <p style="text-align: center;text-stroke: .5px #000;color: #000;font-size: 25px;margin-bottom: 5.5px;">小</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;">
                <p style="text-align: center;text-stroke: .5px #000;color: #000;font-size: 25px;margin-bottom: 5.5px;">单</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
              <li style="font-family: 'Microsoft YaHei UI';background-color: #fff;border: 1px solid #d53b4e;line-height: 1;color: #ffffff;">
                <p style="text-align: center;text-stroke: .5px #000;color: #000;font-size: 25px;margin-bottom: 5.5px;">双</p>
                <div style="font-size: 12px;font-weight: 900;color: #000;text-align: center;">0.00</div>
              </li>
            </ul>
          </Scroller>
        </flexbox-item>
      </flexbox>
    </div>
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
    methods: {
      changeRanking (id, index) {
        this.playGroupList = []
        this.playIndex = index
      }
    }
  }
</script>

<style scoped>
.clear-fix::after {
  content: '';
  display: block;
  clear: both;
}
.pk10-kj-item-box {

}
.pk10-kj-item-box li {
  list-style: none;
  box-sizing: border-box;
  border: .5px solid rgba(0, 0, 0, .8);
  float: left;
  padding-top: 5px;
  font-size: 28px;
  width: 20%;
  margin-left: 4%;
  height: 55px;
  background-color: red;
  border-radius: 3px;
  margin-top: 15px;
}
</style>
