<template>
  <div>
    <tabbar class="bets-foot-bar">
      <div class="stop-sells-mask" v-if="stopSell">
        <img src="./stop_sells.png"/>
      </div>
      <div class="stop-sells-mask" v-if="stopBet">
        <img src="./yifengpan.png"/>
      </div>
      <flexbox :gutter="0" :wrap="'wrap'">
        <flexbox-item :span="9">
          <div>
            <flexbox :gutter="3">
              <flexbox-item :span="3" class="center">
                <x-button class="btn reset-selected" @click.native="handleReset">重置</x-button>
              </flexbox-item>
              <flexbox-item :span="6" class="center">
                <input ref="amountInput" class="input-amount center" placeholder="输入金额" type="tel" pattern="[0-9]*"
                      keyboard="number"
                      v-model="betAmount"
                      @input="handleInput" @focus="handleFocus" @blur="showChips=false">
              </flexbox-item>
              <flexbox-item :span="3" class="center">
                <x-button class="btn clean-amount" @click.native="cleanAmount">清除</x-button>
              </flexbox-item>
            </flexbox>
          </div>
        </flexbox-item>
        <flexbox-item :span="3" class="center">
          <x-button class="btn confirm-bet" @click.native="openBetsDialog">确定</x-button>
        </flexbox-item>
      </flexbox>
      <transition name="fold">
        <div class="chips" v-show="showChips">
          <ul>
            <li v-for="(item,index) in chips" :class="item.name" @click.stop="selectChip(item.value)" :key="index">
              <a>{{item.value}}</a></li>
          </ul>
        </div>
      </transition>
    </tabbar>
    <div v-transfer-dom>
      <confirm
      v-model="show6"
      :show-cancel-button="false"
      title="没有登陆，请登录！"
      @on-confirm="onConfirm"
      >
      </confirm>
    </div>
  </div>
</template>

<script>
  import { Tabbar, Flexbox, FlexboxItem, XButton, Confirm, TransferDomDirective as TransferDom } from 'vux'
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import { isNumber } from 'common/js/util'
  import { getUrlByToken } from 'api/credit/credit'
  import { ERR_OK } from 'api/config'
  export default {
    directives: {
      TransferDom
    },
    data () {
      return {
        betAmount: '',
        chips: [
          {name: 'lucky_1', value: 5},
          {name: 'lucky_1', value: 10},
          {name: 'lucky_2', value: 50},
          {name: 'lucky_3', value: 100},
          {name: 'lucky_4', value: 1000},
          {name: 'lucky_5', value: 10000}
        ],
        loginUrl: '',
        show6: false,
        showChips: false
      }
    },
    components: {
      Tabbar,
      Flexbox,
      FlexboxItem,
      XButton,
      Confirm
    },
    computed: {
      ...mapGetters([
        'betList', 'stopBet', 'stopSell', 'userProxyId'
      ])
    },
    methods: {
      ...mapActions([
        'setBetsAmount',
        'cleanBets'
      ]),
      ...mapMutations({
        setBetAmount: 'SET_BET_AMOUNT',
        setBetsDialogVisible: 'SET_BETS_DIALOG_VISIBLE'
      }),
      openBetsDialog () {
        if (this.userProxyId === 39) {
          getUrlByToken().then((res) => {
            console.log(res)
            const {currentStatus, currentData} = res
            if (currentStatus === ERR_OK && currentData) {
              this.loginUrl = currentData.loginUrl
              this.show6 = true
            }
          })
        } else {
          if (!this.betAmount) {
            this.$vux.toast.text('请填写下注金额', 'top')
            return ''
          }
          if (!this.betList.length) {
            this.$vux.toast.text('请先选号', 'top')
            return ''
          }
          this.setBetsAmount(this.betAmount)
          this.setBetsDialogVisible({visible: true})
        }
      },
      onConfirm () {
        window.location.href = 'http://' + this.loginUrl
      },
      inputFocus () {
        this.$refs.amountInput.focus()
      },
      cleanAmount () {
        this.betAmount = ''
        this.inputFocus()
      },
      selectChip (amount) {
        this.showChips = false
        this.betAmount = amount
      },
      handleInput (event) {
        const value = event.target.value
        if (isNumber(value)) {
          this.betAmount = value
        } else {
          this.betAmount = ''
        }
      },
      handleFocus () {
        const _this = this
        _this.showChips = true
        setTimeout(function () {
          if (navigator.userAgent.indexOf('UCBrowser') > -1) {
            window.scrollTo(0, document.body.offsetHeight)
          }
        }, 300)
      },
      handleReset () {
        this.cleanBets()
      }
    }
  }
</script>
<style lang="less" scoped>
  .center {
    text-align: center;
  }

  .bets-foot-bar {
    height: 48px;
    background-color: #f8f8f8;
    z-index: 99 !important;
    .stop-sells-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
      opacity: 1;
      background: rgba(0, 0, 0, 0.2);
      img {
        position: absolute;
        left: 34%;
        top: 3px;
      }
    }
    .reset-selected {
      border: 1px solid #db4442;
      color: #db4442;
    }
    .btn {
      height: 27px;
      width: 67px;
      line-height: 27px;
      font-size: 1rem;
      border-radius: .2rem;
    }
    .input-amount {
      height: 27px;
      border: 1px solid #888888;
      border-radius: .2rem;
      background: transparent;
      font-size: 0.88rem;
      width: 100%;
    }
    .clean-amount {
      background: #db4442;
      color: #fff;
    }
    .confirm-bet {
      background: #db4442;
      color: #fff;
    }
    .chips {
      position: absolute;
      width: 100%;
      left: 0;
      top: -50px;
      background: #f7f7f8;
      ul {
        list-style: none;
        li {
          width: 50px;
          height: 50px;
          margin-right: 0.5rem;
          display: inline-block;
          a {
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 0.85rem;
            color: #f9f9f9;
            text-align: center;
            display: block;
          }
        }
        .lucky_1 {
          background: url('lucky_1.png') no-repeat;
          background-size: contain;
        }
        .lucky_2 {
          background: url('lucky_2.png') no-repeat;
          background-size: contain;
        }
        .lucky_3 {
          background: url('lucky_3.png') no-repeat;
          background-size: contain;
        }
        .lucky_4 {
          background: url('lucky_4.png') no-repeat;
          background-size: contain;
        }
        .lucky_5 {
          background: url('lucky_5.png') no-repeat;
          background-size: contain;
        }
      }
    }
    &.fold-enter-active, &.fold-leave-active {
      transition: all 0.5s
    }
    &.fold-enter, &.fold-leave-active {
      transform: translate3d(0, 0, 0)
    }
  }

</style>
