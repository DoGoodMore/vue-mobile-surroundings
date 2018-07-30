<template>
  <div style="box-sizing: border-box;padding-top: 10px;">
    <Scroller :ref="`playsScroll`"
              lock-x
              scrollbar-y
              :height="collecting ? '-403px' : '-262px'">
      <h3 class="pk10-lm-title">冠军</h3>
      <div class="pk10-lm-gyh">
        <div class="pk10-lm-gyh-item">
          <p>大</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>小</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>单</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>双</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>龙</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>虎</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>虎</p>
          <div>0.00</div>
        </div>
      </div>

      <h3 class="pk10-lm-title">冠亚和</h3>
      <div class="pk10-lm-gyh">
        <div class="pk10-lm-gyh-item">
          <p>冠亚大</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>冠亚小</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>冠亚单</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>冠亚双</p>
          <div>0.00</div>
        </div>
      </div>


      <h3 class="pk10-lm-title">亚军</h3>
      <div class="pk10-lm-gyh">
        <div class="pk10-lm-gyh-item">
          <p>大</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>小</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>单</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>双</p>
          <div>0.00</div>
        </div>
      </div>

      <h3 class="pk10-lm-title">亚军</h3>
      <div class="pk10-lm-gyh">
        <div class="pk10-lm-gyh-item">
          <p>大</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>小</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>单</p>
          <div>0.00</div>
        </div>
        <div class="pk10-lm-gyh-item">
          <p>双</p>
          <div>0.00</div>
        </div>
      </div>

    </Scroller>

  </div>
</template>

<script>
  import { Scroller } from 'vux'
  import { lotteryMixin } from 'common/js/mixin'
  export default {
    mixins: [lotteryMixin],
    components: { Scroller },
    name: 'lm'
  }
</script>

<style scoped>
  .pk10-lm-gyh {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .pk10-lm-gyh-item {
    flex-basis: 22%;
    box-sizing: border-box;
    height: 50px;
    border: .5px solid #e27886;
    border-radius: 4px;
    text-align: center;
    margin: 11px 4px 0 5px;
  }
  .pk10-lm-gyh-item > p {
    line-height: 1.7;
    font-weight: 500;
  }
  .pk10-lm-gyh-item > div {
    line-height: 1;
    color: #606060;
  }
  .pk10-lm-title {
    font-size: 15px;
    color: #d53b4e;
    text-align: center;
  }
</style>
