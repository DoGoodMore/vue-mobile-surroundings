<template>
  <Scroller :ref="`playsScroll`"
            class="lottery-plays-scroll"
            lock-x
            scrollbar-y
            :height="collecting ? '-403px' : '-262px'">
    <div class="pk10-gyh-box">
      <div style="background-color: #4c4d51;border: 1px solid #424346;" class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #fff;text-stroke: 1px #000;margin-bottom: .5px;">3</p>
        <div style="font-size: 15px;font-weight: bold;color: #fff;text-stroke: 1px #000;">0.00</div>
      </div>
      <div style="background-color: #ec7800;border: 1px solid #774410;" class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #fff;text-stroke: 1px #000;margin-bottom: .5px;">4</p>
        <div style="font-size: 15px;font-weight: bold;color: #fff;text-stroke: 1px #000;">0.00</div>
      </div>
      <div style="background-color: #9df9fa;border: 1px solid #547d7d;" class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #fff;text-stroke: 1px #000;margin-bottom: .5px;">5</p>
        <div style="font-size: 15px;font-weight: bold;color: #fff;text-stroke: 1px #000;">0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #4615ff;text-stroke: 1px #000;margin-bottom: .5px;">6</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #93278f;text-stroke: 1px #000;margin-bottom: .5px;">7</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #d40000;text-stroke: 1px #000;margin-bottom: .5px;">8</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #710000;text-stroke: 1px #000;margin-bottom: .5px;">9</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #4ac600;text-stroke: 1px #000;margin-bottom: .5px;">10</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #fcee21;text-stroke: 1px #000;margin-bottom: .5px;">11</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #338cfc;text-stroke: 1px #000;margin-bottom: .5px;">12</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #4c4d51;text-stroke: 1px #000;margin-bottom: .5px;">13</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #ec7800;text-stroke: 1px #000;margin-bottom: .5px;">14</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #9df9fa;text-stroke: 1px #000;margin-bottom: .5px;">15</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #4615ff;text-stroke: 1px #000;margin-bottom: .5px;">16</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #93278f;text-stroke: 1px #000;margin-bottom: .5px;">17</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #d40000;text-stroke: 1px #000;margin-bottom: .5px;">18</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item">
        <p style="font-weight: bold;font-size: 30px;line-height: 1;font-style: italic;color: #710000;text-stroke: 1px #000;margin-bottom: .5px;">19</p>
        <div>0.00</div>
      </div>
      <div class="pk10-gyh-item-ranking">
        <div>
          <div class="pk10-gyh-item-ranking-item">
            <p>冠亚大</p>
            <div>0.00</div>
          </div>
          <div class="pk10-gyh-item-ranking-item">
            <p>冠亚小</p>
            <div>0.00</div>
          </div>
          <div class="pk10-gyh-item-ranking-item">
            <p>冠亚单</p>
            <div>0.00</div>
          </div>
          <div class="pk10-gyh-item-ranking-item">
            <p>冠亚双</p>
            <div>0.00</div>
          </div>
        </div>
      </div>
    </div>
  </Scroller>
</template>

<script>
  import { Scroller } from 'vux'
  import { lotteryMixin } from 'common/js/mixin'
  export default {
    components: { Scroller },
    mixins: [lotteryMixin],
    name: 'gyh'
  }
</script>

<style scoped>
.pk10-gyh-box {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.pk10-gyh-item-ranking {
  box-sizing: border-box;
  flex-basis: 100%;
  margin-top: 15px;
}
.pk10-gyh-item-ranking > div {
  width: 100%;
  display: flex;
}
.pk10-gyh-item {
  flex-basis: 17%;
  border-radius: 5px;
  text-align: center;
  border: .5px solid #dd606f;
  box-sizing: border-box;
  height: 50px;
  margin: 15px 5px 0 4px;
}
.pk10-gyh-item-ranking-item {
  flex-basis: 22%;
  box-sizing: border-box;
  height: 50px;
  border: .5px solid #e27886;
  border-radius: 4px;
  text-align: center;
  margin: 11px 6px 0 6px;
}
.pk10-gyh-item > div {
  line-height: 1;
}
</style>
