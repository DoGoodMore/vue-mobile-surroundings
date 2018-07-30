<template>
  <Scroller :ref="`playsScroll`"
            class="lottery-plays-scroll"
            lock-x
            scrollbar-y
            :height="collecting ? '-403px' : '-262px'">
    <div class="k3-hzds-box">
      <div class="k3-hzds-item">
        <p>3点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>4点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>5点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>6点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>7点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>8点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>9点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>10点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>11点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>12点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>13点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>14点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>15点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>16点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>17点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>18点</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>大</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>小</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>单</p>
        <div>0.00</div>
      </div>
      <div class="k3-hzds-item">
        <p>双</p>
        <div>0.00</div>
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
    name: 'hzds'
  }
</script>

<style scoped>
.k3-hzds-box {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.k3-hzds-item {
  flex-basis: 17%;
  border-radius: 5px;
  text-align: center;
  border: .5px solid #dd606f;
  box-sizing: border-box;
  height: 50px;
  margin: 15px 5px 0 4px;
}
.k3-hzds-item > div {
  color: #606060;
}
</style>
