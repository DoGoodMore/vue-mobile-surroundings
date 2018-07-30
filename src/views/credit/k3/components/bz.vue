<template>
  <Scroller :ref="`playsScroll`"
            class="lottery-plays-scroll"
            lock-x
            scrollbar-y
            :height="collecting ? '-403px' : '-262px'">
    <div class="k3-bz-box">
      <div class="k3-bz-item">
        <span class="dice">
          <img :src="dice1" alt="dice-1">
        </span>
        <span class="dice">
          <img :src="dice1" alt="dice-1">
        </span>
        <span class="dice">
          <img :src="dice1" alt="dice-1">
        </span>
        <p>0.00</p>
      </div>
      <div class="k3-bz-item">
        <span class="dice">
          <img :src="dice2" alt="dice-2">
        </span>
        <span class="dice">
          <img :src="dice2" alt="dice-2">
        </span>
        <span class="dice">
          <img :src="dice2" alt="dice-2">
        </span>
        <p>0.00</p>
      </div>
      <div class="k3-bz-item">
        <span class="dice">
          <img :src="dice3" alt="dice-3">
        </span>
        <span class="dice">
          <img :src="dice3" alt="dice-3">
        </span>
        <span class="dice">
          <img :src="dice3" alt="dice-3">
        </span>
        <p>0.00</p>
      </div>
      <div class="k3-bz-item">
        <span class="dice">
          <img :src="dice4" alt="dice-4">
        </span>
        <span class="dice">
          <img :src="dice4" alt="dice-4">
        </span>
        <span class="dice">
          <img :src="dice4" alt="dice-4">
        </span>
        <p>0.00</p>
      </div>
      <div class="k3-bz-item">
        <span class="dice">
          <img :src="dice5" alt="dice-5">
        </span>
        <span class="dice">
          <img :src="dice5" alt="dice-5">
        </span>
        <span class="dice">
          <img :src="dice5" alt="dice-5">
        </span>
        <p>0.00</p>
      </div>
      <div class="k3-bz-item">
        <span class="dice">
          <img :src="dice6" alt="dice-6">
        </span>
        <span class="dice">
          <img :src="dice6" alt="dice-6">
        </span>
        <span class="dice">
          <img :src="dice6" alt="dice-6">
        </span>
        <p>0.00</p>
      </div>
      <div class="k3-bz-big-item">
        <p>全骰</p>
        <div>0.00</div>
      </div>
    </div>
  </Scroller>
</template>

<script>
  import dice1 from '@/assets/dice-1.jpg'
  import dice2 from '@/assets/dice-2.jpg'
  import dice3 from '@/assets/dice-3.jpg'
  import dice4 from '@/assets/dice-4.jpg'
  import dice5 from '@/assets/dice-5.jpg'
  import dice6 from '@/assets/dice-6.jpg'
  import { Scroller } from 'vux'
  import { lotteryMixin } from 'common/js/mixin'
  export default {
    components: { Scroller },
    mixins: [lotteryMixin],
    name: 'bz',
    data () {
      return {
        dice1: dice1,
        dice2: dice2,
        dice3: dice3,
        dice4: dice4,
        dice5: dice5,
        dice6: dice6
      }
    }
  }
</script>

<style scoped>
.k3-bz-box {
  display: flex;
  margin-top: 19px;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.k3-bz-item {
  flex-basis: 45%;
  position: relative;
  border-radius: 1px;
  border: 1px solid #ea9da6;
  box-sizing: border-box;
  height: 50px;
  margin: 10px 5.5px 0 5.5px;
}
.k3-bz-big-item {
  flex-basis: 92.8%;
  position: relative;
  border-radius: 1px;
  border: 1px solid #ea9da6;
  box-sizing: border-box;
  height: 50px;
  margin: 10px 5.5px 0 5.5px;
}
.k3-bz-big-item > p {
  text-align: center;
  height: 60%;
  line-height: 1.8;
}
.k3-bz-big-item > div {
  text-align: center;
  height: 40%;
  line-height: 1;
  color: #606060;
  font-size: 13px;
}
.k3-bz-item > p {
  position: absolute;
  top: 50%;
  font-size: 12px;
  transform: translateY(-50%);
  right: 8%;
}
.dice {
  position: relative;
  width: 18%;
  height: 100%;
  float: left;
  margin-left: 7px;
}
.dice img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}
</style>
