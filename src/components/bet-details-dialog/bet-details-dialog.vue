<template>
  <x-dialog class="bets-detail-dialog" v-model="show">
    <div class="bets-detail-dialog__table">
      <p class="dialog-title">第<span class="issue">{{nextIssue}}</span>期&nbsp;&nbsp;<span class="issue">{{lotteryName}}</span>下注明细</p>
      <div class="table-header">
        <span>号码</span>
        <span>赔率</span>
        <span>金额</span>
        <span>操作</span>
      </div>
      <Scroller lock-x scrollbar-y :height="'200px'">
        <div class="table-list">
          <div class="table-list__item" v-for="(item, index) in betList" :key="index">
            <span style="color: rgb(255, 44, 103);">{{item.ruleName}}</span>
            <span>{{item.ruleOdds}}</span>
            <span>{{item.amount}}</span>
            <span style="color: rgb(27, 163, 241);" @click="selectBet(item)">删除</span>
          </div>
        </div>
      </Scroller>
      <div class="table-total">
        共&nbsp;<span>{{betList.length}}</span>&nbsp;注&nbsp;<span>{{betList.length * (betList.length ? betList[0].amount : 0)}}</span>&nbsp;元
      </div>
      <div class="foot-buttons">
        <div class="last-time">
          <span>封盘时间:</span>
          <span class="time">{{timerTime}}</span>
        </div>
        <div class="btn-group">
          <div class="btn-group__item">
            <x-button mini action-type="button" class="btn cancel" @click.native="$emit('onCancel')">取消</x-button>
          </div>
          <div class="btn-group__item">
            <x-button mini action-type="button" class="btn submit-bet" @click.native="handleSubmit">确认</x-button>
          </div>
        </div>
      </div>
    </div>
  </x-dialog>
</template>

<script>
  import { XDialog, XButton, Scroller, TransferDomDirective as TransferDom } from 'vux'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    directives: {
      TransferDom
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    components: {
      XDialog,
      XButton,
      Scroller
    },
    computed: {
      ...mapGetters([
        'betList',
        'timerTime',
        'nextIssue',
        'lotteryName'
      ])
    },
    methods: {
      ...mapActions([
        'selectBet'
      ]),
      handleSubmit () {
        this.$emit('onSubmit')
      }
    }
  }
</script>

<style lang="less" scoped>
  .bets-detail-dialog {
    .bets-detail-dialog__table {
      .dialog-title {
        padding: 10px 0;
        text-align: center;
        color: #000;
        font-size: 0.9rem;
        background-color: #f5f5f5;
        .issue {
          color: rgb(253, 124, 92);
          font-size: 0.8rem;
        }
      }
      .table-header {
        overflow: hidden;
        padding: 10px 0;
        background-color: #fff;
        font-size: 0.75rem;
        span {
          float: left;
          width: 25%;
          text-align: center;
        }
      }
      .table-list {
        .table-list__item {
          overflow: hidden;
          padding: 10px 0;
          background-color: #f5f5f5;
          font-size: 0.75rem;
          span {
            float: left;
            width: 25%;
            text-align: center;
          }
        }
      }
      .table-total {
        font-size: 0.75rem;
        text-align: right;
        padding: 10px;
        border-bottom: 1px dashed #aaa;
        span {
          color: #ff2c67;
          font-size: 0.75rem;
        }
      }
      .foot-buttons {
        overflow: hidden;
        padding: 10px 5px 10px 5px;
        .last-time {
          float: left;
          font-size: 0.75rem;
          padding: 5px;
          .time {
            color: #d23747;
          }
        }
        .btn-group {
          overflow: hidden;
          float: right;
          display: inline-block;
          .btn-group__item {
            float: left;
            .btn {
              width: 65px;
              height: 27px;
              margin-right: 5px;
            }
            .cancel {
              font-size: 13px;
              background-color: #d4d7dc;
              color: #008ca5;
            }
            .submit-bet {
              width: 80px;
              color: #fff;
              background-color: #fc1f5d;
            }
          }
        }
      }
    }
  }
</style>
